import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { hasScale } from '../src/scale.js';
import { SensorMonitorCard } from '../../sensor-monitor/src/sensor-monitor-card.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

/**
 * A sensor with no scale used to be its own reference (#98).
 *
 * Measured again on 2026-08-23 before anything was changed, on the generic
 * card because it is the one with no presets and therefore the one whose
 * configurations are written by hand. With neither `limits` nor `setpoint`,
 * the engine fell back to the reading as the setpoint, closed the five bands
 * around it one step apart, and the reading landed in the middle of them by
 * construction:
 *
 *   value 1    state "Ideal"  #00b894  bands 0.8 0.9 1.0 1.1 1.2   cursor 50%
 *   value 12   state "Ideal"  #00b894  bands 11.8 11.9 12.0 12.1 12.2  cursor 50%
 *   value 500  state "Ideal"  #00b894  bands 499.8 499.9 500.0 500.1 500.2  cursor 50%
 *
 * The same three numbers, the same verdict, the same green, the same cursor
 * in the middle. A supervision card that reassures whatever the number is
 * fails worse than one that says nothing, which is why this is a defect and
 * not a rough edge.
 *
 * The bench was searched for the case before choosing a remedy: 409 sensors
 * across 154 cards in `bench/config/ui_lovelace_minimalist/dashboard`, every
 * one of them carrying either its own scale (54) or a preset that has one
 * (355). None affected. The remedy could therefore be firm.
 *
 * What it does: the sensor is refused, and says so where a missing entity
 * already says so. What it costs: a bar someone was looking at is replaced by
 * a warning, without them asking. The refusal is kept as small as it can be,
 * one sensor rather than the card, which is the last group of tests here.
 */

const STATES = value => ({
  'sensor.x': { state: String(value), attributes: {}, last_updated: '2026-08-23T10:00:00Z' },
  'sensor.ph': { state: '7.4', attributes: {}, last_updated: '2026-08-23T10:00:00Z' },
  'sensor.sp': { state: '25', attributes: {}, last_updated: '2026-08-23T10:00:00Z' },
});

/** One freeform sensor on the generic card, which is the exposed one. */
function generic(sensor, value = 12) {
  const card = new SensorMonitorCard();
  card.hass = { states: STATES(value), entities: {} };
  card.setConfig({ sensors: { pm25: { entity: 'sensor.x', ...sensor } } });
  return card.processData().pm25_1;
}

describe('the measurement of #98, locked', () => {
  it('one, twelve and five hundred no longer all read Ideal', () => {
    const verdicts = [1, 12, 500].map(v => generic({}, v).state);
    expect(verdicts).toEqual([undefined, undefined, undefined]);
  });

  it('no colour is claimed either, green least of all', () => {
    for (const v of [1, 12, 500]) {
      expect(generic({}, v).color).toBeUndefined();
    }
  });

  it('the sensor is marked as having no scale', () => {
    expect(generic({}).no_scale).toBe(true);
  });

  // The bands were the mechanism: five numbers derived from the reading, which
  // therefore always sat in the middle of them. None of them is computed now,
  // rather than computed and ignored, so nothing downstream can pick one up.
  it('and carries none of the fields a verdict is built from', () => {
    const d = generic({});
    for (const field of ['setpoint', 'setpoint_class', 'label_positions', 'bar_min', 'bar_max']) {
      expect(d[field]).toBeUndefined();
    }
  });
});

describe('what looks like a scale and is not', () => {
  // These two make the failure more convincing, not less, which is why they
  // are named. Both were measured on 2026-08-23 in the same run as above.
  it('min and max size the bar, they do not say what is good', () => {
    // Measured before the fix: bar 0..100, cursor at 12%, state "Ideal".
    expect(generic({ min: 0, max: 100 }).no_scale).toBe(true);
  });

  it('a step with no setpoint is a ladder with no rung to start from', () => {
    // Measured before the fix: bands 2 7 12 17 22, five evenly spaced labels
    // that look published and are centred on whatever the sensor last said.
    expect(generic({ step: 5 }).no_scale).toBe(true);
  });

  it('a setpoint entity that resolves to nothing is not a setpoint', () => {
    expect(generic({ setpoint_entity: 'sensor.absent' }).no_scale).toBe(true);
  });

  it('nor is a setpoint that is not a number', () => {
    expect(generic({ setpoint: 'abc' }).no_scale).toBe(true);
  });

  it('nor are three boundaries where the engine reads four', () => {
    expect(generic({ limits: [2, 5, 10] }).no_scale).toBe(true);
  });

  it('heatflow has the same hole and is closed by the same guard', () => {
    expect(generic({ mode: 'heatflow' }).no_scale).toBe(true);
  });
});

