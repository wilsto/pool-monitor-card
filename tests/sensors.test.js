import { describe, test, expect } from 'vitest';
import { POOL_SENSORS } from '../src/sensors.js';
import { translations } from '../src/locales/translations.js';

const SENSOR_KEYS = Object.keys(POOL_SENSORS);

describe('POOL_SENSORS registry', () => {
  test('should have 21 sensors', () => {
    expect(SENSOR_KEYS.length).toBe(21);
  });

  test('each sensor should have required properties', () => {
    const requiredProps = ['name', 'unit', 'setpoint', 'step', 'mode'];
    SENSOR_KEYS.forEach(key => {
      const sensor = POOL_SENSORS[key];
      requiredProps.forEach(prop => {
        expect(sensor, `${key} missing ${prop}`).toHaveProperty(prop);
      });
    });
  });

  test('sensor modes should be "heatflow" or "centric"', () => {
    SENSOR_KEYS.forEach(key => {
      expect(['heatflow', 'centric'], `${key} has invalid mode`).toContain(POOL_SENSORS[key].mode);
    });
  });

  test('only temperature should be heatflow mode', () => {
    SENSOR_KEYS.forEach(key => {
      if (key === 'temperature') {
        expect(POOL_SENSORS[key].mode).toBe('heatflow');
      } else {
        expect(POOL_SENSORS[key].mode).toBe('centric');
      }
    });
  });

  test('setpoint values should be numbers', () => {
    SENSOR_KEYS.forEach(key => {
      expect(typeof POOL_SENSORS[key].setpoint).toBe('number');
      expect(typeof POOL_SENSORS[key].step).toBe('number');
    });
  });
});

describe('Sensor-locale consistency', () => {
  test('every pool sensor should have a translation in en', () => {
    const enSensors = translations.en.sensor;
    SENSOR_KEYS.forEach(key => {
      expect(enSensors, `Missing en translation for sensor.${key}`).toHaveProperty(key);
    });
  });

  test('every pool sensor should have a translation in all locales', () => {
    const locales = Object.keys(translations);
    SENSOR_KEYS.forEach(key => {
      locales.forEach(lang => {
        expect(
          translations[lang].sensor,
          `Missing ${lang} translation for sensor.${key}`,
        ).toHaveProperty(key);
      });
    });
  });
});
