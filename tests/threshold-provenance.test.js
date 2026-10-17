import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PoolMonitorCard } from '../src/pool-monitor-card.js';
import { POOL_SENSORS } from '../src/sensors.js';
import { CARDS } from '../../../scripts/generate-readmes.js';

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
// It does not cover the whole registry. UNSOURCED below names the presets
// still undocumented out loud, so a partial job stays visible instead of
// reading as a finished one, and so adding a preset forces a decision about
// which list it joins. It started with six documented, the ones whose value
// visibly depends on a national convention or on the kind of pool.

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
  // Added by #156. These seven were not sourced on purpose: they are the ones
  // whose published sentence announced a range their scale does not paint, so
  // rewriting the sentence forced the question "where does this number come
  // from" to be answered anyway. The answer is the same for all seven, and
  // saying it out loud is the point: no document was opened for any of them.
  temperature: { unit: '°C', setpoint: 27, step: 1, ours: [27, 1] },
  ec: { unit: 'µS/cm', setpoint: 4000, step: 200, ours: [4000, 200] },
  tds: { unit: 'g/L', setpoint: 5, step: 0.5, ours: [5, 0.5] },
  salinity: { unit: 'ppm', setpoint: 3000, step: 500, ours: [3000, 500] },
  calcium: { unit: 'ppm', setpoint: 300, step: 100, ours: [300, 100] },
  phosphate: { unit: 'ppb', setpoint: 50, step: 10, ours: [50, 10] },
  alkalinity: { unit: 'ppm', setpoint: 100, step: 20, ours: [100, 20] }, // Added for R3 (#156). These thirteen describe a piece of equipment or a
  // container rather than the water, so no standard could speak for them: the
  // right value is the one written on the installation's own pump, tank or
  // controller. Declaring both numbers ours is the finished state for them,
  // not a gap left open.
  chlorinator: { unit: '%', setpoint: 50, step: 10, ours: [50, 10] },
  filtration_time: { unit: 'h', setpoint: 8, step: 2, ours: [8, 2] },
  flow_rate: { unit: 'm³/h', setpoint: 10, step: 1, ours: [10, 1] },
  heat_pump_setpoint: { unit: '°C', setpoint: 28, step: 1, ours: [28, 1] },
  humidity: { unit: '%', setpoint: 60, step: 10, ours: [60, 10] },
  light_brightness: { unit: '%', setpoint: 80, step: 10, ours: [80, 10] },
  pressure: { unit: 'psi', setpoint: 12, step: 2, ours: [12, 2] },
  product_volume: { unit: 'L', setpoint: 20, step: 5, ours: [20, 5] },
  product_weight: { unit: 'kg', setpoint: 25, step: 5, ours: [25, 5] },
  pump_energy: { unit: 'kWh', setpoint: 5, step: 2, ours: [5, 2] },
  pump_speed: { unit: '%', setpoint: 50, step: 10, ours: [50, 10] },
  uv_radiation: { unit: 'mW/cm²', setpoint: 4, step: 1, ours: [4, 1] },
  water_level: { unit: '%', setpoint: 100, step: 10, ours: [100, 10] },
  // Added by #172. Unlike every entry above, this one moved its value: the old
  // 1.1 with a step of 0.2 painted 0.7 to 1.5 and called fresh water and sea
  // water alike Ideal, so the scale could not signal anything. The setpoint is
  // read off a published NaCl density table; the step is ours.
  specific_gravity: { unit: 'sg', setpoint: 1.002, step: 0.001, ours: [0.001] },
};

// The presets left undocumented by this change, named rather than counted. A
// count would go stale silently; a list fails loudly the day the registry moves.
const UNSOURCED = [
  // Water chemistry with a published answer somewhere, not yet opened.
  'magnesium',
];

