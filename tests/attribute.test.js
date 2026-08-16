import { describe, it, expect } from 'vitest';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { SensorMonitorCard } from '../../sensor-monitor/src/sensor-monitor-card.js';

// @genem2 on sensor-monitor-card#3: "Any chance it can be made to use a value
// from an attribute? (Hate to make a bunch of template sensors.)"
//
// Plenty of integrations expose several readings on one entity as attributes ,
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

// Found while writing the reply to sensor-monitor-card#3, before sending it.
//
// The decimals were counted on the entity state while the value came from an
// attribute. A climate entity's state is the word "heat"; parseFloat("heat") is
// NaN, NaN has no decimals, so precision fell to 0 and a target of 20.5 was
// rendered as 21. Silently, nothing marked the number as rounded.
//
// This is the fifth decimals defect in this codebase (pool-monitor-card #31,
// #40, #56, #68), which is why it gets a test rather than a one-line patch.
describe('decimals follow whatever supplies the number', () => {
  const climate = (attrs, cfg) => {
    const card = new SensorMonitorCard();
    card.hass = {
      states: {
        'climate.living': { state: 'heat', attributes: attrs, last_updated: '2026-08-16T10:00:00Z' },
      },
      entities: {},
    };
    card.setConfig({ sensors: { target: { entity: 'climate.living', name: 'Target', ...cfg } } });
    return card.processData().target_1;
  };

  it('keeps the decimal of an attribute on an entity whose state is a word', () => {
    expect(climate({ temperature: 20.5 }, { attribute: 'temperature' }).value).toBe(20.5);
  });

  it('does not invent decimals the attribute does not have', () => {
    expect(climate({ temperature: 21 }, { attribute: 'temperature' }).value).toBe(21);
  });

  it('counts them per attribute, not once per entity', () => {
    const attrs = { temperature: 20.5, humidity: 41 };
    expect(climate(attrs, { attribute: 'temperature' }).value).toBe(20.5);
    expect(climate(attrs, { attribute: 'humidity' }).value).toBe(41);
  });

  it('still lets an explicit display_precision win', () => {
    expect(climate({ temperature: 20.567, display_precision: 1 }, { attribute: 'temperature' }).value).toBe(20.6);
  });

  it('leaves a plain state sensor alone', () => {
    const card = new SensorMonitorCard();
    card.hass = {
      states: { 'sensor.t': { state: '20.5', attributes: {}, last_updated: '2026-08-16T10:00:00Z' } },
      entities: {},
    };
    card.setConfig({ sensors: { t: { entity: 'sensor.t', name: 'T' } } });
    expect(card.processData().t_1.value).toBe(20.5);
  });
});
