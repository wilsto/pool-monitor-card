import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PoolMonitorCard } from '../src/pool-monitor-card.js';
import { POOL_SENSORS } from '../src/sensors.js';

// A pool threshold does not look wrong when it is wrong for you. It paints a
// correctly treated German pool Too Low and says nothing about why, because
// nothing on the card and nothing on the published page ever said which country
// the number was written for.
//
// That is what happened. @SebastianM asked in June 2025 why his controller,
// reading 0,50 Chlor mg/l, came out red on a scale centred on 3, and added that
// 3.0 mg/l "seems to be too high if I ask the internet". He was right, and the
// answer was not a bug: the shipped setpoint follows American practice and the
// page never said so. His message went unanswered for fourteen months
// (https://community.home-assistant.io/t/572179/58).
//
// The rule enforced here is the one the air card already lives under
// (packages/air-quality/tests/threshold-provenance.test.js): every number that
// ships is either quoted from a named source, or declared ours, and the two
// never blur. It is the same trap as #120 seen from the other side. There, six
// sentences put the WHO's name on figures it does not publish. Here, a figure
// carried no name at all, so the reader supplied one.
//
// TWO THINGS THIS FILE DELIBERATELY DOES NOT DO.
//
// It does not claim the numbers are right. No test can check that.
//
// It does not cover the whole registry. Twenty-eight presets ship and six are
// documented here: the ones whose value visibly depends on a national
// convention or on the kind of pool. UNSOURCED below names the other twenty-two
// out loud, so a partial job stays visible instead of reading as a finished
// one, and so adding a preset forces a decision about which list it joins.

// Line endings are normalised because git checks the file out with CRLF on
// Windows, which would leave a stray \r on every comment line collected here.
const SOURCE = readFileSync(resolve(__dirname, '../src/sensors.ts'), 'utf8').replace(/\r\n/g, '\n');

// The run of comment lines sitting immediately above a preset. Provenance is
// written next to the values it justifies, not in a document that drifts.
const provenanceBlock = key => {
  const at = SOURCE.indexOf(`\n  ${key}: {`);
  expect(at, `${key} is not declared at the top level of the registry`).toBeGreaterThan(-1);
  const above = SOURCE.slice(0, at).split('\n');
  const block = [];
  for (let i = above.length - 1; i >= 0; i--) {
    const line = above[i].trim();
    if (!line.startsWith('//')) break;
    block.unshift(line);
  }
  return block;
};

const build = (key, value, overrides = {}) => {
  const card = new PoolMonitorCard();
  const entity = `sensor.${key}`;
  card.hass = {
    states: {
      [entity]: { state: String(value), attributes: {}, last_updated: '2026-08-24T10:00:00Z' },
    },
    entities: {},
  };
  card.setConfig({ sensors: { [key]: { entity, ...overrides } } });
  return card.processData()[`${key}_1`];
};

// The six presets whose delivered value visibly depends on a convention, with
// the two numbers that define their scale spelled out here as well as in the
// source. A value that moves has to be moved in two places, one of which is a
// test somebody has to justify touching. `ours` lists which of the two are
// declared ours rather than quoted.
const SOURCED = {
  ph: { unit: 'pH', setpoint: 7.2, step: 0.2, ours: [7.2, 0.2] },
  orp: { unit: 'mV', setpoint: 700, step: 50, ours: [50] },
  cya: { unit: 'ppm', setpoint: 40, step: 10, ours: [40, 10] },
  free_chlorine: { unit: 'ppm', setpoint: 3, step: 0.5, ours: [3, 0.5] },
  total_chlorine: { unit: 'ppm', setpoint: 3, step: 0.5, ours: [3, 0.5] },
  bromine: { unit: 'ppm', setpoint: 4, step: 1, ours: [4, 1] },
};

// The presets left undocumented by this change, named rather than counted. A
// count would go stale silently; a list fails loudly the day the registry moves.
const UNSOURCED = [
  'alkalinity',
  'calcium',
  'chlorinator',
  'ec',
  'filtration_time',
  'flow_rate',
  'heat_pump_setpoint',
  'humidity',
  'light_brightness',
  'magnesium',
  'phosphate',
  'pressure',
  'product_volume',
  'product_weight',
  'pump_energy',
  'pump_speed',
  'salinity',
  'specific_gravity',
  'tds',
  'temperature',
  'uv_radiation',
  'water_level',
];

describe('every preset is accounted for, sourced or not', () => {
  it('splits the registry in two with nothing falling between', () => {
    expect([...Object.keys(SOURCED), ...UNSOURCED].sort()).toEqual(Object.keys(POOL_SENSORS).sort());
  });

  it('does not let a preset be claimed by both lists', () => {
    expect(UNSOURCED.filter(k => k in SOURCED)).toEqual([]);
  });
});

