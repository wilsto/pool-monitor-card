import { describe, it, expect } from 'vitest';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// @genem2 on sensor-monitor-card#3: "Any chance it can be made to use a value
// from an attribute? (Hate to make a bunch of template sensors.)"
//
// Plenty of integrations expose several readings on one entity as attributes —
// a pool controller publishing pH and ORP on the same device, a weather entity
// carrying humidity. Today each one needs a template sensor just to be shown.

const hass = {
  states: {
    'sensor.controller': {
      state: '7.2',
      attributes: { unit_of_measurement: 'pH', orp: 720, water_temp: 26.5, texte: 'nope' },
      last_updated: '2026-08-15T10:00:00Z',
    },
  },
  entities: {},
};

function build(sensor) {
  const card = new PoolMonitorCard();
  card.hass = hass;
  card.setConfig({ sensors: { ph: sensor } });
  return card.processData().ph_1;
}

describe('a sensor can read an attribute instead of the state', () => {
  it('reads the state when no attribute is given', () => {
    expect(build({ entity: 'sensor.controller' }).value).toBe(7.2);
  });

  it('reads the named attribute when one is given', () => {
    expect(build({ entity: 'sensor.controller', attribute: 'orp' }).value).toBe(720);
  });

  it('reads a decimal attribute', () => {
    expect(build({ entity: 'sensor.controller', attribute: 'water_temp' }).value).toBe(26.5);
  });

  it('treats a missing attribute like a missing value, not like the state', () => {
    const d = build({ entity: 'sensor.controller', attribute: 'inexistant' });
    expect(d.value).toBeNull();
  });

  it('treats a non-numeric attribute like a non-numeric state', () => {
    expect(build({ entity: 'sensor.controller', attribute: 'texte' }).value).toBeNull();
  });
});
