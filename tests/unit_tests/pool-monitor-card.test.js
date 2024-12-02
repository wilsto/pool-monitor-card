import './setup.js';
import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { PoolMonitorCard } from '../../src/pool_monitor_card.js';
import {
  mockSensorConfigs,
  mockSensorStates,
  getDisplayConfig,
  getColorConfig,
  getSensorConfig,
  mockLegacyConfig,
  mockArraySensorConfigs,
} from './setup.js';

describe('Pool Monitor Card', () => {
  let card;

  beforeEach(() => {
    card = new PoolMonitorCard();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const minimalConfig = {
    sensors: {
      temperature: {
        entity: 'sensor.pool_temperature',
      },
    },
  };

  describe('Static Properties', () => {
    it('should have correct card type', () => {
      expect(PoolMonitorCard.cardType).toBe('custom:pool-monitor-card');
    });

    it('should have correct card name', () => {
      expect(PoolMonitorCard.cardName).toBe('Pool Monitor Card');
    });

    it('should have correct card description', () => {
      expect(PoolMonitorCard.cardDescription).toBe('A card for monitoring pool sensors');
    });
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(PoolMonitorCard).toBeDefined();
    });

    it('should initialize with minimal config', () => {
      expect(() => card.setConfig(minimalConfig)).not.toThrow();
    });
  });

  describe('Configuration', () => {
    it('should accept valid minimal configuration', () => {
      expect(() => card.setConfig(minimalConfig)).not.toThrow();
    });

    it('should throw on missing configuration', () => {
      expect(() => card.setConfig({})).toThrow();
    });

    it('should throw on missing sensors configuration', () => {
      const invalidConfig = { ...minimalConfig };
      delete invalidConfig.sensors;
      expect(() => card.setConfig(invalidConfig)).toThrow();
    });
  });

  describe('Data Processing', () => {
    beforeEach(() => {
      card.setConfig(minimalConfig);
    });

    it('should handle unavailable sensor', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: 'unavailable',
          },
        },
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should handle missing sensor entity', () => {
      card.hass = {
        states: {},
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });

    it('should handle non-numeric sensor value', () => {
      card.hass = {
        states: {
          'sensor.pool_temp': {
            state: 'invalid',
          },
        },
      };
      const data = card.processData();
      expect(data.temperature_1.value).toBeNull();
    });
  });

  describe('Data Calculation', () => {
    beforeEach(() => {
      card.setConfig({
        sensors: mockSensorConfigs,
        display: getDisplayConfig(),
      });
      card.hass = { states: mockSensorStates };
    });

    it('should calculate temperature data correctly', () => {
      const sensor = mockSensorConfigs.temperature;
      const data = card.calculateData(
        'temperature',
        sensor.title,
        sensor.entity,
        sensor.min,
        sensor.max,
        sensor.setpoint,
        sensor.step,
        sensor.unit,
        sensor.icon,
        sensor.image_url,
        sensor.mode,
        sensor.min_limit,
        sensor.override_value,
        sensor.override,
        sensor.invalid,
      );

      expect(data).toBeDefined();
      expect(data.name).toBe('temperature');
      expect(data.value).toBe(26.5);
      expect(data.unit).toBe('°C');
      expect(data.min_value).toBe(25.0);
      expect(data.max_value).toBe(28.0);
      expect(data.setpoint).toBe(27);
      expect(data.mode).toBe('heatflow');
      expect(data.setpoint_class).toEqual(['26.0', '26.5', '27.0', '27.5', '28.0']);
      expect(data.title).toBe('Pool Temperature');
      expect(data.entity).toBe('sensor.pool_temperature');
      expect(data.is_mdi).toBe(false);
      expect(data.img_src).toBe(
        'https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/temperature.png',
      );
      expect(data.hide_icon).toBe(false);
      expect(data.invalid).toBe(undefined);
      expect(data.separator).toBe('-');
    });

    it('should calculate pH data correctly', () => {
      const sensor = mockSensorConfigs.ph;
      const data = card.calculateData(
        'ph',
        sensor.title,
        sensor.entity,
        sensor.min,
        sensor.max,
        sensor.setpoint,
        sensor.step,
        sensor.unit,
        sensor.icon,
        sensor.image_url,
        sensor.mode,
        sensor.min_limit,
        sensor.override_value,
        sensor.override,
        sensor.invalid,
      );

      expect(data).toBeDefined();
      expect(data.name).toBe('ph');
      expect(data.value).toBe(7.3);
      expect(data.unit).toBe('pH');
      expect(data.min_value).toBe(7.1);
      expect(data.max_value).toBe(7.4);
      expect(data.setpoint).toBe(7.2);
      expect(data.mode).toBe('bidirectional');
      expect(data.setpoint_class).toEqual(['7.0', '7.1', '7.2', '7.3', '7.4']);
      expect(data.title).toBe('Pool pH');
      expect(data.entity).toBe('sensor.pool_ph');
      expect(data.is_mdi).toBe(true);
      expect(data.mdi_icon).toBe('mdi:flask');
      expect(data.hide_icon).toBe(false);
      expect(data.invalid).toBe(undefined);
      expect(data.separator).toBe('-');
    });

    it('should handle invalid sensor data', () => {
      const sensor = mockSensorConfigs.unsupported_sensor;
      const data = card.calculateData(
        'unsupported_sensor',
        sensor.name,
        sensor.entity,
        sensor.min,
        sensor.max,
        sensor.setpoint,
        sensor.step,
        sensor.unit,
        sensor.icon,
        sensor.image_url,
        sensor.mode,
        sensor.min_limit,
        sensor.override_value,
        sensor.override,
        sensor.invalid,
      );

      expect(data).toBeDefined();
      expect(data.invalid).toBe(true);
      expect(data.name).toBe('unsupported_sensor');
    });
  });

  describe('PoolMonitorCard Configuration', () => {
    let card;

    beforeEach(() => {
      card = new PoolMonitorCard();
    });

    test('should handle valid sensor configuration', () => {
      const config = {
        sensors: {
          temperature: mockSensorConfigs.temperature,
          ph: mockSensorConfigs.ph,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.temperature[0].nameDefinedByUser).toBe(true);
      expect(card.config.sensors.temperature[0].title).toBe('Pool Temperature');
    });

    test('should handle array sensor configuration', () => {
      const config = {
        sensors: mockArraySensorConfigs,
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.temperature).toHaveLength(2);
      expect(card.config.sensors.temperature[0].entity).toBe('sensor.pool_temperature_1');
      expect(card.config.sensors.temperature[1].entity).toBe('sensor.pool_temperature_2');
    });

    test('should reject legacy configuration', () => {
      expect(() => card.setConfig(mockLegacyConfig)).toThrow('Legacy configuration detected');
    });

    test('should handle empty sensor array', () => {
      const config = {
        sensors: {
          temperature: [],
        },
      };
      expect(() => card.setConfig(config)).toThrow('Empty sensor array for temperature');
    });

    test('should handle missing entity', () => {
      const config = {
        sensors: {
          temperature: [{ name: 'Missing Entity' }],
        },
      };
      expect(() => card.setConfig(config)).toThrow('Missing entity for temperature[0]');
    });

    test('should handle unsupported sensor type', () => {
      const config = {
        sensors: {
          unsupported_sensor: mockSensorConfigs.unsupported_sensor,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.unsupported_sensor[0].invalid).toBe(true);
    });

    test('should handle sensor without name defined by user', () => {
      const config = {
        sensors: {
          orp: mockSensorConfigs.orp,
        },
      };
      expect(() => card.setConfig(config)).not.toThrow();
      expect(card.config.sensors.orp[0].nameDefinedByUser).toBe(false);
      expect(card.config.sensors.orp[0].title).toBeUndefined();
    });
  });
});
