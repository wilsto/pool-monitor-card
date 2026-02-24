import { describe, test, expect, beforeEach, vi } from 'vitest';
import { mockHass, mockSensorStates, validConfig, multiSensorConfig, arraySensorConfig } from './setup.js';
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
        'temperature', 'Temperature', 'sensor.pool_temperature',
        'sensor.pool_temp_min', 'sensor.pool_temp_max',
        27, 1, '°C', undefined, undefined, 'heatflow', undefined, undefined, undefined, false,
      );
      expect(data.value).toBe(26.5);
      expect(data.entity).toBe('sensor.pool_temperature');
      expect(data.unit).toBe('°C');
      expect(data.mode).toBe('heatflow');
      expect(data.name).toBe('temperature');
    });

    test('should return null value and not_found for missing entity', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.nonexistent',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.value).toBeNull();
      expect(data.entity).toBe('sensor.nonexistent');
      expect(data.not_found).toBe(true);
    });

    test('should handle non-numeric entity state (unavailable) without not_found', () => {
      const hass = {
        states: {
          'sensor.bad': { state: 'unavailable', attributes: {}, last_updated: new Date().toISOString() },
        },
      };
      card.hass = hass;
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.bad',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
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
          'sensor.unknown': { state: 'unknown', attributes: {}, last_updated: new Date().toISOString() },
        },
      };
      card.hass = hass;
      const data = card.calculateData(
        'ph', 'pH', 'sensor.unknown',
        undefined, undefined, 7.2, 0.2, 'pH', undefined, undefined, 'centric',
        undefined, undefined, undefined, false,
      );
      expect(data.value).toBeNull();
      expect(data.not_found).toBeUndefined();
      expect(data.color).toBe('var(--disabled-text-color, #bdbdbd)');
      expect(data.state).toBe('');
      expect(data.pct).toBe('50');
    });

    test('should use default setpoint from POOL_SENSORS when not provided', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, undefined, undefined, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.setpoint).toBe(27); // from POOL_SENSORS
    });

    test('should use user-provided setpoint over default', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 30, 2, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.setpoint).toBe(30);
    });

    test('should compute 5 setpoint_class values', () => {
      const data = card.calculateData(
        'ph', 'pH', 'sensor.pool_ph',
        undefined, undefined, 7.2, 0.2, 'pH', undefined, undefined, 'centric',
        0, undefined, undefined, false,
      );
      expect(data.setpoint_class).toHaveLength(5);
    });

    test('should handle min_limit clamping', () => {
      const data = card.calculateData(
        'ph', 'pH', 'sensor.pool_ph',
        undefined, undefined, 7.2, 0.2, 'pH', undefined, undefined, 'centric',
        0, undefined, undefined, false,
      );
      // All setpoint_class values should be >= min_limit (0)
      data.setpoint_class.forEach(v => {
        expect(parseFloat(v)).toBeGreaterThanOrEqual(0);
      });
    });

    test('should read min/max entity values', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        'sensor.pool_temp_min', 'sensor.pool_temp_max',
        27, 1, '°C', undefined, undefined, 'heatflow', undefined, undefined, undefined, false,
      );
      expect(data.min_value).toBe(25.0);
      expect(data.max_value).toBe(28.0);
    });

    test('should fall back to value when min/max entities are missing', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.min_value).toBe(data.value);
      expect(data.max_value).toBe(data.value);
    });

    // --- Icon handling ---
    test('should use MDI icon when provided', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', 'mdi:thermometer', undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.is_mdi).toBe(true);
      expect(data.mdi_icon).toBe('mdi:thermometer');
    });

    test('should use image_url when provided', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, 'http://example.com/icon.png', 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.img_src).toBe('http://example.com/icon.png');
    });

    test('should hide icon when icon is "hide"', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', 'hide', undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.hide_icon).toBe(true);
    });

    test('should use IMAGE_BASE_URL when no icon or image_url is provided', () => {
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.img_src).toContain('temperature.png');
      expect(data.img_src).toContain('pool-monitor-card');
    });

    test('should hide icon when show_icons is false', () => {
      card.setConfig({ ...validConfig, display: { show_icons: false } });
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.hide_icon).toBe(true);
    });

    // --- last_updated ---
    test('should compute last_updated when show_last_updated is true', () => {
      card.setConfig({ ...multiSensorConfig, display: { show_last_updated: true } });
      card.hass = mockHass;
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
      );
      expect(data.last_updated).toBeDefined();
      expect(typeof data.last_updated).toBe('string');
    });

    // --- Unit display ---
    test('should hide unit when show_units is false', () => {
      card.setConfig({ ...validConfig, display: { show_units: false } });
      const data = card.calculateData(
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
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
        'ph', 'pH', 'sensor.pool_ph',
        undefined, undefined, 7.2, 0.2, 'pH', undefined, undefined, 'centric',
        0, undefined, undefined, false,
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
        'temperature', 'Temperature', 'sensor.pool_temperature',
        undefined, undefined, 27, 1, '°C', undefined, undefined, 'heatflow',
        undefined, undefined, undefined, false,
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
});
