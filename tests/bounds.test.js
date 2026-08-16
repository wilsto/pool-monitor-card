import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// PO decision 2026-08-15 (#5): `min` and `max` accept both forms, the type
// decides at runtime — a number is a scale boundary (what the README has always
// documented), a string is a tracking entity that places a marker on the bar.
// Until now a number was resolved as an entity id, found nothing, and silently
// fell back to the current value: sensor-monitor-card#5, #6, pool-monitor-card#88.

const hass = {
  states: {
    'sensor.power': {
      state: '3000',
      attributes: { unit_of_measurement: 'W' },
      last_updated: '2026-08-15T10:00:00Z',
    },
    'sensor.observed_low': { state: '1000', attributes: {} },
    'sensor.observed_high': { state: '5000', attributes: {} },
  },
  entities: {},
};

function build(sensor) {
  const card = new PoolMonitorCard();
  card.hass = hass;
  card.setConfig({ sensors: { power: sensor } });
  return card.processData().power_1;
}

describe('min/max — numeric form sets the scale bounds', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('a numeric min/max defines the visible range, independently of setpoint', () => {
    // setpoint deliberately off-centre: with the derived scale the bar would be
    // [1500-3*100, 1500+3*100] and the value would clamp to 100%.
    const d = build({ entity: 'sensor.power', min: 0, max: 6000, setpoint: 1500, step: 100 });
    expect(Number(d.pct)).toBeCloseTo(50, 0);
  });

  it('a value at the lower bound sits at 0%', () => {
    const d = build({ entity: 'sensor.power', min: 3000, max: 6000, setpoint: 3000, step: 100 });
    expect(Number(d.pct)).toBeCloseTo(0, 0);
  });

  it('exposes the resolved bounds rather than falling back in silence', () => {
    const d = build({ entity: 'sensor.power', min: 0, max: 6000, setpoint: 3000, step: 100 });
    expect(d.bar_min).toBe(0);
    expect(d.bar_max).toBe(6000);
  });

  it('a numeric bound draws no tracking marker', () => {
    const d = build({ entity: 'sensor.power', min: 0, max: 6000, setpoint: 3000, step: 100 });
    // markers belong to the entity form; a boundary is not an observation
    expect(d.min_value).toBe(d.value);
    expect(d.max_value).toBe(d.value);
  });
});

describe('min/max — string form keeps the tracking-entity behaviour', () => {
  it('resolves an entity id to its state', () => {
    const d = build({
      entity: 'sensor.power',
      min: 'sensor.observed_low',
      max: 'sensor.observed_high',
      setpoint: 3000,
      step: 1000,
    });
    expect(d.min_value).toBe(1000);
    expect(d.max_value).toBe(5000);
  });

  it('an unknown entity id does not crash the card', () => {
    const d = build({ entity: 'sensor.power', min: 'sensor.nope', setpoint: 3000, step: 1000 });
    expect(d.value).toBe(3000);
  });
});
