import { describe, it, expect } from 'vitest';
import '../../pool-monitor/src/pool-monitor-card.js';
import '../../aquarium-monitor/src/aquarium-monitor-card.js';
import '../../air-quality/src/air-quality-card.js';
import { buildEntitySuggestion } from '../src/entity-suggestion.js';
import { POOL_SENSORS } from '../../pool-monitor/src/sensors.js';

// Home Assistant 2026.6 lets a custom card offer itself when the user picks an
// entity. The documented rule is "only suggest your card when it makes sense",
// and the failure mode is a picker full of cards that cannot render the reading.
//
// So these tests care as much about what is NOT suggested as about what is.

const cards = () =>
  Object.fromEntries((globalThis.window?.customCards ?? []).map(c => [c.type, c]));

const suggest = (cardType, entityId, attributes = {}) => {
  const card = cards()[cardType];
  const hass = { states: { [entityId]: { state: '1', attributes } } };
  return card.getEntitySuggestion(hass, entityId);
};

describe('the three domain cards register a suggestion function', () => {
  it('all three opt in', () => {
    for (const t of ['pool-monitor-card', 'aquarium-monitor-card', 'air-quality-card']) {
      expect(typeof cards()[t]?.getEntitySuggestion, t).toBe('function');
    }
  });
});

describe('what Home Assistant already knows wins', () => {
  it('a carbon monoxide sensor suggests the air quality card on its co preset', () => {
    const s = suggest('air-quality-card', 'sensor.hallway', { device_class: 'carbon_monoxide' });
    expect(s.config.type).toBe('custom:air-quality-card');
    expect(s.config.sensors).toEqual({ co: { entity: 'sensor.hallway' } });
  });

  it('a pH probe is offered by both the pool and the aquarium card', () => {
    const attrs = { device_class: 'ph' };
    expect(suggest('pool-monitor-card', 'sensor.probe', attrs).config.sensors).toEqual({
      ph: { entity: 'sensor.probe' },
    });
    expect(suggest('aquarium-monitor-card', 'sensor.probe', attrs).config.sensors).toEqual({
      ph: { entity: 'sensor.probe' },
    });
  });

  it('a device class the card has no preset for suggests nothing', () => {
    // air-quality has no ozone preset, so it must not claim an ozone sensor
    expect(suggest('air-quality-card', 'sensor.outside', { device_class: 'ozone' })).toBeNull();
  });

  // The card registry has the last word, so a mapping typo cannot produce a
  // config the card is unable to render. Exercised directly: every mapping we
  // ship today points at a preset that exists, which would leave this guard
  // untested and free to rot.
  it('a mapping that points at a preset the card does not have is ignored', () => {
    const broken = buildEntitySuggestion(
      'pool-monitor-card',
      POOL_SENSORS,
      { temperature: 'temperatuer' },
      [],
    );
    const hass = { states: { 'sensor.x': { state: '1', attributes: { device_class: 'temperature' } } } };
    expect(broken(hass, 'sensor.x')).toBeNull();
  });

  it('and a mapping that points at a real preset still works', () => {
    const ok = buildEntitySuggestion('pool-monitor-card', POOL_SENSORS, { temperature: 'temperature' }, []);
    const hass = { states: { 'sensor.x': { state: '1', attributes: { device_class: 'temperature' } } } };
    expect(ok(hass, 'sensor.x').config.sensors).toEqual({ temperature: { entity: 'sensor.x' } });
  });
});

describe('the measurements Home Assistant has no device class for', () => {
  it('reads the preset out of the entity id', () => {
    expect(suggest('pool-monitor-card', 'sensor.pool_orp').config.sensors).toEqual({
      orp: { entity: 'sensor.pool_orp' },
    });
    expect(suggest('aquarium-monitor-card', 'sensor.tank_ammonia').config.sensors).toEqual({
      ammonia: { entity: 'sensor.tank_ammonia' },
    });
  });

  it('matches a multi word preset', () => {
    expect(suggest('pool-monitor-card', 'sensor.pool_free_chlorine').config.sensors).toEqual({
      free_chlorine: { entity: 'sensor.pool_free_chlorine' },
    });
  });

  // These two entity ids contain a preset key as a substring but not as a word:
  // "corporate" hides "orp", "cyanide" hides "cya". A plain `includes` would
  // claim an office energy meter as a pool redox probe.
  it('matches on whole words, so a corporate meter is not a redox probe', () => {
    expect(suggest('pool-monitor-card', 'sensor.corporate_power')).toBeNull();
    expect(suggest('pool-monitor-card', 'sensor.cyanide_detector')).toBeNull();
    // and the real thing still matches
    expect(suggest('pool-monitor-card', 'sensor.pool_cya').config.sensors).toEqual({
      cya: { entity: 'sensor.pool_cya' },
    });
  });

  // Found on the bench, not here: the unit test below supplied a device_class,
  // so it never exercised the path a real sensor takes. The bench's CO sensor
  // has no device class at all, which is the normal case for a reading fed in
  // through a bridge or a template, and is exactly @renevelasco123's setup on
  // air-quality-card#5. The card offered nothing.
  it('matches a carbon monoxide sensor that carries no device class', () => {
    expect(suggest('air-quality-card', 'sensor.indoor_co').config.sensors).toEqual({
      co: { entity: 'sensor.indoor_co' },
    });
  });

  it('does not confuse co2 with co', () => {
    const s = suggest('air-quality-card', 'sensor.living_room_co2');
    expect(s.config.sensors).toEqual({ co2: { entity: 'sensor.living_room_co2' } });
  });
});

describe('what no card claims', () => {
  it('a plain temperature belongs to all four cards, so none offers itself', () => {
    const attrs = { device_class: 'temperature' };
    for (const t of ['pool-monitor-card', 'aquarium-monitor-card', 'air-quality-card']) {
      expect(suggest(t, 'sensor.bedroom', attrs), t).toBeNull();
    }
  });

  it('a plain humidity reading likewise', () => {
    const attrs = { device_class: 'humidity' };
    for (const t of ['pool-monitor-card', 'aquarium-monitor-card', 'air-quality-card']) {
      expect(suggest(t, 'sensor.bedroom', attrs), t).toBeNull();
    }
  });

  it('anything that is not a sensor or a number', () => {
    expect(suggest('pool-monitor-card', 'light.pool_orp')).toBeNull();
    expect(suggest('pool-monitor-card', 'binary_sensor.pool_orp')).toBeNull();
    expect(suggest('air-quality-card', 'switch.co2_valve')).toBeNull();
  });

  it('an unknown entity, and a malformed argument', () => {
    const card = cards()['pool-monitor-card'];
    expect(card.getEntitySuggestion({ states: {} }, 'sensor.pool_orp').config.sensors).toEqual({
      orp: { entity: 'sensor.pool_orp' },
    });
    expect(card.getEntitySuggestion(undefined, 'sensor.nothing_here')).toBeNull();
    expect(card.getEntitySuggestion({}, null)).toBeNull();
  });
});

describe('the suggested config is one the card can actually load', () => {
  it('round trips through setConfig without throwing', async () => {
    const { PoolMonitorCard } = await import('../../pool-monitor/src/pool-monitor-card.js');
    const s = suggest('pool-monitor-card', 'sensor.pool_orp');
    const card = new PoolMonitorCard();
    expect(() => card.setConfig({ ...s.config, type: undefined })).not.toThrow();
  });
});