describe.each(Object.entries(SOURCED))('%s provenance', (key, expected) => {
  const sensor = POOL_SENSORS[key];

  it('carries the values it is documented with, in the unit it is documented in', () => {
    expect(sensor.setpoint).toBe(expected.setpoint);
    expect(sensor.step).toBe(expected.step);
    expect(sensor.unit).toBe(expected.unit);
  });

  it('states, for each of its two numbers, whether it is quoted or ours', () => {
    const block = provenanceBlock(key);
    [expected.setpoint, expected.step].forEach(value => {
      const marker = new RegExp(`^//\\s+${String(value).replace('.', '\\.')} ${expected.unit} - `);
      const line = block.find(l => marker.test(l));
      expect(line, `${key}: ${value} ${expected.unit} has no provenance line`).toBeDefined();
      const status = expected.ours.includes(value) ? 'OURS' : 'taken as published';
      expect(line, `${key}: ${value} ${expected.unit} is mislabelled`).toContain(status);
    });
  });

  it('names a source when it claims one', () => {
    const block = provenanceBlock(key);
    if (block.some(l => l.includes('taken as published'))) {
      expect(
        block.some(l => l.includes('https://')),
        `${key} quotes a source it does not name`,
      ).toBe(true);
    }
  });

  it('does not label a number both ways', () => {
    provenanceBlock(key)
      .filter(l => /^\/\/\s+[\d.]+ \S+ - /.test(l))
      .forEach(line => {
        expect(
          line.includes('OURS') && line.includes('taken as published'),
          `a value cannot be both quoted and ours: ${line}`,
        ).toBe(false);
      });
  });

  // The provenance describes the scale a reader actually sees, so the scale has
  // to be the one it describes: setpoint in the middle, two steps either side.
  it('paints the scale its provenance block describes', () => {
    const { setpoint, step } = expected;
    // Compared one by one and not as a whole: the arithmetic on the expected
    // side produces 7.6000000000000005, which is a float artefact of this
    // assertion rather than anything the card renders.
    const painted = build(key, setpoint).setpoint_class.map(Number);
    [-2, -1, 0, 1, 2].forEach((n, i) => expect(painted[i]).toBeCloseTo(setpoint + n * step, 6));
  });
});

// The decision of 2026-08-24 was to write down where the number comes from and
// change nothing. A provenance comment that arrived alongside a moved default
// would have been the worse of both worlds: every reader who had configured
// nothing would have seen their scale shift, and the note explaining it would
// have been buried in a diff. So this is the check that the change kept its
// word, and it covers the whole registry rather than the documented six.
describe('the delivered scales did not move', () => {
  const DELIVERED = {
    alkalinity: [100, 20, 'ppm'],
    bromine: [4, 1, 'ppm'],
    calcium: [300, 100, 'ppm'],
    chlorinator: [50, 10, '%'],
    cya: [40, 10, 'ppm'],
    ec: [4000, 200, 'µS/cm'],
    filtration_time: [8, 2, 'h'],
    flow_rate: [10, 1, 'm³/h'],
    free_chlorine: [3, 0.5, 'ppm'],
    heat_pump_setpoint: [28, 1, '°C'],
    humidity: [60, 10, '%'],
    light_brightness: [80, 10, '%'],
    magnesium: [1200, 100, 'ppm'],
    ph: [7.2, 0.2, 'pH'],
    phosphate: [50, 10, 'ppb'],
    pressure: [12, 2, 'psi'],
    product_volume: [20, 5, 'L'],
    product_weight: [25, 5, 'kg'],
    pump_energy: [5, 2, 'kWh'],
    pump_speed: [50, 10, '%'],
    orp: [700, 50, 'mV'],
    salinity: [3000, 500, 'ppm'],
    specific_gravity: [1.1, 0.2, 'sg'],
    tds: [5, 0.5, 'g/L'],
    temperature: [27, 1, '°C'],
    total_chlorine: [3, 0.5, 'ppm'],
    uv_radiation: [4, 1, 'mW/cm²'],
    water_level: [100, 10, '%'],
  };

  it('covers every preset in the registry', () => {
    expect(Object.keys(DELIVERED).sort()).toEqual(Object.keys(POOL_SENSORS).sort());
  });

  it.each(Object.entries(DELIVERED))('%s ships the value it shipped before', (key, frozen) => {
    const [setpoint, step, unit] = frozen;
    expect(POOL_SENSORS[key].setpoint).toBe(setpoint);
    expect(POOL_SENSORS[key].step).toBe(step);
    expect(POOL_SENSORS[key].unit).toBe(unit);
  });
});

// The published page tells a DIN 19643 user which two lines to write. If that
// recipe were wrong, the page would have replaced an unexplained number with an
// unusable one, so the recipe is executed here rather than trusted.
describe('the settings the public page hands a DIN 19643 pool', () => {
  const DIN = { setpoint: 0.45, step: 0.075 };

  it('paints the 0.3 to 0.6 mg/l the standard requires', () => {
    expect(build('free_chlorine', 0.5, DIN).setpoint_class.map(Number)).toEqual([
      0.3, 0.375, 0.45, 0.525, 0.6,
    ]);
  });

  it('stops calling a correctly treated German pool Too Low', () => {
    expect(build('free_chlorine', 0.5).state).toBe('Too Low');
    expect(build('free_chlorine', 0.5, DIN).state).toBe('Ideal');
  });
});
