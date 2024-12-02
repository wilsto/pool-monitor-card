import {
  DEFAULT_CONFIG,
  SUPPORTED_SENSORS,
  getDisplayConfig,
  getColorConfig,
  getSensorConfig,
} from '../../src/configs/config.js';

describe('Config Module Tests', () => {
  describe('DEFAULT_CONFIG', () => {
    test('should have all required sections', () => {
      expect(DEFAULT_CONFIG).toHaveProperty('display');
      expect(DEFAULT_CONFIG).toHaveProperty('colors');
      expect(DEFAULT_CONFIG).toHaveProperty('sensors');
    });

    test('display section should have correct properties', () => {
      const display = DEFAULT_CONFIG.display;
      expect(display).toHaveProperty('compact', false);
      expect(display).toHaveProperty('show_names', true);
      expect(display).toHaveProperty('show_labels', true);
      expect(display).toHaveProperty('show_last_updated', false);
      expect(display).toHaveProperty('show_icons', true);
      expect(display).toHaveProperty('show_units', true);
      expect(display).toHaveProperty('gradient', true);
      expect(display).toHaveProperty('language', 'en');
    });

    test('colors section should have all required colors', () => {
      const colors = DEFAULT_CONFIG.colors;
      expect(colors).toHaveProperty('low', '#fdcb6e');
      expect(colors).toHaveProperty('warn', '#e17055');
      expect(colors).toHaveProperty('normal', '#00b894');
      expect(colors).toHaveProperty('cool', '#00BFFF');
      expect(colors).toHaveProperty('marker', '#000000');
      expect(colors).toHaveProperty('hi_low', '#00000099');
    });

    test('sensors should have required properties for each sensor', () => {
      const sensors = DEFAULT_CONFIG.sensors;
      const requiredProperties = ['name', 'unit', 'setpoint', 'step', 'mode'];

      Object.keys(sensors).forEach(sensorKey => {
        const sensor = sensors[sensorKey];
        requiredProperties.forEach(prop => {
          expect(sensor).toHaveProperty(prop);
        });
      });
    });

    test('sensor modes should be either "heatflow" or "centric"', () => {
      const sensors = DEFAULT_CONFIG.sensors;
      Object.values(sensors).forEach(sensor => {
        expect(['heatflow', 'centric']).toContain(sensor.mode);
      });
    });
  });

  describe('getDisplayConfig', () => {
    test('should return display configuration object', () => {
      const displayConfig = getDisplayConfig();
      expect(displayConfig).toEqual(DEFAULT_CONFIG.display);
    });

    test('should return object with all display properties', () => {
      const displayConfig = getDisplayConfig();
      expect(displayConfig).toHaveProperty('compact');
      expect(displayConfig).toHaveProperty('show_names');
      expect(displayConfig).toHaveProperty('show_labels');
      expect(displayConfig).toHaveProperty('show_last_updated');
      expect(displayConfig).toHaveProperty('show_icons');
      expect(displayConfig).toHaveProperty('show_units');
      expect(displayConfig).toHaveProperty('gradient');
      expect(displayConfig).toHaveProperty('language');
    });

    test('should return a copy of the display config', () => {
      const displayConfig = getDisplayConfig();
      displayConfig.compact = !displayConfig.compact;
      expect(displayConfig.compact).not.toBe(DEFAULT_CONFIG.display.compact);
    });
  });

  describe('getColorConfig', () => {
    test('should return color configuration object', () => {
      const colorConfig = getColorConfig();
      expect(colorConfig).toEqual(DEFAULT_CONFIG.colors);
    });

    test('should return object with all color properties', () => {
      const colorConfig = getColorConfig();
      expect(colorConfig).toHaveProperty('low');
      expect(colorConfig).toHaveProperty('warn');
      expect(colorConfig).toHaveProperty('normal');
      expect(colorConfig).toHaveProperty('cool');
      expect(colorConfig).toHaveProperty('marker');
      expect(colorConfig).toHaveProperty('hi_low');
    });

    test('should return a copy of the color config', () => {
      const colorConfig = getColorConfig();
      const originalColor = colorConfig.low;
      colorConfig.low = '#000000';
      expect(DEFAULT_CONFIG.colors.low).toBe(originalColor);
    });
  });

  describe('getSensorConfig', () => {
    test('should return sensor configuration for valid sensor type', () => {
      const tempConfig = getSensorConfig('temperature');
      expect(tempConfig).toEqual(DEFAULT_CONFIG.sensors.temperature);
    });

    test('should throw error for invalid sensor type', () => {
      expect(() => getSensorConfig('invalid_sensor')).toThrow('Unsupported sensor type');
    });

    test('should return object with all required sensor properties', () => {
      const phConfig = getSensorConfig('ph');
      expect(phConfig).toHaveProperty('name');
      expect(phConfig).toHaveProperty('unit');
      expect(phConfig).toHaveProperty('setpoint');
      expect(phConfig).toHaveProperty('step');
      expect(phConfig).toHaveProperty('mode');
    });

    test('should return a copy of the sensor config', () => {
      const tempConfig = getSensorConfig('temperature');
      const originalSetpoint = tempConfig.setpoint;
      tempConfig.setpoint = 30;
      expect(DEFAULT_CONFIG.sensors.temperature.setpoint).toBe(originalSetpoint);
    });
  });

  describe('SUPPORTED_SENSORS', () => {
    test('should be an array', () => {
      expect(Array.isArray(SUPPORTED_SENSORS)).toBe(true);
    });

    test('should contain all sensor keys from DEFAULT_CONFIG', () => {
      const configSensorKeys = Object.keys(DEFAULT_CONFIG.sensors);
      configSensorKeys.forEach(sensorKey => {
        expect(SUPPORTED_SENSORS).toContain(sensorKey);
      });
    });

    test('should not have duplicate entries', () => {
      const uniqueSensors = [...new Set(SUPPORTED_SENSORS)];
      expect(SUPPORTED_SENSORS.length).toBe(uniqueSensors.length);
    });
  });
});
