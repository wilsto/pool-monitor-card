import { describe, it, expect } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/configs/config.js';
import fs from 'fs';
import path from 'path';

// Get all sensors from config
const configuredSensors = Object.keys(DEFAULT_CONFIG.sensors);

describe('Sensors consistency', () => {
  // Test presence in locale files
  it('should have all sensors in translation files', () => {
    const localesDir = path.join(process.cwd(), 'src', 'locales');
    const localeFiles = fs.readdirSync(localesDir)
      .filter(file => file.endsWith('.js') && file !== 'translations.js');

    localeFiles.forEach(localeFile => {
      const localePath = path.join(localesDir, localeFile);
      const localeContent = fs.readFileSync(localePath, 'utf8');
      
      configuredSensors.forEach(sensor => {
        expect(
          localeContent.includes(`${sensor}:`),
          `Sensor "${sensor}" missing in ${localeFile}`
        ).toBe(true);
      });
    });
  });

  // Test presence in README.md
  it('should have all sensors documented in README.md', () => {
    const readmePath = path.join(process.cwd(), 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    configuredSensors.forEach(sensor => {
      expect(
        readmeContent.includes(sensor),
        `Sensor "${sensor}" not documented in README.md`
      ).toBe(true);
    });
  });

  // Test presence of sensor images in resources
  it('should have all sensor images in resources folder', () => {
    const resourcesPath = path.join(process.cwd(), 'resources');
    const resourceFiles = fs.readdirSync(resourcesPath);

    configuredSensors.forEach(sensor => {
      expect(
        resourceFiles.some(file => file.startsWith(sensor) && file.endsWith('.png')),
        `Image for sensor "${sensor}" missing in resources folder`
      ).toBe(true);
    });
  });

  // Test presence in sensors.md
  it('should have all sensors documented in sensors.md', () => {
    const sensorsDocPath = path.join(process.cwd(), 'docs', 'sensors.md');
    const sensorsDocContent = fs.readFileSync(sensorsDocPath, 'utf8');

    configuredSensors.forEach(sensor => {
      const sensorConfig = DEFAULT_CONFIG.sensors[sensor];
      expect(
        sensorsDocContent.toLowerCase().includes(sensor.toLowerCase()),
        `Sensor "${sensor}" not found in sensors.md`
      ).toBe(true);
      expect(
        sensorsDocContent.toLowerCase().includes(sensorConfig.name.toLowerCase()),
        `Sensor name "${sensorConfig.name}" not found in sensors.md`
      ).toBe(true);
      expect(
        sensorsDocContent.includes(sensorConfig.unit),
        `Sensor unit "${sensorConfig.unit}" not found in sensors.md`
      ).toBe(true);
    });
  });
});
