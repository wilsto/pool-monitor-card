import { describe, test, expect } from 'vitest';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { cardContent } from '../src/components/card-content.js';

/**
 * The reading stays inside the card, in BOTH layouts, on the same bounds.
 *
 * This file is the guard that #70 did not leave behind. #70 clamped the value
 * bubble of the full layout and stopped there; the compact layout kept hanging
 * its row off the position with nothing holding it in, and a carbon monoxide
 * reading at the top of its scale rendered entirely outside the card for
 * months (#144, measured in Chromium on a 500px card: the row occupied
 * x=500..711 while the card ended at x=500).
 *
 * The sixth hard guard of `CLAUDE.md` already said in so many words that the
 * rendering is written twice and that a rendering fix applies to both. It was
 * written, it was read, and half the fix still shipped. So the rule is a test
 * now: every assertion below is parameterised over the two layouts, which is
 * what makes correcting one of them alone a red check rather than a habit
 * nobody keeps.
 *
 * What it does NOT prove: the rendering inside Home Assistant's own theme and
 * grid. The geometry here is the one a browser resolves from the same
 * declarations, reproduced in `resolveShift`; the pixel measurement that
 * matches it was taken separately in Chromium on the compiled bundle.
 */

const LAYOUTS = [
  ['full', cardContent.generateBody],
  ['compact', cardContent.generateCompactBody],
];

const CONFIG = {
  display: { gradient: true, show_labels: true, show_icons: true, compact: false },
  colors: {
    low: '#fdcb6e',
    warn: '#e17055',
    normal: '#00b894',
    cool: '#00BFFF',
    marker: '#000000',
    hi_low: '#00000099',
  },
};

/**
 * One sensor row, computed by the card itself rather than written by hand.
 *
 * The defect of #144 lives in the combination of a preset driven by `limits`
 * with no setpoint and a reading at the top of its bar, and that combination
 * is produced by `card-base.ts`, not by a literal. A hand-written `data` would
 * have been free to be wrong in exactly the way that hid the bug.
 */
