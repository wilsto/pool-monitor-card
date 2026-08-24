import { describe, it, expect } from 'vitest';
import { cardContent } from '../src/components/card-content.js';
import { styles } from '../src/styles/styles.js';
import { DEFAULT_DISPLAY } from '../src/configs/config.js';
import { displaySchema } from '../src/editor/ha-form-schemas.js';
import en from '../src/locales/en.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { SensorMonitorCard } from '../../sensor-monitor/src/sensor-monitor-card.js';

/**
 * The blink @rpirsc13 asked for on wilsto/air-quality-card#4, in April, as
 * `blink_threshold` (#123).
 *
 * He asked for an animation. He was told it was "tracked separately", which was
 * not true at the time; #32 was opened to make it true and then closed on the
 * layer underneath, the sourced thresholds. So the thing this file guards is
 * first of all that the answer is the one that was asked for: motion on the
 * reading, not a notification, not a named alert state.
 *
 * Four things are asserted, and each of them was watched to fail before being
 * believed:
 *
 *   1. The worst band is the one the scale itself names, in both directions and
 *      in both scale shapes.
 *   2. Nobody who did not ask for it gets motion.
 *   3. Both layouts blink, which is the sixth hard guard of CLAUDE.md.
 *   4. `prefers-reduced-motion` is honoured, and honoured by replacement rather
 *      than by deletion.
 */

/** Flattens a Lit TemplateResult back into the markup it describes. */
function renderText(template) {
  if (template == null || typeof template === 'boolean') return '';
  if (typeof template !== 'object') return String(template);
  if (!template.strings) return '';
  return template.strings.reduce(
    (acc, part, i) =>
      acc + part + (i < template.values.length ? renderText(template.values[i]) : ''),
    '',
  );
}

const CSS = styles.cssText;

/** The body of the `prefers-reduced-motion: reduce` block, or '' if there is none. */
const reducedMotionBlock = () => {
  const at = CSS.indexOf('prefers-reduced-motion');
  if (at === -1) return '';
  const open = CSS.indexOf('{', at);
  let depth = 0;
  for (let i = open; i < CSS.length; i++) {
    if (CSS[i] === '{') depth++;
    if (CSS[i] === '}' && --depth === 0) return CSS.slice(open + 1, i);
  }
  return '';
};

const build = (Card, sensors, display = {}) => {
  const card = new Card();
  card.hass = {
    states: {
      'sensor.probe': { state: '0', attributes: {} },
      ...Object.fromEntries(
        Object.entries(sensors).map(([, s]) => [
          s.entity,
          { state: String(s._state), attributes: {} },
        ]),
      ),
    },
    entities: {},
  };
  const clean = Object.fromEntries(
    Object.entries(sensors).map(([k, s]) => {
      const { _state, ...rest } = s;
      return [k, rest];
    }),
  );
  card.setConfig({ display: { blink: true, ...display }, sensors: clean });
  return card.processData();
};

// A pollutant: lower is better, so the worst band is the top one. The numbers
// are the delivered carbon monoxide scale, the one preset in this repository
// whose four bounds are all quoted from a published source.
const co = state => ({ co: { entity: 'sensor.co', _state: state } });

