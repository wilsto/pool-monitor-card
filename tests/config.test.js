import { describe, test, expect } from 'vitest';
import {
  DEFAULT_DISPLAY,
  DEFAULT_COLORS,
  getDisplayConfig,
  getColorConfig,
  getSensorConfig,
} from '../src/configs/config.js';

describe('Core Config', () => {
  describe('DEFAULT_DISPLAY', () => {
    test('should have all required display properties', () => {
      expect(DEFAULT_DISPLAY).toHaveProperty('compact', false);
      expect(DEFAULT_DISPLAY).toHaveProperty('show_names', true);
      expect(DEFAULT_DISPLAY).toHaveProperty('show_labels', true);
      expect(DEFAULT_DISPLAY).toHaveProperty('show_last_updated', false);
      expect(DEFAULT_DISPLAY).toHaveProperty('show_icons', true);
      expect(DEFAULT_DISPLAY).toHaveProperty('show_units', true);
      expect(DEFAULT_DISPLAY).toHaveProperty('gradient', true);
      expect(DEFAULT_DISPLAY).toHaveProperty('language', 'en');
    });
  });

  describe('DEFAULT_COLORS', () => {
    test('should have all required colors', () => {
      expect(DEFAULT_COLORS).toHaveProperty('low', '#fdcb6e');
      expect(DEFAULT_COLORS).toHaveProperty('warn', '#e17055');
      expect(DEFAULT_COLORS).toHaveProperty('normal', '#00b894');
      expect(DEFAULT_COLORS).toHaveProperty('cool', '#00BFFF');
      expect(DEFAULT_COLORS).toHaveProperty('marker', '#000000');
      expect(DEFAULT_COLORS).toHaveProperty('hi_low', '#00000099');
    });
  });

  describe('getDisplayConfig', () => {
    test('should return display configuration matching DEFAULT_DISPLAY', () => {
      expect(getDisplayConfig()).toEqual(DEFAULT_DISPLAY);
    });

    test('should return a copy (not the same reference)', () => {
      const config = getDisplayConfig();
      config.compact = true;
      expect(DEFAULT_DISPLAY.compact).toBe(false);
    });
  });

  describe('getColorConfig', () => {
    test('should return color configuration matching DEFAULT_COLORS', () => {
      expect(getColorConfig()).toEqual(DEFAULT_COLORS);
    });

    test('should return a copy (not the same reference)', () => {
      const config = getColorConfig();
      config.low = '#000000';
      expect(DEFAULT_COLORS.low).toBe('#fdcb6e');
    });
  });

  describe('getSensorConfig', () => {
    const mockRegistry = {
      temperature: { name: 'Temperature', unit: '°C', setpoint: 27, step: 1, mode: 'heatflow' },
      ph: { name: 'pH', unit: 'pH', setpoint: 7.2, step: 0.2, mode: 'centric' },
    };

    test('should return sensor config for a valid type', () => {
      expect(getSensorConfig('temperature', mockRegistry)).toEqual(mockRegistry.temperature);
    });

    test('should return empty object for unknown sensor type', () => {
      expect(getSensorConfig('unknown_sensor', mockRegistry)).toEqual({});
    });

    test('should return a copy (not the same reference)', () => {
      const config = getSensorConfig('temperature', mockRegistry);
      config.setpoint = 99;
      expect(mockRegistry.temperature.setpoint).toBe(27);
    });
  });
});
