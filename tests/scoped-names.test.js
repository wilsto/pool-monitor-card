import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

// `pressure` exists on two cards and means two different things: the filter on
// a pool, the weather on an air monitor. The names table is one flat list
// shared by the four cards, so whoever wrote their entry first named it for
// everyone. An air card labelled its barometer "Filter Pressure".
//
// Forty-two of the forty-three presets are right to share a name, so sharing
// stays the rule. A card can now put its own name over the common one, and the
// key a user writes in YAML is untouched: only the label changes.

const states = { 'sensor.baro': { state: '1015', attributes: {}, last_updated: '2026-08-16T10:00:00Z' } };

const build = (Card, config) => {
  const card = new Card();
  card.hass = { states, entities: {} };
  card.setConfig(config);
  return card;
};

const air = (extra = {}, language = 'en') =>
  build(AirQualityCard, { display: { language }, sensors: { pressure: { entity: 'sensor.baro', ...extra } } });

const pool = (language = 'en') =>
  build(PoolMonitorCard, { display: { language }, sensors: { pressure: { entity: 'sensor.baro' } } });

describe('a configuration written before this change keeps working', () => {
  it('still finds its preset from the key the user wrote', () => {
    expect(air().getConfig().sensors.pressure[0].invalid).toBe(false);
  });

  it('keeps the unit and the ideal value that belong to that card', () => {
    const data = air().processData().pressure_1;
    expect(data.unit).toBe('hPa');
    expect(data.setpoint).toBe(1013);
  });

  it('and the pool card keeps its own, which are different', () => {
    const data = pool().processData().pressure_1;
    expect(data.unit).toBe('psi');
    expect(data.setpoint).not.toBe(1013);
  });
});

describe('each card names the measurement the way it means it', () => {
  it('the air card says atmospheric', () => {
    expect(air().processData().pressure_1.title).toBe('Atmospheric Pressure');
  });

  it('the pool card still says filter', () => {
    expect(pool().processData().pressure_1.title).toBe('Filter Pressure');
  });

  it('in French too', () => {
    expect(air({}, 'fr').processData().pressure_1.title).toBe('Pression atmosphérique');
    expect(pool('fr').processData().pressure_1.title).toBe('Pression du filtre');
  });

  it('and it is what the card paints', () => {
    const host = document.createElement('div');
    render(air().render(), host);
    expect(host.textContent).toContain('Atmospheric Pressure');
    expect(host.textContent).not.toContain('Filter Pressure');
  });
});

describe('nothing else moves', () => {
  it('a preset with no name of its own reads the common one', () => {
    const card = build(AirQualityCard, { sensors: { temperature: { entity: 'sensor.baro' } } });
    expect(card.processData().temperature_1.title).toBe('Temperature');
  });

  it('a name the user wrote still wins over both', () => {
    expect(air({ name: 'Baromètre' }).processData().pressure_1.title).toBe('Baromètre');
  });
});