describe('every preset is accounted for, sourced or not', () => {
  it('splits the registry in two with nothing falling between', () => {
    expect([...Object.keys(SOURCED), ...UNSOURCED].sort()).toEqual(
      Object.keys(POOL_SENSORS).sort(),
    );
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
    // Moved on purpose by #172, decided by the PO on 2026-10-17. The old value
    // was [1.1, 0.2]; see the specific_gravity block below for why.
    specific_gravity: [1.002, 0.001, 'sg'],
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

// ---------------------------------------------------------------------------
// The published page against the scale the card actually paints (#156)
// ---------------------------------------------------------------------------
//
// Five pool presets announced, on the public page, a range their scale does not
// paint for anybody. Four of them were narrower than the axis (ec, salinity,
// alkalinity, calcium), which reads as a defensible shorthand until you notice
// nothing on the page says so. The fifth, tds, was in another unit entirely:
// the preset ships g/L and the sentence said "Saltwater pools: 3000-5000 ppm",
// so a reader configuring their card from that sentence was out by a factor of
// a thousand. Two more, temperature and phosphate, turned up while measuring.
//
// THE RULE, AND WHY THIS ONE. "The sentence announces the green zone, the axis
// covers more" was a candidate: write it down once and let every preset follow
// it. It was rejected, and not on taste. #149 had already written the opposite
// convention into six presets a day earlier ("The card ships `setpoint: X` with
// `step: Y`, which paints A to B"), magnesium already agreed with its scale by
// itself, and a reader given only the green zone has no way to know what the
// card will paint, which is the thing they are about to look at. So: the page
// states the scale the card paints. A narrower recommendation may sit next to
// it, named for what it is, in the unit it belongs to. That is what
// free_chlorine already does with its DIN figures in mg/l.
//
// The check is deliberately two-sided, because either half alone lets the
// original bug through. The first half catches a wrong range in the right unit;
// only the second catches a right-looking range in the wrong unit, which is
// exactly what tds shipped.
const DETAILS = CARDS.find(c => c.package === 'pool-monitor').sensorDetails;

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Every "A to B" or "A-B" in the prose, optionally followed by a unit. Ranges
// are read out of the sentence the reader reads, not out of a structured field,
// because the sentence is what misled them. The number pattern stops at the
// decimals rather than swallowing any run of dots: `[\d.]*` turned the "7.6."
// that ends the pH sentence into NaN, and a comparison against NaN is a check
// that cannot fail for the right reason.
const NUMBER = '\\d+(?:\\.\\d+)?';
const rangesIn = (text, unit = '') => {
  const tail = unit ? `\\s*${escape(unit)}(?![\\w/])` : '';
  const re = new RegExp(`(${NUMBER})\\s*(?:-|to)\\s*(${NUMBER})${tail}`, 'g');
  return [...text.matchAll(re)].map(m => [Number(m[1]), Number(m[2])]);
};

const paintedScale = key => {
  const painted = build(key, POOL_SENSORS[key].setpoint).setpoint_class.map(Number);
  return [painted[0], painted[4]];
};

// The two presets whose prose carries numbers that are deliberately NOT a
// position on the axis. Named with what they are instead, rather than silently
// skipped: an exemption nobody can read is how the four narrow ranges above
// survived eighteen months.
const NOT_A_SCALE = {
  pressure: '8-10 psi is a rise above the clean-filter baseline, not a point on the axis',
  chlorinator: '0-100% is the range the reading itself spans, and the page declines to pick one',
};

describe('the published page describes the scale the card paints', () => {
  const keys = Object.keys(POOL_SENSORS).filter(k => !(k in NOT_A_SCALE));

  it('covers every preset except the ones named as not describing a scale', () => {
    expect([...keys, ...Object.keys(NOT_A_SCALE)].sort()).toEqual(Object.keys(POOL_SENSORS).sort());
  });

  it.each(keys)('%s: no range in its own unit other than the one it paints', key => {
    const [lo, hi] = paintedScale(key);
    rangesIn(DETAILS[key] ?? '', POOL_SENSORS[key].unit).forEach(([a, b]) => {
      expect(
        [a, b],
        `${key}: the page announces ${a} to ${b} ${POOL_SENSORS[key].unit}, the card paints ${lo} to ${hi}`,
      ).toEqual([lo, hi]);
    });
  });

  it.each(keys)('%s: a page that quotes any range quotes the painted one', key => {
    const text = DETAILS[key] ?? '';
    const all = rangesIn(text);
    if (!all.length) return;
    const [lo, hi] = paintedScale(key);
    expect(
      all.some(([a, b]) => a === lo && b === hi),
      `${key}: the page quotes ${JSON.stringify(all)} and never the ${lo} to ${hi} the card paints`,
    ).toBe(true);
  });
});

// tds is the one that could mislead by a factor of a thousand, so its page does
// not just state the g/L scale: it names the ppm equivalent and hands a
// ppm-reporting probe the two lines to write. Both are executed here rather
// than trusted, on the model of the DIN recipe above.
describe('tds cannot be read a thousand times off any more', () => {
  const PPM = { setpoint: 5000, step: 500 };

  it('says which unit it ships in and what that is in the other one', () => {
    expect(DETAILS.tds).toContain('g/L');
    expect(DETAILS.tds).toContain('1 g/L is 1000 ppm');
    expect(DETAILS.tds).toContain('4000 to 6000 ppm');
  });

  it('hands a ppm probe a recipe that paints the same water', () => {
    expect(DETAILS.tds).toContain('`setpoint: 5000`');
    expect(DETAILS.tds).toContain('`step: 500`');
    const gPerL = build('tds', 5).setpoint_class.map(Number);
    const ppm = build('tds', 5000, PPM).setpoint_class.map(Number);
    expect(ppm).toEqual(gPerL.map(v => v * 1000));
  });

  it('stops a ppm reading in the middle of the shipped range coming out Too High', () => {
    expect(build('tds', 5000).state).toBe('Too High');
    expect(build('tds', 5000, PPM).state).toBe('Ideal');
  });
});

// specific_gravity is the one preset whose default was moved rather than only
// documented (#172). The old scale called every pool Ideal, salted or not, so
// these are the readings that decide whether the new one says anything.
describe('specific gravity tells a salt pool from fresh water', () => {
  it('reads a salt pool on target as Ideal', () => {
    // 1.0012 is the salinity preset's 3000 ppm, 1.002 the tds preset's 5 g/L.
    expect(build('specific_gravity', 1.0012).state).toBe('Ideal');
    expect(build('specific_gravity', 1.002).state).toBe('Ideal');
  });

  it('no longer calls fresh water or sea water Ideal', () => {
    expect(build('specific_gravity', 1.0).state).not.toBe('Ideal');
    expect(build('specific_gravity', 1.025).state).not.toBe('Ideal');
  });

  it('warns its reader that a hydrometer barely resolves the difference', () => {
    expect(DETAILS.specific_gravity).toContain('0.001');
    expect(DETAILS.specific_gravity).toMatch(/salt/i);
  });
});
