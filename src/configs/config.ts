import type { DisplayConfig, ColorConfig, SensorPreset, SensorsRegistry } from '../ha/types.js';

export const DEFAULT_DISPLAY: DisplayConfig = {
  compact: false,
  show_names: true,
  show_labels: true,
  show_last_updated: false,
  show_icons: true,
  show_units: true,
  gradient: true,
  language: 'en',
};

export const DEFAULT_COLORS: ColorConfig = {
  low: '#fdcb6e',
  warn: '#e17055',
  normal: '#00b894',
  cool: '#00BFFF',
  marker: '#000000',
  hi_low: '#00000099',
};

export function getDisplayConfig(): DisplayConfig {
  return { ...DEFAULT_DISPLAY };
}

export function getColorConfig(): ColorConfig {
  return { ...DEFAULT_COLORS };
}

export function getSensorConfig(
  type: string,
  sensorsRegistry: SensorsRegistry,
): Partial<SensorPreset> {
  if (!sensorsRegistry[type]) {
    return {};
  }
  return { ...sensorsRegistry[type] };
}
