import { describe, it, expect } from 'vitest';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { presetInUnit } from '../src/temperature-unit.js';

/**
 * A Celsius preset against a sensor in Fahrenheit (air-quality-card#7).
 *
 * Reported on 2026-10-03: a room at 75 °F read "Too Hot" on the air card,
 * because the reading was compared with a setpoint of 21 and a step of 1, both
 * Celsius. Setting `setpoint: 72` did not cure it, the step stayed 1 °C wide.
 */

function row(Card, sensor, state, entityUnit, sensorConfig = {}) {
  const card = new Card();
  card.hass = {
    states: {
      'sensor.t': {
        entity_id: 'sensor.t',
        state: String(state),
        attributes: entityUnit ? { unit_of_measurement: entityUnit } : {},
        last_updated: '2026-10-17T10:00:00Z',
      },
    },
    entities: {},
  };
  card.setConfig({ sensors: { [sensor]: { entity: 'sensor.t', ...sensorConfig } } });
  return card.processData()[`${sensor}_1`];
}

describe('a Celsius preset read against a Fahrenheit sensor', () => {
  it('calls a comfortable room in °F what it calls the same room in °C', () => {
    const f = row(AirQualityCard, 'temperature', 70, '°F');
    const c = row(AirQualityCard, 'temperature', 21, '°C');
    expect(f.setpoint).toBe(70);
    expect(f.unit).toBe('°F');
    expect(f.state).toBe(c.state);
    expect(f.color).toBe(c.color);
  });

  it('is the reported case: a user setpoint of 72 with the preset step', () => {
    // The step was 1 °C wide, so the five bands closed within 4 °F of each
    // other, 70 to 74. Converted, they are 1.8 °F apart, as wide as the
    // Celsius card draws them.
    const f = row(AirQualityCard, 'temperature', 75, '°F', { setpoint: 72 });
    expect(f.setpoint_class.map(Number)).toEqual([68.4, 70.2, 72, 73.8, 75.6]);
    const before = row(AirQualityCard, 'temperature', 75, undefined, { setpoint: 72 });
    expect(before.setpoint_class.map(Number)).toEqual([70, 71, 72, 73, 74]);
  });

  it('applies to every card with a temperature preset, not the air card alone', () => {
    const f = row(PoolMonitorCard, 'temperature', 81, '°F');
    expect(f.setpoint).toBe(81);
    expect(f.state).toBe(row(PoolMonitorCard, 'temperature', 27, '°C').state);
  });

  it('takes the unit the user wrote when the entity carries none', () => {
    expect(row(AirQualityCard, 'temperature', 70, undefined, { unit: '°F' }).setpoint).toBe(70);
  });

  it('believes the entity over the label the user wrote', () => {
    // A sensor that says °C sends Celsius numbers whatever the card prints.
    expect(row(AirQualityCard, 'temperature', 21, '°C', { unit: '°F' }).setpoint).toBe(21);
  });

  it('leaves a Celsius sensor exactly as it was', () => {
    expect(row(AirQualityCard, 'temperature', 21, '°C').setpoint).toBe(21);
    expect(row(AirQualityCard, 'temperature', 21, undefined).setpoint).toBe(21);
  });
});

describe('the conversion itself', () => {
  it('moves points by the formula and widths by the ratio', () => {
    const out = presetInUnit(
      { unit: '°C', setpoint: 21, step: 1, step_low: 2, min_limit: 15, limits: [0, 10, 20, 30] },
      '°F',
      undefined,
    );
    expect(out).toMatchObject({
      unit: '°F',
      setpoint: 70,
      step: 1.8,
      step_low: 3.6,
      min_limit: 59,
      limits: [32, 50, 68, 86],
    });
  });

  it('touches nothing that is not a Celsius preset', () => {
    const ppm = { unit: 'ppm', setpoint: 3, step: 0.5 };
    expect(presetInUnit(ppm, '°F', undefined)).toBe(ppm);
  });
});
