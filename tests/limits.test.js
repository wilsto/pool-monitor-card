import { describe, it, expect } from 'vitest';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// PO decision 2026-08-15 (#7): a monotonic quantity is expressed with explicit
// `limits` plus a reading direction, instead of bending `setpoint`.
// Approach adapted from @rpirsc13 (wilsto/air-quality-card#4), generalised:
// his `quality` mode assumes lower is better, which does not cover ORP
// (pool-monitor-card#85) where higher is better.

function build(sensor, state) {
  const card = new PoolMonitorCard();
  card.hass = {
    states: {
      'sensor.x': { state: String(state), attributes: {}, last_updated: '2026-08-15T10:00:00Z' },
    },
    entities: {},
  };
  card.setConfig({ sensors: { pm25: sensor } });
  return card.processData().pm25_1;
}

const PM25 = { entity: 'sensor.x', limits: [2, 5, 10, 15], min: 0, max: 20 };

describe('limits — explicit boundaries', () => {
  it('the five class boundaries come from the array, not from setpoint', () => {
    const d = build(PM25, 3);
    expect(d.setpoint_class.map(Number)).toEqual([0, 2, 5, 10, 15]);
  });

  it('ignores setpoint and step when limits are given', () => {
    const a = build({ ...PM25, setpoint: 999, step: 42 }, 3);
    const b = build(PM25, 3);
    expect(a.setpoint_class).toEqual(b.setpoint_class);
  });
});

describe('limits — reading direction', () => {
  it('lower is better by default: a low value is good, a high one is not', () => {
    const bon = build(PM25, 1);
    const mauvais = build(PM25, 18);
    expect(bon.color).not.toBe(mauvais.color);
    expect(bon.color).toBe('#00b894'); // normal — green, the best band
  });

  it('higher is better: the ramp is reversed', () => {
    const orp = {
      entity: 'sensor.x',
      limits: [400, 550, 650, 750],
      min: 300,
      max: 900,
      direction: 'higher_is_better',
    };
    const bas = build(orp, 320);
    const haut = build(orp, 800);
    expect(bas.color).not.toBe(haut.color);
    expect(haut.color).toBe('#00b894'); // best band is now the high end
  });
});

describe('limits — no regression without them', () => {
  it('a sensor without limits keeps the derived scale', () => {
    const d = build({ entity: 'sensor.x', setpoint: 10, step: 2 }, 10);
    expect(d.setpoint_class.map(Number)).toEqual([6, 8, 10, 12, 14]);
  });
});

// Found by looking at the screen, not by unit tests: every test above passes
// `min` and `max` explicitly, so none exercised limits on their own. The CO
// preset has limits and no setpoint/step at all — the bar range was still
// derived from setpoint ± 3·step, which are absent, so it collapsed to zero
// width and all five labels stacked at 100%.
describe('limits without explicit bounds still span the bar', () => {
  const sansBornes = { entity: 'sensor.x', limits: [6, 9, 30, 87], min_limit: 0 };

  it('spreads the labels instead of stacking them', () => {
    const d = build(sansBornes, 3);
    const positions = d.label_positions.map(v => Math.round(v));
    expect(new Set(positions).size, `labels stacked: ${positions}`).toBeGreaterThan(3);
  });

  it('starts at the first boundary and ends at the last', () => {
    const d = build(sansBornes, 3);
    expect(Math.round(d.label_positions[0])).toBe(0);
    expect(Math.round(d.label_positions[4])).toBe(100);
  });

  it('places the value proportionally inside that range', () => {
    // 30 of [0, 87] is a bit over a third of the way
    expect(Number(build(sansBornes, 30).pct)).toBeCloseTo(34.5, 0);
  });

  it('an explicit min/max still wins over the limits', () => {
    const d = build({ ...sansBornes, min: 0, max: 200 }, 100);
    expect(Number(d.pct)).toBeCloseTo(50, 0);
  });
});
