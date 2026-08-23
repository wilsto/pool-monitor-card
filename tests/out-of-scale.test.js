import { describe, it, test, expect } from 'vitest';
import { outOfScale, overflowGlyph, overflowLabelKey } from '../src/scale.js';
import { cardContent, markerShift } from '../src/components/card-content.js';
import { translations, getTranslation } from '../src/locales/translations.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

/**
 * A value outside the bar is pinned to the end of it, so the position alone
 * cannot say whether it is on the scale (#62). The PO settled the answer on
 * 2026-08-22: mark the overflow, leave the geometry alone. What is asserted
 * here is that the mark exists, sits at the end the value left, is spoken as
 * well as drawn, and does not move anything the clamp of #70 relies on.
 */

/** Flattens a Lit TemplateResult back into the markup it describes. */
function renderText(template) {
  if (template == null || typeof template === 'boolean') return '';
  if (typeof template !== 'object') return String(template);
  if (!template.strings) return '';
  return template.strings.reduce(
    (acc, part, i) => acc + part + (i < template.values.length ? renderText(template.values[i]) : ''),
    '',
  );
}

describe('outOfScale', () => {
  it('says nothing while the value is on the scale', () => {
    expect(outOfScale(15, 0, 30)).toBeNull();
    expect(outOfScale(0, 0, 30)).toBeNull();
    expect(outOfScale(30, 0, 30)).toBeNull();
  });

  it('names the end the value left', () => {
    expect(outOfScale(90, 0, 30)).toBe('above');
    expect(outOfScale(500, 0, 30)).toBe('above');
    expect(outOfScale(-1, 0, 30)).toBe('below');
  });

  it('fires on the smallest overshoot, not on a threshold of its own', () => {
    expect(outOfScale(30.0001, 0, 30)).toBe('above');
    expect(outOfScale(-0.0001, 0, 30)).toBe('below');
  });

  it('reads a numeric string, since a reading arrives as text', () => {
    expect(outOfScale('90', 0, 30)).toBe('above');
    expect(outOfScale('15', 0, 30)).toBeNull();
  });

  // Number(null) is 0, so an unread sensor on a bar starting above zero would
  // otherwise be announced as below the scale. It is not below anything.
  it('treats an absent or unreadable value as no overflow', () => {
    expect(outOfScale(null, 10, 30)).toBeNull();
    expect(outOfScale(undefined, 10, 30)).toBeNull();
    expect(outOfScale('', 10, 30)).toBeNull();
    expect(outOfScale(NaN, 10, 30)).toBeNull();
    // an `override` replaces the reading with a word
    expect(outOfScale('OFF', 10, 30)).toBeNull();
  });

  it('refuses a bar it cannot measure', () => {
    expect(outOfScale(50, 30, 30)).toBeNull();
    expect(outOfScale(50, 30, 10)).toBeNull();
    expect(outOfScale(50, NaN, 30)).toBeNull();
    expect(outOfScale(50, 0, Infinity)).toBeNull();
  });
});

describe('the glyphs survive a language that is not English', () => {
  const glyphs = [overflowGlyph('above'), overflowGlyph('below')];

  // The bar is drawn left to right whatever the language: positions are set as
  // `left: n%`. A mirrored glyph would be painted reversed in a right-to-left
  // paragraph and point back at the middle of a bar that still runs outward.
  test('neither glyph is Bidi_Mirrored', () => {
    for (const g of glyphs) expect(/\p{Bidi_Mirrored}/u.test(g)).toBe(false);
  });

  // An Emoji-property glyph risks being painted as a colour emoji rather than
  // as text, at a size nothing on this row controls.
  test('neither glyph carries the Emoji property', () => {
    for (const g of glyphs) expect(/\p{Emoji}/u.test(g)).toBe(false);
  });

  test('they point in opposite directions and say nothing when on scale', () => {
    expect(overflowGlyph('above')).not.toBe(overflowGlyph('below'));
    expect(overflowGlyph(null)).toBe('');
    expect(overflowGlyph(undefined)).toBe('');
  });
});

