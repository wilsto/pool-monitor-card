import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { cardContent } from '../src/components/card-content.js';
import { styles } from '../src/styles/styles.js';

/**
 * What the two layouts owe each other, asked as properties rather than case
 * by case.
 *
 * The sixth hard guard of `CLAUDE.md` says the rendering is written twice and
 * that a rendering fix applies to both. Between #70 and #148 that written rule
 * missed three separate divergences, one of them asleep since February, and
 * every one of them was then closed by a test that covered that one case:
 * `reading-inside-card.test.js` compares the two layouts on where the reading
 * sits, and would have caught neither the grey of #148 nor the `NaN` of #145.
 *
 * So this file asks the question one level up. It does not enumerate what the
 * two layouts must show; it states three properties that hold for any row they
 * are given, and the fourth-in-the-family divergence has to violate one of
 * them to ship:
 *
 *   1. they read the same facts (the static half, `card-content.ts` itself)
 *   2. neither ever paints `NaN`, whatever it is handed
 *   3. an unavailable row is marked, and the mark is one the stylesheet dims
 *
 * The first is the general net and the reason this file exists: #148 was
 * `data.disabled` read by one body and not the other, which is a shape, not an
 * accident, and a shape can be checked without knowing what the field means.
 * Its cost is the exception table below, which is real: an exception written
 * without a reason turns this guard back into the written rule it replaces.
 * That is why each entry carries one, and why two of the three say plainly
 * that they are open questions rather than settled designs.
 *
 * What none of this proves: that the two layouts *look* alike, or that either
 * is right. A field read by both can still be read wrongly by one, which is
 * what #144 was, and only a measurement catches that.
 */

const SOURCE = readFileSync(resolve(__dirname, '../src/components/card-content.ts'), 'utf8');

/** The body of one static method, by brace balance rather than by regex. */
function methodBody(name) {
  const start = SOURCE.indexOf(`static ${name}(`);
  expect(start, `no method named ${name} in card-content.ts`).toBeGreaterThan(-1);
  const open = SOURCE.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < SOURCE.length; i++) {
    if (SOURCE[i] === '{') depth++;
    else if (SOURCE[i] === '}' && --depth === 0) return SOURCE.slice(open, i + 1);
  }
  throw new Error(`unbalanced braces in ${name}`);
}

/**
 * Every field of the row a body reads.
 *
 * Lexical on purpose. The alternative was a proxy over `SensorData` recording
 * property gets at render time, which sounds stricter and is weaker: it only
 * sees the fields the fixture happens to make reachable, so a field read
 * inside a branch no fixture enters would count as unread by both layouts and
 * the divergence would pass. Reading the source sees every branch.
 *
 * Covers `data.x` and the `(data as any).x` the compact body uses for `min`
 * and `max`.
 */
function fieldsRead(body) {
  // Comments come out first, and that is not tidiness. Caught while breaking
  // this file on purpose: the fix for #148 carries a comment naming
  // `data.disabled`, and with the class removed from the markup the guard
  // stayed green on the strength of the comment alone. A guard that a sentence
  // about the code can satisfy is the written rule again.
  const code = body.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
  const found = new Set();
  for (const m of code.matchAll(/\bdata\s*(?:as any\))?\s*\.\s*([A-Za-z_$][\w$]*)/g))
    found.add(m[1]);
  return found;
}

/**
 * The asymmetries that exist today, each with why.
 *
 * Not a list of things that are fine. It is the list of things somebody has
 * looked at: adding a line here is the moment to say whether the difference is
 * a design or a defect, and two of these three are recorded as open.
 */
const ACCEPTED = {
  color: [
    'full',
    'The full layout paints its value bubble with the band colour. The compact row has ' +
      'no bubble: its only colour is the gradient bar underneath, shared by every sensor. ' +
      'OPEN QUESTION, not a settled design: a compact row gives no per-reading colour at ' +
      'all, so severity there is carried by the label alone. Reported with #148, not fixed ' +
      'inside it.',
  ],
  last_updated: [
    'full',
    'The full layout writes the age of the reading in a status note under the row. The ' +
      'compact row has no second line to put it on. OPEN QUESTION: the consequence is that ' +
      '`display.show_last_updated` is silently inert in compact, which is an option that ' +
      'appears to do nothing rather than a layout that is denser. Reported with #148.',
  ],
  separator: [
    'compact',
    'A design, and the one entry here that is settled. The compact row runs the reading ' +
      'and the state together on a single line and needs a character between them; the full ' +
      'layout puts the state in its own `.marker-state` span on whichever side the reading ' +
      'is not, where a separator would be a stray dash.',
  ],
};

