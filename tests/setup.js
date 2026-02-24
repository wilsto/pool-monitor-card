/**
 * @fileoverview Test setup for pool-monitor-card tests
 * Provides mock hass states, sensor configs, and a helper to create card instances.
 */

// Mock BUILD_TIMESTAMP before any card import
globalThis.__BUILD_TIMESTAMP__ = 'test';

// Wrap customElements.define to silently ignore duplicate registrations
const originalDefine = globalThis.customElements.define.bind(globalThis.customElements);
globalThis.customElements.define = (name, constructor, options) => {
  if (globalThis.customElements.get(name)) return;
  originalDefine(name, constructor, options);
};

// Mock sensor states for tests
export const mockSensorStates = {
  'sensor.pool_temperature': {
    state: '26.5',
    attributes: { unit_of_measurement: '°C', friendly_name: 'Pool Temperature' },
    last_updated: new Date().toISOString(),
  },
  'sensor.pool_temp_min': {
    state: '25.0',
    attributes: { unit_of_measurement: '°C' },
  },
  'sensor.pool_temp_max': {
    state: '28.0',
    attributes: { unit_of_measurement: '°C' },
  },
  'sensor.pool_ph': {
    state: '7.3',
    attributes: { unit_of_measurement: 'pH', friendly_name: 'Pool pH' },
    last_updated: new Date().toISOString(),
  },
  'sensor.pool_ph_min': {
    state: '7.1',
    attributes: { unit_of_measurement: 'pH' },
  },
  'sensor.pool_ph_max': {
    state: '7.4',
    attributes: { unit_of_measurement: 'pH' },
  },
  'sensor.pool_orp': {
    state: '750',
    attributes: { unit_of_measurement: 'mV', friendly_name: 'Pool ORP' },
    last_updated: new Date().toISOString(),
  },
  'sensor.ondilo_battery': {
    state: '85',
    attributes: { unit_of_measurement: '%', friendly_name: 'Ondilo Battery' },
  },
  'sensor.flipr_battery': {
    state: '15',
    attributes: { unit_of_measurement: '%', friendly_name: 'Flipr Battery' },
  },
  'sensor.battery_half': {
    state: '35',
    attributes: { unit_of_measurement: '%' },
  },
  'sensor.battery_unavailable': {
    state: 'unavailable',
    attributes: {},
  },
};

// Mock hass object
export const mockHass = {
  states: mockSensorStates,
};

// Valid card configuration for tests
export const validConfig = {
  sensors: {
    temperature: { entity: 'sensor.pool_temperature' },
  },
};

export const multiSensorConfig = {
  sensors: {
    temperature: {
      entity: 'sensor.pool_temperature',
      min: 'sensor.pool_temp_min',
      max: 'sensor.pool_temp_max',
    },
    ph: {
      entity: 'sensor.pool_ph',
      min: 'sensor.pool_ph_min',
      max: 'sensor.pool_ph_max',
    },
    orp: {
      entity: 'sensor.pool_orp',
    },
  },
};

export const arraySensorConfig = {
  sensors: {
    temperature: [
      { entity: 'sensor.pool_temperature', name: 'Pool Temp 1' },
      { entity: 'sensor.pool_temperature', name: 'Pool Temp 2' },
    ],
  },
};