describe('the mark is spoken in every language the cards speak', () => {
  it('has a key per end, and none when the value is on the scale', () => {
    expect(overflowLabelKey('above')).toBe('out_of_scale.above');
    expect(overflowLabelKey('below')).toBe('out_of_scale.below');
    expect(overflowLabelKey(null)).toBeNull();
  });

  // Not the raw key, which is what a screen reader used to be given for any
  // string a locale had not translated (translation-fallback.test.js).
  it('resolves to a phrase in all seventeen locales', () => {
    for (const lang of Object.keys(translations)) {
      for (const end of ['above', 'below']) {
        const key = overflowLabelKey(end);
        const spoken = getTranslation(lang, key);
        expect(spoken, `${lang}.${key}`).not.toBe(key);
        expect(spoken.length, `${lang}.${key}`).toBeGreaterThan(0);
      }
    }
  });

  it('says something different at each end, in each locale', () => {
    for (const lang of Object.keys(translations)) {
      expect(
        getTranslation(lang, 'out_of_scale.above'),
        `${lang} says the same thing at both ends`,
      ).not.toBe(getTranslation(lang, 'out_of_scale.below'));
    }
  });
});

describe('the card computes the overflow from the reading, not from the position', () => {
  const hass = {
    states: {
      'sensor.co': { state: '90', attributes: { unit_of_measurement: 'ppm' } },
      'sensor.co_far': { state: '500', attributes: { unit_of_measurement: 'ppm' } },
      'sensor.co_ok': { state: '4', attributes: { unit_of_measurement: 'ppm' } },
      'sensor.co_unread': { state: 'unavailable', attributes: {} },
    },
    entities: {},
  };

  const build = sensor => {
    const card = new PoolMonitorCard();
    card.hass = hass;
    card.setConfig({ sensors: { co: sensor } });
    return card.processData().co_1;
  };

  const scale = { min: 0, max: 30, setpoint: 10, step: 5 };

  it('the two readings the issue names still share a pixel, and no longer a card', () => {
    const near = build({ entity: 'sensor.co', ...scale });
    const far = build({ entity: 'sensor.co_far', ...scale });

    // the defect: the clamp puts both at the same place, and that has not changed
    expect(near.pct_marker).toBe(100);
    expect(far.pct_marker).toBe(100);
    // what is new: the card knows they are off the scale
    expect(near.out_of_scale).toBe('above');
    expect(far.out_of_scale).toBe('above');
  });

  it('a value on the scale carries no mark', () => {
    const d = build({ entity: 'sensor.co_ok', ...scale });
    expect(d.out_of_scale).toBeNull();
    expect(d.out_of_scale_label).toBe('');
  });

  it('an unreadable sensor is not announced as below the scale', () => {
    const d = build({ entity: 'sensor.co_unread', ...scale });
    expect(d.out_of_scale ?? null).toBeNull();
  });

  it('the value sits below when the scale starts above it', () => {
    const d = build({ entity: 'sensor.co_ok', min: 10, max: 30, setpoint: 20, step: 5 });
    expect(d.bar_min).toBe(10);
    expect(d.out_of_scale).toBe('below');
  });

  it('carries the spoken form already translated', () => {
    const d = build({ entity: 'sensor.co', ...scale });
    expect(d.out_of_scale_label).toBe(getTranslation('en', 'out_of_scale.above'));
  });

  // The geometry is what the PO refused to move: no band, no label and no
  // bound may depend on how far past the end the value went.
  it('leaves the geometry exactly where it was', () => {
    const near = build({ entity: 'sensor.co', ...scale });
    const far = build({ entity: 'sensor.co_far', ...scale });

    expect(far.bar_min).toBe(near.bar_min);
    expect(far.bar_max).toBe(near.bar_max);
    expect(far.label_positions).toEqual(near.label_positions);
    expect(far.setpoint_class).toEqual(near.setpoint_class);
  });
});