describe('the two layouts read the same facts about a row', () => {
  const full = fieldsRead(methodBody('generateBody'));
  const compact = fieldsRead(methodBody('generateCompactBody'));

  test('no field is read by one layout and ignored by the other', () => {
    const asymmetric = [
      ...[...full].filter(f => !compact.has(f)).map(f => [f, 'full']),
      ...[...compact].filter(f => !full.has(f)).map(f => [f, 'compact']),
    ].sort();

    const unexplained = asymmetric.filter(([field, side]) => ACCEPTED[field]?.[0] !== side);

    expect(
      unexplained.map(([field, side]) => `data.${field} is read by ${side} only`),
      'A fact one layout shows and the other does not. If that is deliberate, add it to ' +
        'ACCEPTED with the reason; if it is not, it is the next #148.',
    ).toEqual([]);
  });

  test('the exception table describes today, not some earlier today', () => {
    // An exception that no longer corresponds to anything is worse than none:
    // it is a hole left open in the guard, and it is silent.
    const stale = Object.entries(ACCEPTED).filter(([field, [side]]) =>
      side === 'full'
        ? !full.has(field) || compact.has(field)
        : !compact.has(field) || full.has(field),
    );
    expect(
      stale.map(([field]) => field),
      'listed as an accepted asymmetry and no longer one: delete the entry',
    ).toEqual([]);
  });

  test('both layouts read the row at all', () => {
    // Guards the guard: a rename that made `fieldsRead` match nothing would
    // otherwise turn every assertion above green.
    expect(full.size).toBeGreaterThan(10);
    expect(compact.size).toBeGreaterThan(10);
  });
});

const CONFIG = {
  display: {
    gradient: true,
    show_labels: true,
    show_icons: true,
    show_units: true,
    show_last_updated: true,
    blink: true,
    compact: false,
  },
  colors: {
    low: '#fdcb6e',
    warn: '#e17055',
    normal: '#00b894',
    cool: '#00BFFF',
    marker: '#000000',
    hi_low: '#00000099',
    fair: '#f1c40f',
    hazardous: '#8e44ad',
  },
};

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
 * One row, computed by a real card from a real entity state.
 *
 * Never a hand-written `data`: #145 lived in `card-base.ts`, in what the card
 * puts in the row, and a literal fixture is free to be well-formed in exactly
 * the way that hides it.
 */
function row(Card, sensor, state, sensorConfig = {}, extraStates = {}) {
  const card = new Card();
  card.hass = {
    states: {
      'sensor.x': {
        entity_id: 'sensor.x',
        state: String(state),
        attributes: {},
        last_updated: '2026-08-23T10:00:00Z',
      },
      ...extraStates,
    },
    entities: {},
  };
  card.setConfig({
    display: { blink: true },
    sensors: { [sensor]: { entity: 'sensor.x', ...sensorConfig } },
  });
  return card.processData()[`${sensor}_1`];
}

/**
 * Rows whose reading is not a number, plus enough ordinary ones to prove the
 * check is not passing because nothing renders.
 *
 * `override` is the shape of #145 and is here on two scales, because the two
 * failed differently: a centric scale left the row uncoloured and unlabelled,
 * a monotonic one classified the word `Very Poor` in the hazardous colour,
 * since every `NaN < limit` is false and `findIndex` answers -1.
 */
const ROWS = [
  [
    'pool ph, override with a word',
    () => row(PoolMonitorCard, 'ph', 7.2, { override: true, override_value: 'override' }),
  ],
  [
    'air co, override with a word',
    () => row(AirQualityCard, 'co', 12, { override: true, override_value: 'OFF' }),
  ],
  [
    'air co, override with no word to show',
    () => row(AirQualityCard, 'co', 12, { override: true }),
  ],
  [
    'air co, override with a number',
    () => row(AirQualityCard, 'co', 12, { override: true, override_value: '42' }),
  ],
  ['air co, entity unavailable', () => row(AirQualityCard, 'co', 'unavailable')],
  ['air co, entity unknown', () => row(AirQualityCard, 'co', 'unknown')],
  ['air co, entity state is a word', () => row(AirQualityCard, 'co', 'heat')],
  ['air co, entity state is empty', () => row(AirQualityCard, 'co', '')],
  [
    'air co, attribute that does not exist',
    () => row(AirQualityCard, 'co', 12, { attribute: 'nope' }),
  ],
  ['air co, ordinary reading', () => row(AirQualityCard, 'co', 12)],
  ['air co, at the top of its scale', () => row(AirQualityCard, 'co', 900)],
  ['pool ph, ordinary reading', () => row(PoolMonitorCard, 'ph', 7.2)],
];

