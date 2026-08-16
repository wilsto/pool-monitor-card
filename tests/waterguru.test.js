import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// @daveewall on pool-monitor-card#77, split by the PO into #81 and #82.
//
// A WaterGuru takes every measurement with one device, on one battery, and
// publishes one status entity per measurement. The card had the mirror image of
// what that needs: a battery per sensor, and a status for the whole card.

const build = (config, states) => {
  const card = new PoolMonitorCard();
  card.hass = { states, entities: {} };
  card.setConfig(config);
  return card;
};

const state = (value, attributes = {}) => ({
  state: String(value),
  attributes,
  last_updated: '2026-08-16T10:00:00Z',
});

const STATES = {
  'sensor.wg_ph': state(7.2),
  'sensor.wg_chlorine': state(3),
  'sensor.wg_battery': state(64),
  'sensor.wg_battery_low': state(12),
  'sensor.wg_ph_status': state('HIGH'),
  'sensor.wg_chlorine_status': state('Ok'),
  'sensor.wg_dead_status': state('unavailable'),
};

// ---------------------------------------------------------------- #81

describe('one battery for the whole device', () => {
  it('is read from the card, not repeated on every sensor', () => {
    const card = build(
      {
        battery_entity: 'sensor.wg_battery',
        sensors: {
          ph: { entity: 'sensor.wg_ph' },
          free_chlorine: { entity: 'sensor.wg_chlorine' },
        },
      },
      STATES,
    );
    expect(card.resolveBattery('sensor.wg_battery')?.level).toBe(64);
  });

  it('shows the same low and medium thresholds as the per sensor battery', () => {
    const card = build({ sensors: { ph: { entity: 'sensor.wg_ph' } } }, STATES);
    expect(card.resolveBattery('sensor.wg_battery').icon).toBe('mdi:battery');
    expect(card.resolveBattery('sensor.wg_battery_low').icon).toBe('mdi:battery-20');
  });

  it('says it does not know rather than inventing a level', () => {
    const card = build({ sensors: { ph: { entity: 'sensor.wg_ph' } } }, STATES);
    expect(card.resolveBattery('sensor.nothing_here').level).toBeNull();
    expect(card.resolveBattery('sensor.nothing_here').icon).toBe('mdi:battery-unknown');
  });

  it('returns nothing at all when the card does not ask for one', () => {
    const card = build({ sensors: { ph: { entity: 'sensor.wg_ph' } } }, STATES);
    expect(card.resolveCardBattery()).toBeNull();
  });

  it('leaves the per sensor battery working, so nobody has to migrate', () => {
    const card = build(
      { sensors: { ph: { entity: 'sensor.wg_ph', battery_entity: 'sensor.wg_battery' } } },
      STATES,
    );
    expect(card.processData().ph_1.battery_level).toBe(64);
  });
});

// ---------------------------------------------------------------- #82

describe('one status per measurement', () => {
  it('reads a status entity given on the sensor', () => {
    const card = build(
      { sensors: { ph: { entity: 'sensor.wg_ph', status_entity: 'sensor.wg_ph_status' } } },
      STATES,
    );
    expect(card.processData().ph_1.status).toBeTruthy();
    expect(card.processData().ph_1.status.label).toBe('HIGH');
  });

  it('maps the WaterGuru words the same way the card level status does', () => {
    const card = build(
      {
        sensors: {
          ph: { entity: 'sensor.wg_ph', status_entity: 'sensor.wg_ph_status' },
          free_chlorine: {
            entity: 'sensor.wg_chlorine',
            status_entity: 'sensor.wg_chlorine_status',
          },
        },
      },
      STATES,
    );
    const data = card.processData();
    // HIGH is a problem, Ok is not, and both come from the shared mapping
    expect(data.ph_1.status.color).not.toBe(data.free_chlorine_1.status.color);
    expect(data.free_chlorine_1.status.color).toBe(card.getConfig().colors.normal);
  });

  it('shows nothing when the status entity is unavailable', () => {
    const card = build(
      { sensors: { ph: { entity: 'sensor.wg_ph', status_entity: 'sensor.wg_dead_status' } } },
      STATES,
    );
    expect(card.processData().ph_1.status).toBeNull();
  });

  it('shows nothing when no status entity is given', () => {
    const card = build({ sensors: { ph: { entity: 'sensor.wg_ph' } } }, STATES);
    expect(card.processData().ph_1.status).toBeNull();
  });

  it('leaves the card level status working alongside it', () => {
    const card = build(
      {
        status_entity: 'sensor.wg_chlorine_status',
        sensors: { ph: { entity: 'sensor.wg_ph', status_entity: 'sensor.wg_ph_status' } },
      },
      STATES,
    );
    expect(card.resolveStatus().label).toBe('Ok');
    expect(card.processData().ph_1.status.label).toBe('HIGH');
  });
});

// Both layouts, because the card renders its rows twice and the last three
// fixes each had to be applied in two places. One of them nearly was not.
describe('both layouts show what the device says', () => {
  const paint = compact => {
    const card = new PoolMonitorCard();
    card.hass = { states: STATES, entities: {} };
    card.setConfig({
      battery_entity: 'sensor.wg_battery',
      status_entity: 'sensor.wg_chlorine_status',
      display: { compact },
      sensors: { ph: { entity: 'sensor.wg_ph', status_entity: 'sensor.wg_ph_status' } },
    });
    const host = document.createElement('div');
    render(card.render(), host);
    return host.textContent.replace(/\s+/g, ' ');
  };

  it('the per sensor status appears in the normal layout', () => {
    expect(paint(false)).toContain('HIGH');
  });

  it('and in the compact one', () => {
    expect(paint(true)).toContain('HIGH');
  });

  it('the card battery is shown once, in the header', () => {
    const painted = paint(false);
    expect(painted).toContain('64%');
    expect(painted.match(/64%/g)).toHaveLength(1);
  });
});