describe('the mark in the markup', () => {
  const config = {
    display: { gradient: true, show_labels: true, show_icons: true },
    colors: {
      low: '#fdcb6e',
      warn: '#e17055',
      normal: '#00b894',
      cool: '#00BFFF',
      marker: '#000000',
      hi_low: '#00000099',
    },
  };

  const data = {
    name: 'co',
    entity: 'sensor.co',
    color: '#e17055',
    pct_marker: 100,
    value: 500,
    unit: 'ppm',
    state: 'Very Poor',
    side_align: 'right',
    pct_state_step: 101,
    hide_icon: false,
    is_mdi: true,
    mdi_icon: 'mdi:molecule-co',
    mode: 'centric',
    setpoint_class: ['0', '4', '9', '15', '30'],
    label_positions: [0, 13.33, 30, 50, 100],
    pct_min: 0,
    pct_max: 100,
    pct_cursor: 0,
    separator: '-',
    title: 'Carbon Monoxide',
    out_of_scale: 'above',
    out_of_scale_label: 'above the scale',
  };

  const below = {
    ...data,
    value: -2,
    pct_marker: 0,
    side_align: 'left',
    pct_cursor: 0,
    out_of_scale: 'below',
    out_of_scale_label: 'below the scale',
  };

  const onScale = { ...data, value: 12, pct_marker: 40, out_of_scale: null, out_of_scale_label: '' };

  const bubble = markup => markup.match(/class="marker"[^>]*>([\s\S]*?)<\/div>/)[1];

  it('draws the mark after the value at the top of the scale', () => {
    const inner = bubble(renderText(cardContent.generateBody(config, data)));
    expect(inner).toContain(overflowGlyph('above'));
    expect(inner.indexOf(overflowGlyph('above'))).toBeGreaterThan(inner.indexOf('500'));
  });

  it('draws it before the value at the bottom of the scale', () => {
    const inner = bubble(renderText(cardContent.generateBody(config, below)));
    expect(inner).toContain(overflowGlyph('below'));
    expect(inner.indexOf(overflowGlyph('below'))).toBeLessThan(inner.indexOf('-2'));
  });

  it('draws nothing while the value is on the scale', () => {
    const markup = renderText(cardContent.generateBody(config, onScale));
    expect(markup).not.toContain('out-of-scale');
    expect(markup).not.toContain(overflowGlyph('above'));
    expect(markup).not.toContain(overflowGlyph('below'));
  });

  // A mark carried by a glyph alone is a mark for sighted users only. The
  // trend already answered this; the same answer is reused rather than a
  // second one invented.
  it('hides the glyph from assistive technology and speaks the phrase instead', () => {
    const markup = renderText(cardContent.generateBody(config, data));
    expect(markup).toMatch(/class="out-of-scale" aria-hidden="true"/);
    expect(markup).toContain('<span class="sr-only">above the scale</span>');
  });

  it('marks the compact row too, where the same clamp applies', () => {
    const markup = renderText(cardContent.generateCompactBody(config, data));
    expect(markup).toContain(overflowGlyph('above'));
    expect(markup).toContain('above the scale');
    expect(renderText(cardContent.generateCompactBody(config, onScale))).not.toContain(
      'out-of-scale',
    );
  });

  // #70 clamps the bubble so it cannot leave the card, and the mark rides in
  // that bubble. The two must not fight: the bubble keeps its clamp and the
  // cursor keeps pointing at the position, mark or no mark.
  it('does not disturb the bubble clamp or the cursor of #70', () => {
    const markup = renderText(cardContent.generateBody(config, data));

    const marker = markup.match(/class="marker"[^>]*transform: ([^;]+);/);
    expect(marker[1]).toBe(markerShift(100));

    const triangle = markup.match(/class="triangle"[^>]*transform: ([^;]+);/);
    expect(triangle[1]).toBe('translateX(-100%)');
    expect(triangle[1]).not.toContain('clamp');

    const left = markup.match(/class="marker"[^>]*left: ([^;]+);/);
    expect(left[1]).toBe('100%');
  });
});