describe.each([
  ['full', cardContent.generateBody],
  ['compact', cardContent.generateCompactBody],
])('%s layout: no reading is ever painted NaN', (name, generate) => {
  test.each(ROWS)('%s', (_label, build) => {
    const markup = renderText(generate(CONFIG, build()));

    // Both halves matter and they fail differently. `NaN` in the text is #145
    // as a user meets it, six letters where a value belongs. `NaN` in a style
    // is the same defect one step earlier: `left: NaN%` and
    // `translateX(clamp(NaNcqw, ...))` are declarations a browser drops, so the
    // row falls back to the corner of its container with nothing said.
    expect(markup, `${name}: the row paints the letters NaN`).not.toContain('NaN');
    expect(markup, `${name}: an Infinity reached the markup`).not.toMatch(/-?Infinity/);
    expect(markup, `${name}: an undefined reached the markup`).not.toContain('undefined');
  });

  test('the check would notice: a NaN put in on purpose is caught', () => {
    // Without this, a `generate` that returned an empty string would make
    // every assertion above pass.
    const data = { ...row(AirQualityCard, 'co', 12), pct_marker: NaN };
    expect(renderText(generate(CONFIG, data))).toContain('NaN');
  });
});

/**
 * The dimming rule, read off the stylesheet rather than named here.
 *
 * The property is not "the class is called `disabled`". It is that whatever
 * the layout adds to a row it believes unavailable, the stylesheet dims. A
 * rename of the class keeps this green; adding a class no rule dims does not.
 */
const CSS = styles.cssText;

/**
 * Every selector in the stylesheet that dims what it matches, as the set of
 * classes it requires.
 *
 * `.section.disabled` becomes `{section, disabled}`, so a row carrying only
 * `section` does not satisfy it. Asking whether a rule is *satisfied* rather
 * than whether one of its class names appears is the difference between "this
 * row is greyed" and "this row shares a word with a rule that greys".
 */
function dimmingRules() {
  const rules = [];
  for (const m of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/opacity\s*:|filter\s*:\s*grayscale/.test(m[2])) continue;
    for (const sel of m[1].split(',')) {
      const required = [...sel.matchAll(/\.([\w-]+)/g)].map(c => c[1]);
      if (required.length) rules.push(new Set(required));
    }
  }
  return rules;
}

/** Whether the stylesheet greys a row carrying exactly these classes. */
const isDimmed = classes => dimmingRules().some(r => [...r].every(c => classes.has(c)));

function rootClasses(markup) {
  const host = document.createElement('div');
  host.innerHTML = markup;
  const root = host.querySelector('[class]');
  expect(root, 'the layout renders no element carrying a class').not.toBeNull();
  return new Set(root.className.split(/\s+/).filter(Boolean));
}

describe.each([
  ['full', cardContent.generateBody],
  ['compact', cardContent.generateCompactBody],
])('%s layout: an unavailable sensor does not look alive', (name, generate) => {
  const alive = () =>
    row(
      AirQualityCard,
      'co',
      12,
      { availability_entity: 'binary_sensor.a' },
      {
        'binary_sensor.a': { entity_id: 'binary_sensor.a', state: 'on', attributes: {} },
      },
    );
  const dead = state =>
    row(
      AirQualityCard,
      'co',
      12,
      { availability_entity: 'binary_sensor.a' },
      {
        'binary_sensor.a': { entity_id: 'binary_sensor.a', state, attributes: {} },
      },
    );

  test.each([['off'], ['unavailable']])('availability entity %s', state => {
    const before = rootClasses(renderText(generate(CONFIG, alive())));
    const after = rootClasses(renderText(generate(CONFIG, dead(state))));

    expect(
      [...after].filter(c => !before.has(c)),
      `${name}: the row is drawn exactly as a live one. A probe unplugged three days ago ` +
        'shows its last known value with nothing to say so (#148).',
    ).not.toEqual([]);

    expect(
      isDimmed(after),
      `${name}: the row carries a mark the stylesheet does not dim, so the mark is ` +
        `invisible. Classes emitted: ${[...after].join(' ')}`,
    ).toBe(true);
  });

  test('a live sensor is not dimmed', () => {
    expect(
      isDimmed(rootClasses(renderText(generate(CONFIG, alive())))),
      `${name}: a live row is greyed`,
    ).toBe(false);
  });

  test('the stylesheet still dims something at all', () => {
    // Guards the guard again: a stylesheet this parser failed to read would
    // make "a live sensor is not dimmed" pass for the wrong reason.
    expect(dimmingRules().length).toBeGreaterThan(0);
  });
});