function row(sensor, state) {
  const card = new AirQualityCard();
  card.hass = {
    states: {
      'sensor.x': {
        entity_id: 'sensor.x',
        state: String(state),
        attributes: {},
        last_updated: '2026-08-23T10:00:00Z',
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

/**
 * The element that carries the reading, whichever layout drew it.
 *
 * Deliberately found by what it contains rather than by its class name: the
 * two layouts call it `.marker` and `.cursor-text`, and a test that knew those
 * names would be a test that has to be taught about a third one. `<bdi>` is
 * the reading itself (`generateReading`), the single element both layouts
 * share.
 */
function readingCarrier(markup) {
  const host = document.createElement('div');
  host.innerHTML = markup;
  const bdi = host.querySelector('bdi');
  expect(bdi, 'the layout renders no reading at all').not.toBeNull();
  let el = bdi.parentElement;
  while (el && el !== host && !/absolute/.test(el.getAttribute('style') || '')) {
    if (el.style.left || el.style.right) break;
    el = el.parentElement;
  }
  expect(el, 'the reading is carried by nothing positioned').not.toBe(host);
  return el;
}

/**
 * The two rules a browser applies to the declarations these layouts emit, and
 * nothing else:
 *   - `clamp(min, value, max)` is `max(min, min(value, max))`
 *   - `cqw` is one percent of the gauge, `%` inside a transform is a
 *     percentage of the element's own width
 */
function resolveShift(shift, gauge, width) {
  if (!shift || shift === 'none') return 0;
  const plain = shift.match(/^translateX\((-?[\d.]+)(%|px)?\)$/);
  if (plain) return plain[2] === '%' ? (Number(plain[1]) * width) / 100 : Number(plain[1]);
  const clamped = shift.match(
    /^translateX\(clamp\((-?[\d.]+)cqw, (-?[\d.]+)%, calc\((-?[\d.]+)cqw - 100%\)\)\)$/,
  );
  if (!clamped) throw new Error(`unexpected shift expression: ${shift}`);
  const min = (Number(clamped[1]) * gauge) / 100;
  const preferred = (Number(clamped[2]) * width) / 100;
  const max = (Number(clamped[3]) * gauge) / 100 - width;
  return Math.max(min, Math.min(preferred, max));
}

/** Left edge of the carrier, in pixels from the left edge of the gauge. */
function leftEdge(el, gauge, width) {
  const style = el.getAttribute('style') || '';
  const left = style.match(/(?:^|;)\s*left:\s*([\d.]+)%/);
  const right = style.match(/(?:^|;)\s*right:\s*([\d.]+)%/);
  const transform = (style.match(/transform:\s*([^;]+)/) || [])[1]?.trim();
  const anchor = left
    ? (Number(left[1]) / 100) * gauge
    : right
      ? gauge - (Number(right[1]) / 100) * gauge - width
      : null;
  expect(anchor, `neither left nor right on the carrier: ${style}`).not.toBeNull();
  return anchor + resolveShift(transform, gauge, width);
}

/**
 * Where the reading wants to be, before anything holds it in.
 *
 * Read off the same declarations with the clamp neutralised, so the "as close
 * to the value as it can be" assertion is not comparing the fix against a
 * hand-copied model of itself.
 */
function idealEdge(el, gauge, width) {
  const style = el.getAttribute('style') || '';
  const neutralised = style.replace(
    /transform:\s*translateX\(clamp\([^,]+, (-?[\d.]+%), [^)]+\)\)\)/,
    'transform: translateX($1)',
  );
  const clone = document.createElement('div');
  clone.setAttribute('style', neutralised);
  return leftEdge(clone, gauge, width);
}

// The same bounds for both layouts, which is the whole point of the file.
// `co` is driven by `limits: [6, 9, 30, 87]` with no setpoint, the shape that
// broke; `humidity` has a setpoint, so it also exercises the row that hangs
// off the other side of its anchor.
const BOUNDS = [
  ['co', 0],
  ['co', 3],
  ['co', 6],
  ['co', 30],
  ['co', 87],
  ['co', 90],
  ['humidity', 5],
  ['humidity', 45],
  ['humidity', 51],
  ['humidity', 95],
];

const GEOMETRIES = [
  [400, 120],
  [260, 90],
  [180, 150],
  [720, 40],
];

/**
 * How far outside the gauge is still inside.
 *
 * `markerShift` rounds its two gauge terms to two decimals so the emitted CSS
 * carries a readable percentage rather than float noise. That rounding is the
 * only slack in the whole expression, and it is bounded: half of the last
 * digit, 0.005% of the gauge, which is a fortieth of a pixel on a 720px bar.
 * Anything larger is a real overflow, and this is deliberately not a round
 * number of pixels chosen to make the test pass.
 */
const slack = gauge => (gauge * 0.005) / 100 + 1e-9;

describe.each(LAYOUTS)('%s layout: the reading stays inside the card', (name, generate) => {
  test.each(BOUNDS)(`%s at %s`, (sensor, state) => {
    const data = row(sensor, state);
    const el = readingCarrier(renderText(generate(CONFIG, data)));

    for (const [gauge, width] of GEOMETRIES) {
      const left = leftEdge(el, gauge, width);
      expect(left, `${name} ${sensor} ${state} on a ${gauge}px gauge`).toBeGreaterThanOrEqual(
        -slack(gauge),
      );
      expect(left + width, `${name} ${sensor} ${state} on a ${gauge}px gauge`).toBeLessThanOrEqual(
        gauge + slack(gauge),
      );
    }
  });

  test('holds at every position of the scale, not only at the bounds measured', () => {
    const data = row('co', 30);
    for (let pct = 0; pct <= 100; pct += 0.5) {
      const el = readingCarrier(
        renderText(generate(CONFIG, { ...data, pct_marker: pct, pct_cursor: pct })),
      );
      for (const [gauge, width] of GEOMETRIES) {
        const left = leftEdge(el, gauge, width);
        expect(left, `${name} at ${pct}% on a ${gauge}px gauge`).toBeGreaterThanOrEqual(
          -slack(gauge),
        );
        expect(left + width, `${name} at ${pct}% on a ${gauge}px gauge`).toBeLessThanOrEqual(
          gauge + slack(gauge),
        );
      }
    }
  });

  test('never pushes the reading further from the value than it has to', () => {
    const data = row('co', 30);
    const gauge = 400;
    const width = 120;
    for (let pct = 0; pct <= 100; pct += 0.5) {
      const el = readingCarrier(
        renderText(generate(CONFIG, { ...data, pct_marker: pct, pct_cursor: pct })),
      );
      const wanted = idealEdge(el, gauge, width);
      const expected = Math.max(0, Math.min(wanted, gauge - width));
      expect(leftEdge(el, gauge, width), `${name} at ${pct}%`).toBeCloseTo(expected, 1);
    }
  });

  test('keeps the start of the reading visible when it is wider than the gauge', () => {
    for (const state of [0, 90]) {
      const el = readingCarrier(renderText(generate(CONFIG, row('co', state))));
      expect(leftEdge(el, 100, 160), `${name} co at ${state}`).toBe(0);
    }
  });

  test('holds the reading in with the same expression in both layouts', () => {
    const el = readingCarrier(renderText(generate(CONFIG, row('co', 90))));
    const transform = (el.getAttribute('style').match(/transform:\s*([^;]+)/) || [])[1]?.trim();
    // Not a style preference: the two bounds are what keep the row inside, and
    // a layout that reached the same result some other way would still have to
    // be re-derived by hand the next time either one changes.
    expect(transform, `${name} carries no clamp`).toMatch(/^translateX\(clamp\(.*cqw.*\)\)$/);
  });
});

describe('the cursor does not follow the reading', () => {
  test.each(LAYOUTS)('%s layout', (name, generate) => {
    const markup = renderText(generate(CONFIG, row('co', 90)));
    const host = document.createElement('div');
    host.innerHTML = markup;
    // The full layout draws a triangle, the compact one a bar; both are the
    // element that reports the position, and neither may slide with the row.
    const cursor = host.querySelector('.triangle, .compact-cursor');
    expect(cursor, `${name} draws no cursor`).not.toBeNull();
    const style = cursor.getAttribute('style');
    expect(style, `${name} lets the cursor slide`).not.toContain('clamp');
    expect(style).toMatch(/left:\s*100%/);
  });
});
