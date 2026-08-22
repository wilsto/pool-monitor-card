import { describe, it, expect } from 'vitest';
import {
  computeTrend,
  trendGlyphs,
  trendLabelKey,
  DEFAULT_DERIVATIVE_SCALE,
  MAX_TREND_CHEVRONS,
} from '../src/trend.js';
import { cardContent } from '../src/components/card-content.js';
import en from '../src/locales/en.js';
import { getTranslation, translations } from '../src/locales/translations.js';

// The rise and fall indicator is @arketec's design, ported from
// https://github.com/arketec/pool-monitor-card/commit/4730f9553576529730c2b8e4079458bd2d3d8903
// Two things are ours and are the ones worth pinning: the deadband, which his
// version does not have, and the spoken form, which a glyph cannot provide.

describe('the direction of the chevron', () => {
  it('rises on a positive slope', () => {
    expect(computeTrend(0.5).direction).toBe('rising');
  });

  it('falls on a negative slope', () => {
    expect(computeTrend(-0.5).direction).toBe('falling');
  });

  it('says nothing on a flat reading', () => {
    expect(computeTrend(0)).toEqual({ direction: null, count: 0 });
  });
});

// A derivative helper is almost never exactly zero. Without a floor the chevron
// appears and vanishes on measurement noise, which is worse than no chevron:
// it reports movement that is not there.
describe('the deadband keeps the chevron quiet under the noise floor', () => {
  it('stays silent below one full step', () => {
    expect(computeTrend(0.09, 0.1)).toEqual({ direction: null, count: 0 });
    expect(computeTrend(-0.09, 0.1)).toEqual({ direction: null, count: 0 });
  });

  it('speaks from one full step up', () => {
    expect(computeTrend(0.1, 0.1)).toEqual({ direction: 'rising', count: 1 });
  });

  it('scales the floor with the option, so a ppm reading is not a pH reading', () => {
    // 5 ppm/h is noise on a CO2 sensor and a landslide on a pH probe
    expect(computeTrend(5, 50).direction).toBeNull();
    expect(computeTrend(5, 1)).toEqual({ direction: 'rising', count: 3 });
  });
});

describe('the number of chevrons', () => {
  it('adds one per step of slope', () => {
    expect(computeTrend(0.1, 0.1).count).toBe(1);
    expect(computeTrend(0.25, 0.1).count).toBe(2);
    expect(computeTrend(0.31, 0.1).count).toBe(3);
  });

  it('never goes past three, however steep the slope', () => {
    expect(computeTrend(1000, 0.1).count).toBe(MAX_TREND_CHEVRONS);
    expect(computeTrend(-1000, 0.1).count).toBe(MAX_TREND_CHEVRONS);
  });

  it('uses the scale the fork shipped when none is given', () => {
    expect(DEFAULT_DERIVATIVE_SCALE).toBe(0.1);
    expect(computeTrend(0.15).count).toBe(1);
    expect(computeTrend(0.05).count).toBe(0);
  });

  it('ignores a scale that cannot divide anything', () => {
    for (const bad of [0, -1, NaN, Infinity]) {
      expect(computeTrend(0.15, bad).count, `scale ${bad}`).toBe(1);
    }
  });
});

describe('an unreadable derivative is silence, not a guess', () => {
  it('says nothing when the entity is missing or not a number', () => {
    for (const value of [null, undefined, NaN, Infinity, -Infinity]) {
      expect(computeTrend(value), `value ${value}`).toEqual({ direction: null, count: 0 });
    }
  });
});