describe('a real scale is untouched', () => {
  it('four limits still grade the reading', () => {
    const d = generic({ limits: [2, 5, 10, 15], min: 0, max: 20 });
    expect(d.no_scale).toBeUndefined();
    expect(d.state).toBe('Poor');
  });

  it('a setpoint and a step still grade it', () => {
    const d = generic({ setpoint: 12, step: 2 });
    expect(d.no_scale).toBeUndefined();
    expect(d.state).toBe('Ideal');
  });

  it('a setpoint of zero is a setpoint, not an absence', () => {
    expect(generic({ setpoint: 0, step: 5 }).no_scale).toBeUndefined();
  });

  it('a setpoint entity that resolves is one too', () => {
    expect(generic({ setpoint_entity: 'sensor.sp', step: 5 }).no_scale).toBeUndefined();
  });

  it('a preset carries its own scale, so preset cards are unaffected', () => {
    const card = new PoolMonitorCard();
    card.hass = { states: STATES(12), entities: {} };
    card.setConfig({ sensors: { ph: { entity: 'sensor.ph' } } });
    const d = card.processData().ph_1;
    expect(d.no_scale).toBeUndefined();
    expect(d.state).toBeTruthy();
  });
});

// The card renders its rows twice, full and compact, and every rendering fix
// in this repository has had to be applied in both. This one is written once,
// before the layout is chosen, and these two tests are what keeps it there.
describe('both layouts refuse, and neither shows a bar', () => {
  const paint = compact => {
    const card = new SensorMonitorCard();
    card.hass = { states: STATES(500), entities: {} };
    card.setConfig({
      display: { compact },
      sensors: { pm25: { entity: 'sensor.x', name: 'Fine particles', unit: 'ug/m3' } },
    });
    const host = document.createElement('div');
    render(card.render(), host);
    return host;
  };

  it.each([
    ['full', false],
    ['compact', true],
  ])('%s: says the sensor has no scale and how to give it one', (_name, compact) => {
    const text = paint(compact).textContent.replace(/\s+/g, ' ');
    expect(text).toContain('has no scale');
    expect(text).toContain('limits');
    expect(text).toContain('setpoint');
  });

  it.each([
    ['full', false],
    ['compact', true],
  ])('%s: shows no verdict and no reading beside it', (_name, compact) => {
    const text = paint(compact).textContent.replace(/\s+/g, ' ');
    expect(text).not.toContain('Ideal');
    expect(text).not.toContain('500');
  });

  it.each([
    ['full', false],
    ['compact', true],
  ])('%s: draws no bar', (_name, compact) => {
    expect(paint(compact).querySelector('.progress, .progress-temp')).toBeNull();
  });

  // Written once means written in render(), where the layout has not been
  // chosen yet. Moving it into card-content.ts would silently make it a
  // one-layout fix, the failure this repository keeps having.
  it('the branch lives above the layout split, not inside a layout', () => {
    const root = resolve(__dirname, '../..');
    const read = p => readFileSync(resolve(root, p), 'utf8');
    expect(read('core/src/card-base.ts')).toContain('no_scale');
    expect(read('core/src/components/card-content.ts')).not.toContain('no_scale');
  });
});

// The refusal is deliberately the smallest one that removes the verdict. A
// throw in setConfig would have been the other shape, and it would replace the
// whole card, including sensors that are correctly configured.
describe('the refusal stops at the sensor', () => {
  const card = () => {
    const c = new SensorMonitorCard();
    c.hass = { states: STATES(12), entities: {} };
    c.setConfig({
      sensors: {
        bare: { entity: 'sensor.x', name: 'Bare' },
        graded: { entity: 'sensor.x', name: 'Graded', setpoint: 12, step: 2 },
      },
    });
    return c;
  };

  it('accepting the configuration, so the card still loads', () => {
    expect(() => card()).not.toThrow();
  });

  it('the sibling with a scale keeps its verdict', () => {
    expect(card().processData().graded_1.state).toBe('Ideal');
  });

  it('and the card shows both the warning and the working sensor', () => {
    const host = document.createElement('div');
    render(card().render(), host);
    const text = host.textContent.replace(/\s+/g, ' ');
    expect(text).toContain('has no scale');
    expect(text).toContain('Graded');
  });
});

describe('hasScale', () => {
  it('four finite limits are a scale', () => {
    expect(hasScale([2, 5, 10, 15])).toBe(true);
  });

  it('any one setpoint source is a scale', () => {
    expect(hasScale(undefined, 12, null, null)).toBe(true);
    expect(hasScale(undefined, null, '12', null)).toBe(true);
    expect(hasScale(undefined, null, null, 12)).toBe(true);
  });

  it('zero is a value, not an absence', () => {
    expect(hasScale(undefined, 0)).toBe(true);
  });

  it('nothing at all is not a scale', () => {
    expect(hasScale(undefined)).toBe(false);
    expect(hasScale(null, null, undefined, '')).toBe(false);
  });

  it('a wrong number of limits is not a scale', () => {
    expect(hasScale([])).toBe(false);
    expect(hasScale([2, 5, 10])).toBe(false);
    expect(hasScale([2, 5, 10, 15, 20])).toBe(false);
  });

  it('a boundary that is not a number is not a boundary', () => {
    expect(hasScale([2, 5, 10, 'x'])).toBe(false);
    expect(hasScale(undefined, 'abc')).toBe(false);
    expect(hasScale(undefined, NaN)).toBe(false);
  });
});
