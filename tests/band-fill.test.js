import { describe, it, expect } from 'vitest';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { cardContent } from '../src/components/card-content.js';
import { styles } from '../src/styles/styles.js';
import { DEFAULT_DISPLAY, DEFAULT_COLORS } from '../src/configs/config.js';
import { displaySchema } from '../src/editor/ha-form-schemas.js';
import { readableTextOn, contrastRatio } from '../src/contrast.js';
import en from '../src/locales/en.js';

/**
 * `display.band_fill`, the second half of #154.
 *
 * The first half, an option that painted nothing in the compact layout, was
 * closed by #160. This is the half the measurement left open: the compact row
 * does carry severity in colour, because its bar is built from the real
 * thresholds, but the reading lies *along* that bar, so the colour behind the
 * words is the band the label overlaps rather than the band the value is in.
 *
 * Reproduced in Chromium on the compiled bundle of this working copy, air card
 * at 460 px, carbon monoxide at 3 ppm:
 *
 *   cursor at 4.0% of the bar, over green
 *   bar     green to 6.9%, fair to 10.3%, yellow to 34.5%, orange to 100%
 *   label   from 3.4% to 54.9%
 *
 * Seven per cent of that label sits on the colour of its own verdict. The row
 * says Good and reads yellow-orange.
 *
 * What this file holds, in order: the option is off in the shipped defaults,
 * it paints the band colour when asked, it picks a text colour that can be
 * read on it, and the palette has no band on which the result falls under the
 * contrast floor.
 */

const CONFIG = display => ({
  display: { ...DEFAULT_DISPLAY, compact: true, ...display },
  colors: { ...DEFAULT_COLORS },
});

/** One row, computed by a real card rather than written by hand. */
function row(Card, sensor, state) {
  const card = new Card();
  card.hass = {
    states: {
      'sensor.x': {
        entity_id: 'sensor.x',
        state: String(state),
        attributes: {},
        last_updated: '2026-08-24T10:00:00Z',
      },
    },
    entities: {},
  };
  card.setConfig({ sensors: { [sensor]: { entity: 'sensor.x' } } });
  return card.processData()[`${sensor}_1`];
}

/** Flattens a Lit TemplateResult back into the markup it describes. */
function renderText(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'function') return '""';
  if (Array.isArray(node)) return node.map(renderText).join('');
  if (typeof node !== 'object') return String(node);
  if (!node.strings) return '';
  return node.strings.reduce(
    (acc, part, i) => acc + part + (i < node.values.length ? renderText(node.values[i]) : ''),
    '',
  );
}

const compact = (display, data) =>
  renderText(cardContent.generateCompactBody(CONFIG(display), data));