describe('the glyphs', () => {
  it('point up for a rise and down for a fall, one per step', () => {
    expect(trendGlyphs(computeTrend(0.35, 0.1))).toBe('▴▴▴');
    expect(trendGlyphs(computeTrend(-0.15, 0.1))).toBe('▾');
  });

  // The reason the glyphs are vertical at all, and the reason these two in
  // particular. Measured properties, so they are asserted rather than trusted.
  it('cannot be mirrored, so a right-to-left card points them the right way', () => {
    for (const glyph of ['▴', '▾']) {
      expect(/\p{Bidi_Mirrored}/u.test(glyph), glyph).toBe(false);
    }
    // What they replace, and why: both of these do mirror
    for (const glyph of ['‹', '›', '〈', '〉']) {
      expect(/\p{Bidi_Mirrored}/u.test(glyph), glyph).toBe(true);
    }
  });

  it('are not emoji, so nothing paints them in colour', () => {
    for (const glyph of ['▴', '▾']) {
      expect(/\p{Emoji}/u.test(glyph), glyph).toBe(false);
    }
  });

  it('are absent when the trend is silent', () => {
    expect(trendGlyphs(computeTrend(0.01))).toBe('');
    expect(trendGlyphs(null)).toBe('');
    expect(trendGlyphs(undefined)).toBe('');
  });
});

// The requirement from issue #63: the trend has to reach someone who cannot see
// the chevron. A run of `›` is punctuation to a screen reader, so the glyph is
// hidden from the accessibility tree and a sentence is read instead.
describe('the trend is spoken, not only drawn', () => {
  it('names a translation key per direction and per rate', () => {
    expect(trendLabelKey(computeTrend(0.15, 0.1))).toBe('trend.rising_1');
    expect(trendLabelKey(computeTrend(0.25, 0.1))).toBe('trend.rising_2');
    expect(trendLabelKey(computeTrend(-0.9, 0.1))).toBe('trend.falling_3');
  });

  it('names nothing when there is nothing to say', () => {
    expect(trendLabelKey(computeTrend(0.01))).toBeNull();
    expect(trendLabelKey(null)).toBeNull();
  });

  it('every key it can produce has an English sentence behind it', () => {
    for (const direction of ['rising', 'falling']) {
      for (let count = 1; count <= MAX_TREND_CHEVRONS; count++) {
        const key = `trend.${direction}_${count}`;
        expect(getTranslation('en', key), key).not.toBe(key);
      }
    }
  });

  // Decided by the PO against the recommendation made to him: an English
  // sentence read to a screen reader set to Czech was not judged acceptable,
  // so the seventeen locales are translated now rather than left to fall back.
  it('and a sentence in every one of the seventeen languages, not just English', () => {
    for (const lang of Object.keys(translations)) {
      for (const direction of ['rising', 'falling']) {
        for (let count = 1; count <= MAX_TREND_CHEVRONS; count++) {
          const key = `trend.${direction}_${count}`;
          const spoken = getTranslation(lang, key);
          expect(spoken, `${lang} has no ${key}`).not.toBe(key);
          // A locale that merely echoes English is a fallback, not a translation
          if (lang !== 'en') {
            expect(spoken, `${lang}.${key} is still the English sentence`).not.toBe(
              getTranslation('en', key),
            );
          }
        }
      }
    }
  });

  it('and none of the seventeen says the same thing for rising and falling', () => {
    for (const lang of Object.keys(translations)) {
      const spoken = [1, 2, 3].flatMap(count => [
        getTranslation(lang, `trend.rising_${count}`),
        getTranslation(lang, `trend.falling_${count}`),
      ]);
      expect(new Set(spoken).size, `${lang} repeats a sentence`).toBe(6);
    }
  });

  it('hides the chevron from assistive technology and exposes the sentence', () => {
    const rendered = cardContent.generateTrend({
      trend: computeTrend(0.25, 0.1),
      trend_label: 'rising',
    });
    const markup = rendered.strings.join('{{}}');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('sr-only');
    expect(rendered.values).toContain('rising');
  });

  it('renders nothing at all when the trend is silent', () => {
    expect(cardContent.generateTrend({ trend: computeTrend(0), trend_label: '' })).toBe('');
    expect(cardContent.generateTrend({})).toBe('');
  });
});