describe('the worst band is the one the scale itself names', () => {
  it('blinks a pollutant past its highest limit', () => {
    // 87 ppm is the last delivered bound for carbon monoxide.
    expect(build(AirQualityCard, co(90)).co_1.blink).toBe(true);
    expect(build(AirQualityCard, co(87)).co_1.blink).toBe(true);
  });

  it('says nothing one step below it', () => {
    expect(build(AirQualityCard, co(86)).co_1.blink).toBe(false);
    expect(build(AirQualityCard, co(30)).co_1.blink).toBe(false);
    expect(build(AirQualityCard, co(2)).co_1.blink).toBe(false);
  });

  // The reversal is the case a wrong reading of the band index gets away with
  // on every pollutant and then fires on clean water. `higher_is_better`
  // reverses the ramp, so the worst band moves to the bottom of the scale.
  it('blinks at the other end when higher is better', () => {
    const low = build(PoolMonitorCard, {
      orp: {
        entity: 'sensor.orp',
        _state: 100,
        limits: [400, 500, 600, 700],
        direction: 'higher_is_better',
      },
    });
    const high = build(PoolMonitorCard, {
      orp: {
        entity: 'sensor.orp',
        _state: 800,
        limits: [400, 500, 600, 700],
        direction: 'higher_is_better',
      },
    });
    expect(low.orp_1.blink, 'ORP at 100 mV is the hazardous end').toBe(true);
    expect(high.orp_1.blink, 'ORP at 800 mV is the good end').toBe(false);
  });

  // A centric scale is bad outwards in both directions, and the card already
  // calls both ends Too Low and Too High and paints both `warn`.
  it('blinks at both ends of a centric scale, and not in the middle', () => {
    const ph = state => ({ ph: { entity: 'sensor.ph', _state: state } });
    expect(build(PoolMonitorCard, ph(6.0)).ph_1.blink, 'pH 6.0').toBe(true);
    expect(build(PoolMonitorCard, ph(9.0)).ph_1.blink, 'pH 9.0').toBe(true);
    expect(build(PoolMonitorCard, ph(7.4)).ph_1.blink, 'pH 7.4').toBe(false);
  });

  // Cool, normal, warm is a direction of flow, not a severity. Calling one of
  // its ends grave would be inventing a verdict the scale does not carry.
  it('never blinks a heatflow scale, at either end', () => {
    const temp = state => ({ temperature: { entity: 'sensor.t', _state: state } });
    expect(build(PoolMonitorCard, temp(2)).temperature_1.blink).toBe(false);
    expect(build(PoolMonitorCard, temp(45)).temperature_1.blink).toBe(false);
  });

  // A word is not in any band, and since #145 it is not put in one either.
  //
  // What this test recorded when it was written: the word reached the
  // monotonic comparisons as NaN, every `NaN < limit` was false, `findIndex`
  // returned -1, and -1 is the index of the worst band, so `OFF` arrived
  // labelled `band.5` in the hazardous colour. The blink was refused, the
  // misclassification was reported and left alone. #145 removed the cause: an
  // override is resolved before anything is parsed, so a non-numeric one takes
  // the branch a reading that is not a number has always taken, and is in no
  // band at all. The assertion below moved with the fix; the refusal to blink
  // is unchanged and is what this file is about.
  it('does not blink a reading that has been replaced by a word', () => {
    const d = build(AirQualityCard, {
      co: { entity: 'sensor.co', _state: 5, override: true, override_value: 'OFF' },
    });
    expect(Number.isFinite(d.co_1.value), 'the reading is not a number').toBe(false);
    expect(d.co_1.value, 'and the word it was given is what is shown').toBe('OFF');
    expect(d.co_1.state, 'a word is in no band, not in the worst one (#145)').toBe('');
    expect(d.co_1.blink).toBe(false);
  });

  // The generic card is the one with no presets, so it is the one where a
  // sensor can genuinely have nothing to be judged against (#98).
  it('does not blink a sensor with no scale to be worst on', () => {
    const card = new SensorMonitorCard();
    card.hass = { states: { 'sensor.x': { state: '500', attributes: {} } }, entities: {} };
    card.setConfig({ display: { blink: true }, sensors: { pm25: { entity: 'sensor.x' } } });
    const d = card.processData().pm25_1;
    expect(d.no_scale).toBe(true);
    expect(d.blink).toBeFalsy();
  });
});

