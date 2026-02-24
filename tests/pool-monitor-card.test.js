import { describe, test, expect, beforeEach, vi } from 'vitest';
import {
  mockHass,
  mockSensorStates,
  validConfig,
  multiSensorConfig,
  arraySensorConfig,
} from './setup.js';
import { PoolMonitorCard } from '../src/pool-monitor-card.js';
import { POOL_SENSORS } from '../src/sensors.js';

describe('PoolMonitorCard', () => {
  let card;

  beforeEach(() => {
    card = new PoolMonitorCard();
  });

  // -------------------------------------------------------------------
  // Static properties
  // -------------------------------------------------------------------
  describe('static properties', () => {
    test('should have CARD_INFO with required fields', () => {
      expect(PoolMonitorCard.CARD_INFO).toBeDefined();
      expect(PoolMonitorCard.CARD_INFO.cardType).toBe('pool-monitor-card');
      expect(PoolMonitorCard.CARD_INFO.cardName).toBe('Pool Monitor Card');
      expect(typeof PoolMonitorCard.CARD_INFO.cardDescription).toBe('string');
    });

    test('should have SENSORS equal to POOL_SENSORS', () => {
      expect(PoolMonitorCard.SENSORS).toBe(POOL_SENSORS);
    });

    test('should have IMAGE_BASE_URL', () => {
      expect(PoolMonitorCard.IMAGE_BASE_URL).toContain('pool-monitor-card');
    });
  });

  // -------------------------------------------------------------------
  // setConfig
  // -------------------------------------------------------------------
  describe('setConfig', () => {
    test('should accept valid configuration', () => {
      expect(() => card.setConfig(validConfig)).not.toThrow();
    });

    test('should throw if sensors key is missing', () => {
      expect(() => card.setConfig({})).toThrow('sensors');
    });

    test('should throw if sensor entity is missing', () => {
      expect(() => card.setConfig({ sensors: { temperature: {} } })).toThrow('entity');
    });

    test('should throw on empty sensor array', () => {
      expect(() => card.setConfig({ sensors: { temperature: [] } })).toThrow('Empty sensor array');
    });

    test('should merge display defaults', () => {
      card.setConfig(validConfig);
      const cfg = card.getConfig();
      expect(cfg.display.show_names).toBe(true);
      expect(cfg.display.gradient).toBe(true);
      expect(cfg.display.language).toBe('en');
    });

    test('should override display defaults with user values', () => {
      card.setConfig({ ...validConfig, display: { compact: true, language: 'fr' } });
      const cfg = card.getConfig();
      expect(cfg.display.compact).toBe(true);
      expect(cfg.display.language).toBe('fr');
      // other defaults remain
      expect(cfg.display.show_names).toBe(true);
    });

    test('should merge color defaults', () => {
      card.setConfig(validConfig);
      const cfg = card.getConfig();
      expect(cfg.colors.normal).toBe('#00b894');
    });

    test('should override color defaults with user values', () => {
      card.setConfig({ ...validConfig, colors: { normal: '#ff0000' } });
      const cfg = card.getConfig();
      expect(cfg.colors.normal).toBe('#ff0000');
      expect(cfg.colors.warn).toBe('#e17055'); // default preserved
    });

    test('should merge sensor defaults from POOL_SENSORS', () => {
      card.setConfig(validConfig);
      const cfg = card.getConfig();
      const tempSensor = cfg.sensors.temperature[0];
      expect(tempSensor.unit).toBe('°C');
      expect(tempSensor.setpoint).toBe(27);
      expect(tempSensor.step).toBe(1);
      expect(tempSensor.mode).toBe('heatflow');
    });

    test('should let user override sensor defaults', () => {
      card.setConfig({
        sensors: { temperature: { entity: 'sensor.pool_temperature', setpoint: 30, unit: '°F' } },
      });
      const cfg = card.getConfig();
      const tempSensor = cfg.sensors.temperature[0];
      expect(tempSensor.setpoint).toBe(30);
      expect(tempSensor.unit).toBe('°F');
    });

    test('should handle array sensor configs', () => {
      card.setConfig(arraySensorConfig);
      const cfg = card.getConfig();
      expect(cfg.sensors.temperature).toHaveLength(2);
      expect(cfg.sensors.temperature[0].entity).toBe('sensor.pool_temperature');
      expect(cfg.sensors.temperature[1].entity).toBe('sensor.pool_temperature');
    });

    test('should set nameDefinedByUser when name is provided', () => {
      card.setConfig({
        sensors: { temperature: { entity: 'sensor.pool_temperature', name: 'Custom Name' } },
      });
      const cfg = card.getConfig();
      expect(cfg.sensors.temperature[0].nameDefinedByUser).toBe(true);
      expect(cfg.sensors.temperature[0].title).toBe('Custom Name');
    });

    test('should mark unsupported sensor types as invalid', () => {
      card.setConfig({
        sensors: { fake_sensor: { entity: 'sensor.fake' } },
      });
      const cfg = card.getConfig();
      expect(cfg.sensors.fake_sensor[0].invalid).toBe(true);
    });

    test('should mark supported sensor types as valid', () => {
      card.setConfig(validConfig);
      const cfg = card.getConfig();
      expect(cfg.sensors.temperature[0].invalid).toBe(false);
    });

    test('should preserve title from config', () => {
      card.setConfig({ ...validConfig, title: 'My Pool' });
      const cfg = card.getConfig();
      expect(cfg.title).toBe('My Pool');
    });
  });

  // -------------------------------------------------------------------
  // calculateData
  // -------------------------------------------------------------------
  describe('calculateData', () => {
    beforeEach(() => {
      card.setConfig(multiSensorConfig);
      card.hass = mockHass;
    });

    test('should calculate temperature data correctly', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        'sensor.pool_temp_min',
        'sensor.pool_temp_max',
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.value).toBe(26.5);
      expect(data.entity).toBe('sensor.pool_temperature');
      expect(data.unit).toBe('°C');
      expect(data.mode).toBe('heatflow');
      expect(data.name).toBe('temperature');
    });

    test('should return null value and not_found for missing entity', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.nonexistent',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.value).toBeNull();
      expect(data.entity).toBe('sensor.nonexistent');
      expect(data.not_found).toBe(true);
    });

    test('should handle non-numeric entity state (unavailable) without not_found', () => {
      const hass = {
        states: {
          'sensor.bad': {
            state: 'unavailable',
            attributes: {},
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.bad',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.value).toBeNull();
      expect(data.not_found).toBeUndefined();
      expect(data.color).toBe('var(--disabled-text-color, #bdbdbd)');
      expect(data.state).toBe('');
      expect(data.pct).toBe('50');
    });

    test('should handle "unknown" entity state without not_found', () => {
      const hass = {
        states: {
          'sensor.unknown': {
            state: 'unknown',
            attributes: {},
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.unknown',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.value).toBeNull();
      expect(data.not_found).toBeUndefined();
      expect(data.color).toBe('var(--disabled-text-color, #bdbdbd)');
      expect(data.state).toBe('');
      expect(data.pct).toBe('50');
    });

    test('should use default setpoint from POOL_SENSORS when not provided', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        undefined,
        undefined,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.setpoint).toBe(27); // from POOL_SENSORS
    });

    test('should use user-provided setpoint over default', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        30,
        2,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.setpoint).toBe(30);
    });

    test('should compute 5 setpoint_class values', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
      );
      expect(data.setpoint_class).toHaveLength(5);
    });

    test('should handle min_limit clamping', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
      );
      // All setpoint_class values should be >= min_limit (0)
      data.setpoint_class.forEach(v => {
        expect(parseFloat(v)).toBeGreaterThanOrEqual(0);
      });
    });

    test('should read min/max entity values', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        'sensor.pool_temp_min',
        'sensor.pool_temp_max',
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.min_value).toBe(25.0);
      expect(data.max_value).toBe(28.0);
    });

    test('should fall back to value when min/max entities are missing', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.min_value).toBe(data.value);
      expect(data.max_value).toBe(data.value);
    });

    // --- Icon handling ---
    test('should use MDI icon when provided', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        'mdi:thermometer',
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.is_mdi).toBe(true);
      expect(data.mdi_icon).toBe('mdi:thermometer');
    });

    test('should use image_url when provided', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        'http://example.com/icon.png',
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.img_src).toBe('http://example.com/icon.png');
    });

    test('should hide icon when icon is "hide"', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        'hide',
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.hide_icon).toBe(true);
    });

    test('should use IMAGE_BASE_URL when no icon or image_url is provided', () => {
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.img_src).toContain('temperature.png');
      expect(data.img_src).toContain('pool-monitor-card');
    });

    test('should hide icon when show_icons is false', () => {
      card.setConfig({ ...validConfig, display: { show_icons: false } });
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.hide_icon).toBe(true);
    });

    // --- last_updated ---
    test('should compute last_updated when show_last_updated is true', () => {
      card.setConfig({ ...multiSensorConfig, display: { show_last_updated: true } });
      card.hass = mockHass;
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.last_updated).toBeDefined();
      expect(typeof data.last_updated).toBe('string');
    });

    // --- Unit display ---
    test('should hide unit when show_units is false', () => {
      card.setConfig({ ...validConfig, display: { show_units: false } });
      const data = card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
      expect(data.unit).toBe('');
    });
  });

  // -------------------------------------------------------------------
  // availability_entity (disabled flag)
  // -------------------------------------------------------------------
  describe('availability_entity', () => {
    beforeEach(() => {
      card.hass = {
        states: {
          'sensor.pool_temperature': {
            state: '27',
            attributes: {},
            last_updated: new Date().toISOString(),
          },
          'binary_sensor.heat_pump_on': { state: 'on', attributes: {} },
          'binary_sensor.heat_pump_off': { state: 'off', attributes: {} },
        },
      };
    });

    test('processData should set disabled=true when availability_entity is off', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            availability_entity: 'binary_sensor.heat_pump_off',
          },
        },
      });
      card.hass = card.hass;
      const data = card.processData();
      expect(data['temperature_1'].disabled).toBe(true);
    });

    test('processData should set disabled=false when availability_entity is on', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            availability_entity: 'binary_sensor.heat_pump_on',
          },
        },
      });
      const data = card.processData();
      expect(data['temperature_1'].disabled).toBe(false);
    });

    test('processData should not set disabled when availability_entity is absent', () => {
      card.setConfig({
        sensors: {
          temperature: { entity: 'sensor.pool_temperature' },
        },
      });
      const data = card.processData();
      expect(data['temperature_1'].disabled).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------
  // State/color calculation (centric mode)
  // -------------------------------------------------------------------
  describe('state/color in centric mode', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: { ph: { entity: 'sensor.pool_ph' } },
        display: { show_labels: true },
      });
      card.hass = mockHass;
    });

    function calcPH(phValue) {
      const hass = {
        states: {
          'sensor.pool_ph': {
            state: String(phValue),
            attributes: { unit_of_measurement: 'pH' },
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      return card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
      );
    }

    test('should return warn color for values below sp-2*step', () => {
      const data = calcPH(6.5);
      expect(data.color).toBe('#e17055'); // warn
    });

    test('should return low color for values in [sp-2*step, sp-step)', () => {
      const data = calcPH(6.9);
      expect(data.color).toBe('#fdcb6e'); // low
    });

    test('should return normal color for values in [sp-step, sp)', () => {
      const data = calcPH(7.1);
      expect(data.color).toBe('#00b894'); // normal
    });

    test('should return normal color for values in [sp, sp+step)', () => {
      const data = calcPH(7.3);
      expect(data.color).toBe('#00b894'); // normal
    });

    test('should return low color for values in [sp+step, sp+2*step)', () => {
      const data = calcPH(7.5);
      expect(data.color).toBe('#fdcb6e'); // low
    });

    test('should return warn color for values >= sp+2*step', () => {
      const data = calcPH(7.7);
      expect(data.color).toBe('#e17055'); // warn
    });
  });

  // -------------------------------------------------------------------
  // State/color calculation (heatflow mode)
  // -------------------------------------------------------------------
  describe('state/color in heatflow mode', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: { temperature: { entity: 'sensor.pool_temperature' } },
        display: { show_labels: true },
      });
    });

    function calcTemp(tempValue) {
      const hass = {
        states: {
          'sensor.pool_temperature': {
            state: String(tempValue),
            attributes: { unit_of_measurement: '°C' },
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      return card.calculateData(
        'temperature',
        'Temperature',
        'sensor.pool_temperature',
        undefined,
        undefined,
        27,
        1,
        '°C',
        undefined,
        undefined,
        'heatflow',
        undefined,
        undefined,
        undefined,
        false,
      );
    }

    test('should return cool for values below sp-step', () => {
      const data = calcTemp(25);
      expect(data.color).toBe('#00BFFF'); // cool
    });

    test('should return normal for values in [sp-step, sp+step)', () => {
      const data = calcTemp(27);
      expect(data.color).toBe('#00b894'); // normal (ideal range)
    });

    test('should return warn for values >= sp+step', () => {
      const data = calcTemp(29);
      expect(data.color).toBe('#e17055'); // warn
    });
  });

  // -------------------------------------------------------------------
  // processData
  // -------------------------------------------------------------------
  describe('processData', () => {
    test('should process all configured sensors', () => {
      card.setConfig(multiSensorConfig);
      card.hass = mockHass;
      const data = card.processData();
      expect(Object.keys(data)).toContain('temperature_1');
      expect(Object.keys(data)).toContain('ph_1');
      expect(Object.keys(data)).toContain('orp_1');
    });

    test('should process array sensors with indexed keys', () => {
      card.setConfig(arraySensorConfig);
      card.hass = mockHass;
      const data = card.processData();
      expect(Object.keys(data)).toContain('temperature_1');
      expect(Object.keys(data)).toContain('temperature_2');
    });
  });

  // -------------------------------------------------------------------
  // countDecimals
  // -------------------------------------------------------------------
  describe('countDecimals', () => {
    test('should return 0 for integers', () => {
      expect(card.countDecimals(27)).toBe(0);
    });

    test('should return correct count for decimals', () => {
      expect(card.countDecimals(7.2)).toBe(1);
      expect(card.countDecimals(7.25)).toBe(2);
    });

    test('should return 0 for null/undefined', () => {
      expect(card.countDecimals(null)).toBe(0);
      expect(card.countDecimals(undefined)).toBe(0);
    });
  });

  // -------------------------------------------------------------------
  // step_low / step_high (asymmetric ranges) — #72
  // -------------------------------------------------------------------
  describe('asymmetric ranges (step_low/step_high)', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: { ph: { entity: 'sensor.pool_ph' } },
        display: { show_labels: true },
      });
    });

    function calcWithAsymmetricStep(phValue, step_low, step_high) {
      const hass = {
        states: {
          'sensor.pool_ph': {
            state: String(phValue),
            attributes: { unit_of_measurement: 'pH' },
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      return card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        3,
        undefined,
        'ppm',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        step_low,
        step_high,
      );
    }

    test('should compute asymmetric setpoint_class with step_low=1.4, step_high=2.4', () => {
      // FC ideal=3, step_low=1.4, step_high=2.4
      // Expected breakpoints: 3-2*1.4=0.2, 3-1.4=1.6, 3, 3+2.4=5.4, 3+2*2.4=7.8
      const data = calcWithAsymmetricStep(3, 1.4, 2.4);
      expect(data.setpoint_class).toHaveLength(5);
      expect(parseFloat(data.setpoint_class[0])).toBeCloseTo(0.2, 1); // sp - 2*step_low
      expect(parseFloat(data.setpoint_class[1])).toBeCloseTo(1.6, 1); // sp - 1*step_low
      expect(parseFloat(data.setpoint_class[2])).toBeCloseTo(3.0, 1); // sp
      expect(parseFloat(data.setpoint_class[3])).toBeCloseTo(5.4, 1); // sp + 1*step_high
      expect(parseFloat(data.setpoint_class[4])).toBeCloseTo(7.8, 1); // sp + 2*step_high
    });

    test('should classify value in asymmetric "Ideal" range correctly', () => {
      // Value 4.0 is between sp-step_low (1.6) and sp+step_high (5.4) → should be "Ideal"
      const data = calcWithAsymmetricStep(4.0, 1.4, 2.4);
      expect(data.color).toBe('#00b894'); // normal/ideal
    });

    test('should classify value below asymmetric low range as "Acceptable Low"', () => {
      // Value 1.0 is between sp-2*step_low (0.2) and sp-step_low (1.6) → "Acceptable Low"
      const data = calcWithAsymmetricStep(1.0, 1.4, 2.4);
      expect(data.color).toBe('#fdcb6e'); // low
    });

    test('should classify value above asymmetric high range as "Acceptable High"', () => {
      // Value 6.0 is between sp+step_high (5.4) and sp+2*step_high (7.8) → "Acceptable High"
      const data = calcWithAsymmetricStep(6.0, 1.4, 2.4);
      expect(data.color).toBe('#fdcb6e'); // low
    });

    test('should classify value way above as "Too High"', () => {
      // Value 8.0 >= sp+2*step_high (7.8) → "Too High"
      const data = calcWithAsymmetricStep(8.0, 1.4, 2.4);
      expect(data.color).toBe('#e17055'); // warn
    });

    test('should fall back to symmetric step when step_low/step_high not provided', () => {
      const hass = {
        states: {
          'sensor.pool_ph': {
            state: '7.3',
            attributes: {},
            last_updated: new Date().toISOString(),
          },
        },
      };
      card.hass = hass;
      // No step_low/step_high → symmetric with step=0.2
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
      );
      // Symmetric: 6.8, 7.0, 7.2, 7.4, 7.6
      expect(parseFloat(data.setpoint_class[0])).toBeCloseTo(6.8, 1);
      expect(parseFloat(data.setpoint_class[4])).toBeCloseTo(7.6, 1);
    });

    test('setConfig should pass step_low/step_high from user config to sensor', () => {
      card.setConfig({
        sensors: {
          free_chlorine: {
            entity: 'sensor.pool_ph',
            setpoint: 3,
            step_low: 1.4,
            step_high: 2.4,
          },
        },
      });
      const cfg = card.getConfig();
      expect(cfg.sensors.free_chlorine[0].step_low).toBe(1.4);
      expect(cfg.sensors.free_chlorine[0].step_high).toBe(2.4);
    });
  });

  // -------------------------------------------------------------------
  // last_updated_entity / last_updated_attribute (#65)
  // -------------------------------------------------------------------
  describe('last_updated_entity / last_updated_attribute', () => {
    const measureDate = '2025-05-11T14:38:19.000Z';

    beforeEach(() => {
      card.setConfig({
        sensors: { ph: { entity: 'sensor.pool_ph' } },
        display: { show_last_updated: true },
      });
      card.hass = {
        states: {
          'sensor.pool_ph': {
            state: '7.3',
            attributes: { unit_of_measurement: 'pH' },
            last_updated: new Date().toISOString(),
          },
          'sensor.poollab_ph': {
            state: '7.1',
            attributes: { measured_at: measureDate },
            last_updated: new Date().toISOString(),
          },
        },
      };
    });

    test('should use last_updated_attribute from same entity when set', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.poollab_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        'measured_at',
      );
      // Should use the measured_at attribute date, not HA's last_updated
      expect(data.last_updated).toBeDefined();
      expect(data.last_updated).toContain('ago');
    });

    test('should use last_updated_entity to read timestamp from a different entity', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        'sensor.poollab_ph',
        'measured_at',
      );
      // Should read timestamp from sensor.poollab_ph.attributes.measured_at
      expect(data.last_updated).toBeDefined();
      expect(data.last_updated).toContain('ago');
    });

    test('should fall back to HA last_updated when params not provided', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
      );
      // Default behavior: use entityState.last_updated
      expect(data.last_updated).toBeDefined();
    });

    test('setConfig should pass last_updated_entity/attribute from user config', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            last_updated_entity: 'sensor.poollab_ph',
            last_updated_attribute: 'measured_at',
          },
        },
      });
      const cfg = card.getConfig();
      expect(cfg.sensors.ph[0].last_updated_entity).toBe('sensor.poollab_ph');
      expect(cfg.sensors.ph[0].last_updated_attribute).toBe('measured_at');
    });

    test('processData should pass last_updated params to calculateData', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            last_updated_entity: 'sensor.poollab_ph',
            last_updated_attribute: 'measured_at',
          },
        },
        display: { show_last_updated: true },
      });
      card.hass = card.hass;
      const data = card.processData();
      // Should have used the poollab_ph measured_at attribute
      expect(data['ph_1'].last_updated).toBeDefined();
    });
  });

  // -------------------------------------------------------------------
  // setpoint_entity / min_limit_entity (#59)
  // -------------------------------------------------------------------
  describe('setpoint_entity / min_limit_entity', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: { ph: { entity: 'sensor.pool_ph' } },
        display: { show_labels: true },
      });
      card.hass = {
        states: {
          'sensor.pool_ph': {
            state: '7.3',
            attributes: { unit_of_measurement: 'pH' },
            last_updated: new Date().toISOString(),
          },
          'input_number.ph_setpoint': {
            state: '7.4',
            attributes: {},
          },
          'input_number.ph_min_limit': {
            state: '7.0',
            attributes: {},
          },
        },
      };
    });

    test('should use setpoint_entity value instead of static setpoint', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        'input_number.ph_setpoint',
        undefined,
      );
      // setpoint should be 7.4 (from entity) not 7.2 (static)
      expect(data.setpoint).toBe(7.4);
      // Breakpoints should be centered on 7.4
      expect(parseFloat(data.setpoint_class[2])).toBeCloseTo(7.4, 1);
    });

    test('should use min_limit_entity value instead of static min_limit', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'input_number.ph_min_limit',
      );
      // min_limit from entity = 7.0 (not static 0)
      // Without min_limit: breakpoint[0] = 7.2 - 2*0.2 = 6.8
      // With min_limit=7.0: breakpoint[0] = max(7.0, 6.8) = 7.0
      expect(parseFloat(data.setpoint_class[0])).toBeCloseTo(7.0, 1);
      // breakpoint[1] = max(7.0, 7.2 - 0.2) = max(7.0, 7.0) = 7.0
      expect(parseFloat(data.setpoint_class[1])).toBeCloseTo(7.0, 1);
    });

    test('should use both setpoint_entity and min_limit_entity together', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        'input_number.ph_setpoint',
        'input_number.ph_min_limit',
      );
      // setpoint from entity = 7.4, min_limit from entity = 7.0
      expect(data.setpoint).toBe(7.4);
      // breakpoint[0] = max(7.0, 7.4 - 2*0.2) = max(7.0, 7.0) = 7.0
      expect(parseFloat(data.setpoint_class[0])).toBeCloseTo(7.0, 1);
    });

    test('should fall back to static values when entities are unavailable', () => {
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        5.0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        'input_number.nonexistent',
        'input_number.also_nonexistent',
      );
      // Should fall back to static setpoint=7.2 and min_limit=5.0
      expect(data.setpoint).toBe(7.2);
      expect(parseFloat(data.setpoint_class[0])).toBeGreaterThanOrEqual(5.0);
    });

    test('setConfig should pass setpoint_entity/min_limit_entity from user config', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            setpoint_entity: 'input_number.ph_setpoint',
            min_limit_entity: 'input_number.ph_min_limit',
          },
        },
      });
      const cfg = card.getConfig();
      expect(cfg.sensors.ph[0].setpoint_entity).toBe('input_number.ph_setpoint');
      expect(cfg.sensors.ph[0].min_limit_entity).toBe('input_number.ph_min_limit');
    });

    test('processData should resolve setpoint from entity at runtime', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            setpoint: 7.2,
            step: 0.2,
            setpoint_entity: 'input_number.ph_setpoint',
          },
        },
        display: { show_labels: true },
      });
      card.hass = card.hass;
      const data = card.processData();
      // setpoint should come from entity (7.4), not static config (7.2)
      expect(data['ph_1'].setpoint).toBe(7.4);
      // Breakpoints should be centered on 7.4, NOT 7.2
      expect(parseFloat(data['ph_1'].setpoint_class[2])).toBeCloseTo(7.4, 1);
      expect(parseFloat(data['ph_1'].setpoint_class[0])).toBeCloseTo(7.0, 1);
      expect(parseFloat(data['ph_1'].setpoint_class[4])).toBeCloseTo(7.8, 1);
    });

    test('processData should resolve min_limit from entity at runtime', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            setpoint: 7.2,
            step: 0.2,
            min_limit: 0,
            min_limit_entity: 'input_number.ph_min_limit',
          },
        },
        display: { show_labels: true },
      });
      card.hass = card.hass;
      const data = card.processData();
      // min_limit from entity = 7.0 (not static 0)
      // Breakpoint[0] = max(7.0, 7.2 - 2*0.2) = max(7.0, 6.8) = 7.0 (clamped!)
      expect(parseFloat(data['ph_1'].setpoint_class[0])).toBeCloseTo(7.0, 1);
      // Breakpoint[1] = max(7.0, 7.2 - 0.2) = max(7.0, 7.0) = 7.0
      expect(parseFloat(data['ph_1'].setpoint_class[1])).toBeCloseTo(7.0, 1);
    });

    test('processData should resolve both setpoint_entity and min_limit_entity', () => {
      card.setConfig({
        sensors: {
          ph: {
            entity: 'sensor.pool_ph',
            setpoint: 7.2,
            step: 0.2,
            min_limit: 0,
            setpoint_entity: 'input_number.ph_setpoint',
            min_limit_entity: 'input_number.ph_min_limit',
          },
        },
        display: { show_labels: true },
      });
      card.hass = card.hass;
      const data = card.processData();
      // setpoint from entity = 7.4, min_limit from entity = 7.0
      expect(data['ph_1'].setpoint).toBe(7.4);
      // Breakpoint[0] = max(7.0, 7.4 - 2*0.2) = max(7.0, 7.0) = 7.0
      expect(parseFloat(data['ph_1'].setpoint_class[0])).toBeCloseTo(7.0, 1);
      expect(parseFloat(data['ph_1'].setpoint_class[2])).toBeCloseTo(7.4, 1);
    });

    test('should handle entity with state "unavailable"', () => {
      card.hass = {
        states: {
          'sensor.pool_ph': {
            state: '7.3',
            attributes: { unit_of_measurement: 'pH' },
            last_updated: new Date().toISOString(),
          },
          'input_number.ph_setpoint': {
            state: 'unavailable',
            attributes: {},
          },
        },
      };
      const data = card.calculateData(
        'ph',
        'pH',
        'sensor.pool_ph',
        undefined,
        undefined,
        7.2,
        0.2,
        'pH',
        undefined,
        undefined,
        'centric',
        0,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        'input_number.ph_setpoint',
        undefined,
      );
      // "unavailable" is NaN → should fall back to static setpoint 7.2
      expect(data.setpoint).toBe(7.2);
    });
  });

  // -------------------------------------------------------------------
  // status_entity (#10) — global status badge
  // -------------------------------------------------------------------
  describe('status_entity', () => {
    test('setConfig should accept status_entity in config', () => {
      card.setConfig({
        ...validConfig,
        status_entity: 'sensor.pool_status',
      });
      const cfg = card.getConfig();
      expect(cfg.status_entity).toBe('sensor.pool_status');
    });

    test('resolveStatus should return null when no status_entity configured', () => {
      card.setConfig(validConfig);
      card.hass = mockHass;
      const status = card.resolveStatus();
      expect(status).toBeNull();
    });

    test('resolveStatus should return null when entity not found', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.nonexistent' });
      card.hass = mockHass;
      const status = card.resolveStatus();
      expect(status).toBeNull();
    });

    test('resolveStatus should map numeric 0-33 to danger (red)', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_score' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_score': { state: '20', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status).toBeDefined();
      expect(status.color).toBe('#e17055');
      expect(status.label).toBe('20');
      expect(status.icon).toBe('mdi:alert-octagon');
      expect(status.entity_id).toBe('sensor.pool_score');
    });

    test('resolveStatus should map numeric 34-66 to warning (orange)', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_score' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_score': { state: '50', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status).toBeDefined();
      expect(status.color).toBe('#fdcb6e');
      expect(status.label).toBe('50');
      expect(status.icon).toBe('mdi:alert');
    });

    test('resolveStatus should map numeric 67-100 to good (green)', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_score' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_score': { state: '85', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status).toBeDefined();
      expect(status.color).toBe('#00b894');
      expect(status.label).toBe('85');
      expect(status.icon).toBe('mdi:check-circle');
    });

    test('resolveStatus should map text "safe" to green', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'safe', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#00b894');
      expect(status.label).toBe('safe');
      expect(status.icon).toBe('mdi:check-circle');
    });

    test('resolveStatus should map text "good" to green', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'good', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#00b894');
    });

    test('resolveStatus should map text "ok" to green', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'ok', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#00b894');
    });

    test('resolveStatus should map text "warning" to orange', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'warning', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#fdcb6e');
      expect(status.label).toBe('warning');
    });

    test('resolveStatus should map text "caution" to orange', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'caution', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#fdcb6e');
    });

    test('resolveStatus should map text "danger" to red', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'danger', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#e17055');
    });

    test('resolveStatus should map text "critical" to red', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'critical', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#e17055');
    });

    test('resolveStatus should map text "bad" to red', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'bad', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('#e17055');
    });

    test('resolveStatus should use default gray for unknown text state', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'custom_state', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status.color).toBe('var(--disabled-text-color, #bdbdbd)');
      expect(status.label).toBe('custom_state');
      expect(status.icon).toBe('mdi:help-circle');
    });

    test('resolveStatus should use friendly_name as label when available', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'safe', attributes: { friendly_name: 'Pool Status' } },
        },
      };
      const status = card.resolveStatus();
      expect(status.label).toBe('safe');
      expect(status.friendly_name).toBe('Pool Status');
    });

    test('resolveStatus should handle entity with state "unavailable"', () => {
      card.setConfig({ ...validConfig, status_entity: 'sensor.pool_status' });
      card.hass = {
        states: {
          ...mockSensorStates,
          'sensor.pool_status': { state: 'unavailable', attributes: {} },
        },
      };
      const status = card.resolveStatus();
      expect(status).toBeNull();
    });
  });

  // -------------------------------------------------------------------
  // timeFromNow
  // -------------------------------------------------------------------
  describe('timeFromNow', () => {
    beforeEach(() => {
      card.setConfig(validConfig);
    });

    test('should return "just now" for recent time', () => {
      const result = card.timeFromNow(new Date().toISOString());
      expect(result).toContain('just now');
    });

    test('should return minutes ago for past minutes', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const result = card.timeFromNow(fiveMinAgo);
      expect(result).toContain('5');
      expect(result).toContain('minutes ago');
    });

    test('should return hours ago for past hours', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      const result = card.timeFromNow(twoHoursAgo);
      expect(result).toContain('2');
      expect(result).toContain('hours ago');
    });

    test('should return days ago for past days', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const result = card.timeFromNow(threeDaysAgo);
      expect(result).toContain('3');
      expect(result).toContain('days ago');
    });

    test('should use singular form for 1 minute', () => {
      const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString();
      const result = card.timeFromNow(oneMinAgo);
      expect(result).toContain('1');
      expect(result).toContain('minute ago');
      expect(result).not.toContain('minutes ago');
    });

    test('should respect language setting', () => {
      card.setConfig({ ...validConfig, display: { language: 'fr' } });
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const result = card.timeFromNow(fiveMinAgo);
      expect(result).toContain('il y a');
    });
  });

  // -------------------------------------------------------------------
  // battery_entity (#9)
  // -------------------------------------------------------------------
  describe('battery_entity', () => {
    test('should store battery_entity in config when provided', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.ondilo_battery',
          },
        },
      });
      const config = card.getConfig();
      const tempSensor = config.sensors.temperature[0];
      expect(tempSensor.battery_entity).toBe('sensor.ondilo_battery');
    });

    test('should resolve battery level from entity state', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.ondilo_battery',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBe(85);
      expect(data.temperature_1.battery_icon).toBe('mdi:battery');
    });

    test('should use mdi:battery-50 for 20-50% level', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.battery_half',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBe(35);
      expect(data.temperature_1.battery_icon).toBe('mdi:battery-50');
    });

    test('should use mdi:battery-20 for <20% level', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.flipr_battery',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBe(15);
      expect(data.temperature_1.battery_icon).toBe('mdi:battery-20');
    });

    test('should use mdi:battery-unknown for unavailable entity', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.battery_unavailable',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBeNull();
      expect(data.temperature_1.battery_icon).toBe('mdi:battery-unknown');
    });

    test('should use mdi:battery-unknown for missing entity', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.nonexistent_battery',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBeNull();
      expect(data.temperature_1.battery_icon).toBe('mdi:battery-unknown');
    });

    test('should not set battery fields when battery_entity is not configured', () => {
      card.setConfig(validConfig);
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_level).toBeUndefined();
      expect(data.temperature_1.battery_icon).toBeUndefined();
    });

    test('should resolve battery color green for >50%', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.ondilo_battery',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_color).toBe(
        'var(--state-sensor-battery-high-color, #4caf50)',
      );
    });

    test('should resolve battery color orange for 20-50%', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.battery_half',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_color).toBe(
        'var(--state-sensor-battery-medium-color, #ff9800)',
      );
    });

    test('should resolve battery color red for <20%', () => {
      card.setConfig({
        sensors: {
          temperature: {
            entity: 'sensor.pool_temperature',
            battery_entity: 'sensor.flipr_battery',
          },
        },
      });
      card.hass = mockHass;
      const data = card.processData();
      expect(data.temperature_1.battery_color).toBe(
        'var(--state-sensor-battery-low-color, #f44336)',
      );
    });
  });
});
