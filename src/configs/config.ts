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
  // Halfway between normal and low, so it cannot clash with either. A monotonic
  // scale needs five steps from good to bad; the palette only had four once
  // cool was ruled out — blue at the clean end of a pollutant scale reads as a
  // problem, which is how carbon monoxide came to show 3 ppm as "Too Low".
  fair: '#7ec181',
  cool: '#00BFFF',
  hazardous: '#8e44ad',
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