describe('nobody who did not ask for motion gets any', () => {
  it('is off in the shipped defaults', () => {
    expect(DEFAULT_DISPLAY.blink).toBe(false);
  });

  it('stays silent on the worst reading there is when the option is off', () => {
    const card = new AirQualityCard();
    card.hass = { states: { 'sensor.co': { state: '500', attributes: {} } }, entities: {} };
    card.setConfig({ sensors: { co: { entity: 'sensor.co' } } });
    const d = card.processData().co_1;
    // the verdict is still delivered, it simply does not move
    expect(d.state).toBe(en.band['5']);
    expect(d.blink).toBe(false);
  });

  it('is offered in the editor with a label of its own', () => {
    const offered = displaySchema(k => k).map(f => f.name);
    expect(offered).toContain('blink');
    expect(en.editor.blink).toBeTruthy();
  });
});

// CLAUDE.md, sixth hard guard: the rendering is written twice and every fix
// applies to both. The class rides on `generateReading`, which both layouts
// call, so this is structural rather than a matter of remembering. The test
// exists anyway, because the structure is what a later refactor removes.
describe('both layouts blink, full and compact', () => {
  const config = {
    display: { ...DEFAULT_DISPLAY, blink: true },
    colors: { low: '#1', warn: '#2', normal: '#3', fair: '#4', cool: '#5', hazardous: '#6' },
  };
  const data = extra => ({
    name: 'co',
    title: 'CO',
    value: 90,
    unit: 'ppm',
    state: 'Very Poor',
    color: '#6',
    setpoint_class: ['0', '6', '9', '30', '87'],
    label_positions: [0, 7, 10, 34, 100],
    pct_marker: 100,
    pct_cursor: 100,
    pct_min: 100,
    pct_max: 100,
    side_align: 'right',
    separator: '-',
    mode: 'centric',
    hide_icon: true,
    is_mdi: true,
    invalid: false,
    ...extra,
  });

  for (const [layout, generate] of [
    ['full', cardContent.generateBody],
    ['compact', cardContent.generateCompactBody],
  ]) {
    it(`${layout}: carries the class when the reading is in the worst band`, () => {
      const markup = renderText(generate(config, data({ blink: true })));
      expect(markup).toContain('class="blink"');
    });

    it(`${layout}: carries nothing when it is not`, () => {
      const markup = renderText(generate(config, data({ blink: false })));
      expect(markup).not.toContain('class="blink"');
    });
  }
});

describe('someone who asked for less motion does not get motion', () => {
  it('animates the class at all', () => {
    expect(CSS).toMatch(/\.blink\s*\{[^}]*animation:/);
    expect(CSS).toContain('@keyframes blink');
  });

  it('switches the animation off under prefers-reduced-motion', () => {
    const block = reducedMotionBlock();
    expect(block, 'no prefers-reduced-motion block in the stylesheet').not.toBe('');
    expect(block).toContain('.blink');
    expect(block).toMatch(/animation:\s*none/);
  });

  // The easy half is switching the motion off. The half that gets skipped is
  // that the reason for the motion does not go away with it, so the query
  // replaces it rather than deleting it.
  it('puts something static in its place rather than nothing', () => {
    expect(reducedMotionBlock()).toMatch(/outline:/);
  });

  // WCAG 2.3.1: three flashes per second is where the general and red flash
  // thresholds begin. A period is asserted, not a frequency, because that is
  // what the stylesheet actually states.
  it('pulses far slower than the flash threshold', () => {
    const period = CSS.match(/animation:\s*blink\s+([\d.]+)s/);
    expect(period, 'the blink declares no duration').not.toBeNull();
    expect(Number(period[1])).toBeGreaterThanOrEqual(1);
  });

  // A reading that disappears is one somebody reads at the wrong moment and
  // gets nothing from, which on carbon monoxide is the opposite of the point.
  it('dims the reading without hiding it', () => {
    const frames = CSS.slice(CSS.indexOf('@keyframes blink'));
    const opacity = frames.match(/opacity:\s*([\d.]+)/);
    expect(opacity).not.toBeNull();
    expect(Number(opacity[1])).toBeGreaterThan(0);
  });
});