/** A colour painted at `alpha` over an opaque background, as the screen shows it. */
const composite = (fg, bg, alpha) => {
  const ch = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const [f, b] = [ch(fg), ch(bg)];
  return (
    '#' +
    f
      .map((c, i) =>
        Math.round(c * alpha + b[i] * (1 - alpha))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
};

describe('the option exists and starts off', () => {
  it('is off in the shipped defaults', () => {
    // Same argument as `blink`: on would change what every compact dashboard
    // already installed looks like on a version bump.
    expect(DEFAULT_DISPLAY.band_fill).toBe(false);
  });

  it('paints nothing extra when it is off', () => {
    const markup = compact({}, row(AirQualityCard, 'co', 3));
    expect(markup).toContain('background-color:transparent');
    expect(markup).not.toContain('band-fill');
  });

  it('is offered in the editor with a label of its own', () => {
    const offered = displaySchema(k => k).map(f => f.name);
    expect(offered).toContain('band_fill');
    expect(en.editor.band_fill).toBeTruthy();
  });
});

describe('the fill carries the band of the value, not the band under the label', () => {
  // The four rows of the reproduction, at both ends of both scale shapes.
  const ROWS = [
    ['air co, ideal', AirQualityCard, 'co', 3, DEFAULT_COLORS.normal],
    ['air co, above its highest limit', AirQualityCard, 'co', 900, DEFAULT_COLORS.hazardous],
    ['pool ph, ideal', PoolMonitorCard, 'ph', 7.2, DEFAULT_COLORS.normal],
    ['pool ph, far above its setpoint', PoolMonitorCard, 'ph', 9, DEFAULT_COLORS.warn],
  ];

  it.each(ROWS)('%s', (_label, Card, sensor, state, colour) => {
    const data = row(Card, sensor, state);
    expect(data.color, 'the card classified this row into no band').toBe(colour);
    const markup = compact({ band_fill: true }, data);
    expect(markup).toContain(`background-color:${colour}`);
    expect(markup).toContain('band-fill');
  });

  it('leaves the two low and high marks alone', () => {
    // They are `.cursor-text` as well, so a fill written on the class rather
    // than on the row would turn two hairlines into two blocks. They only
    // exist on a row that tracks a low and a high, which is why this row is
    // built with them rather than reusing one above.
    const card = new PoolMonitorCard();
    card.hass = {
      states: {
        'sensor.x': { entity_id: 'sensor.x', state: '7.2', attributes: {} },
        'sensor.lo': { entity_id: 'sensor.lo', state: '6.9', attributes: {} },
        'sensor.hi': { entity_id: 'sensor.hi', state: '7.6', attributes: {} },
      },
      entities: {},
    };
    card.setConfig({
      sensors: { ph: { entity: 'sensor.x', min: 'sensor.lo', max: 'sensor.hi' } },
    });
    const data = card.processData().ph_1;
    expect(data.pct_min, 'this row shows no low mark, so it proves nothing').not.toBe(
      data.pct_cursor,
    );

    const markup = compact({ band_fill: true }, data);
    expect(markup.match(/background-color:transparent/g) || []).toHaveLength(2);
    expect(markup.match(/band-fill/g) || []).toHaveLength(1);
  });

  it('keeps the cursor above the fill', () => {
    // Seen in Chromium on the built bundle, not deduced: the fill and the
    // cursor both sat at z-index 1 and the fill comes later in the markup, so
    // turning the option on swallowed the black mark that says where the value
    // is. Hiding the gradient under the label is the cost the option was
    // accepted with; hiding the cursor is not, it is the one thing on the row
    // that reports position.
    const zOf = selector => {
      const rule = styles.cssText.match(
        new RegExp(`${selector}\\s*\\{([^}]*)\\}`.replace(/\./g, '\\.')),
      );
      expect(rule, `no rule for ${selector}`).toBeTruthy();
      const z = rule[1].match(/z-index:\s*(-?\d+)/);
      expect(z, `${selector} declares no z-index`).toBeTruthy();
      return Number(z[1]);
    };
    expect(zOf('.cursor-text.band-fill')).toBeLessThan(zOf('.compact-cursor'));
  });

  it('gives the stylesheet a shape to put the fill in', () => {
    // The colour is inline because it belongs to one reading; the rounding and
    // the padding are shared and belong here. A class no rule matches would
    // paint a block flush against the glyphs.
    expect(styles.cssText).toMatch(/\.cursor-text\.band-fill\s*\{/);
  });
});

/**
 * The contrast question the gradient bar never raised.
 *
 * Text over a gradient is text over whatever happens to be there. Text over a
 * solid block is a pair, and a pair has a ratio. The compact row is 11px, so
 * WCAG 1.4.3 asks 4.5 rather than the 3.0 it allows large text.
 */
describe('the text stays legible on every band of the palette', () => {
  const BANDS = ['normal', 'fair', 'low', 'warn', 'hazardous', 'cool'];

  it.each(BANDS)('%s', band => {
    const bg = DEFAULT_COLORS[band];
    const fg = readableTextOn(bg);
    expect(
      contrastRatio(fg === 'white' ? '#ffffff' : '#000000', bg),
      `${band} (${bg}) renders ${fg} text below the 4.5:1 that 11px text needs`,
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('is the reason the colour is chosen rather than left black', () => {
    // The measurement that forced this: black on the hazardous purple is
    // 3.58:1, and white on the same purple is 5.87:1. Four of the six bands
    // are the other way round by a wide margin, so neither constant works.
    expect(contrastRatio('#000000', DEFAULT_COLORS.hazardous)).toBeLessThan(4.5);
    expect(readableTextOn(DEFAULT_COLORS.hazardous)).toBe('white');
    expect(readableTextOn(DEFAULT_COLORS.low)).toBe('black');
  });

  it('paints that choice on the row, not just in a helper', () => {
    const worst = row(AirQualityCard, 'co', 900);
    expect(worst.color).toBe(DEFAULT_COLORS.hazardous);
    expect(compact({ band_fill: true }, worst)).toContain('color:white');

    const good = row(AirQualityCard, 'co', 3);
    expect(compact({ band_fill: true }, good)).toContain('color:black');
  });

  it('and for the muted note riding on the same fill', () => {
    // `.status-note` recedes by opacity, which is free on the card background
    // and not free on a band colour. Composited at its own opacity over each
    // band, it has to clear the same floor as the rest of the row: measured at
    // 0.7 it did not, 3.74 on hazardous and 4.46 on warn.
    const rule = styles.cssText.match(
      /\.cursor-text\.band-fill \.status-note\s*\{([^}]*)\}/,
    );
    expect(rule, 'no rule lifts the note out of its 0.7 opacity on a fill').toBeTruthy();
    const alpha = Number(rule[1].match(/opacity:\s*([\d.]+)/)?.[1]);
    expect(alpha).toBeGreaterThan(0);

    for (const band of BANDS) {
      const bg = DEFAULT_COLORS[band];
      const fg = readableTextOn(bg) === 'white' ? '#ffffff' : '#000000';
      expect(
        contrastRatio(composite(fg, bg, alpha), bg),
        `the age of the reading is below 4.5:1 on ${band} (${bg}) at opacity ${alpha}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('falls back to black for a colour it cannot read', () => {
    // A user may write any CSS colour into the palette, `var(--accent)`
    // included, and its value is not knowable from here. Black is what every
    // compact row used before this option existed, so an unreadable entry
    // leaves the card as it was rather than flipping it to white on white.
    expect(readableTextOn('var(--accent-color)')).toBe('black');
    expect(readableTextOn('')).toBe('black');
    expect(readableTextOn('rebeccapurple')).toBe('black');
  });

  it('reads the colour notations the card actually emits', () => {
    // Guards the guard: a parser that read nothing would answer black to
    // everything and make the fallback test above pass for the wrong reason.
    expect(readableTextOn('#000')).toBe('white');
    expect(readableTextOn('#8e44ad')).toBe('white');
    expect(readableTextOn('rgb(253, 203, 110)')).toBe('black');
    expect(readableTextOn('rgba(142, 68, 173, 1)')).toBe('white');
  });
});

/**
 * The same pair, on the full layout's value bubble (#163).
 *
 * The bubble has painted the band colour behind the value since before
 * `band_fill` existed, and it wrote the value in black whatever that colour
 * was. Black on the hazardous purple is 3.58:1, so every reading in the worst
 * band of its scale, the one a reader most needs to see, was the one below the
 * floor. The bubble is 13px at weight 600, not "large" text under WCAG 1.4.3,
 * so the floor is the same 4.5 as the compact row.
 *
 * Fixed without an option, unlike `band_fill` and `blink`: those add a look,
 * this one only makes an existing look legible, and it moves nothing but the
 * text of a reading on a colour black cannot be read on.
 */
describe('the full layout picks the same legible text colour on its value bubble', () => {
  const full = data =>
    renderText(
      cardContent.generateBody(
        { display: { ...DEFAULT_DISPLAY, compact: false }, colors: { ...DEFAULT_COLORS } },
        data,
      ),
    );

  it('writes white on the worst band and black on a good one', () => {
    const worst = row(AirQualityCard, 'co', 900);
    expect(worst.color).toBe(DEFAULT_COLORS.hazardous);
    expect(full(worst)).toContain(`background-color: ${worst.color};color: white;`);

    const good = row(AirQualityCard, 'co', 3);
    expect(full(good)).toContain(`background-color: ${good.color};color: black;`);
  });

  it('leaves the bubble as it was on a colour it cannot read', () => {
    // A palette entry written as `var(--x)` has no value from this side, and
    // black is what the bubble always wrote, so nothing flips on such a card.
    const data = { ...row(AirQualityCard, 'co', 900), color: 'var(--accent-color)' };
    expect(full(data)).toContain('color: black;');
  });

  it('keeps the faded marks inside the bubble above the floor on every band', () => {
    // The trend chevrons and the state label ride in the bubble at 0.85 and
    // 0.9 opacity. Composited over each band at the lower of the two, the
    // chosen text colour still has to clear 4.5.
    const alpha = Number(
      styles.cssText.match(/\.trend-arrow\s*\{([^}]*)\}/)[1].match(/opacity:\s*([\d.]+)/)[1],
    );
    for (const band of ['normal', 'fair', 'low', 'warn', 'hazardous', 'cool']) {
      const bg = DEFAULT_COLORS[band].toLowerCase();
      const fg = readableTextOn(bg) === 'white' ? '#ffffff' : '#000000';
      expect(
        contrastRatio(composite(fg, bg, alpha), bg),
        `a trend chevron is below 4.5:1 on ${band} (${bg}) at opacity ${alpha}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
