/**
 * @fileoverview Shared configuration for all monitor cards
 * Domain-specific sensor presets are defined in each card package.
 */

/**
 * @const {Object} DEFAULT_DISPLAY - Default display settings shared across all cards
 */
export const DEFAULT_DISPLAY = {
  compact: false,
  show_names: true,
  show_labels: true,
  show_last_updated: false,
  show_icons: true,
  show_units: true,
  gradient: true,
  language: 'en',
};

/**
 * @const {Object} DEFAULT_COLORS - Default color settings shared across all cards
 */
export const DEFAULT_COLORS = {
  low: '#fdcb6e',
  warn: '#e17055',
  normal: '#00b894',
  cool: '#00BFFF',
  marker: '#000000',
  hi_low: '#00000099',
};

/**
 * @function getDisplayConfig
 * @returns {Object} Copy of default display config
 */
export function getDisplayConfig() {
  return { ...DEFAULT_DISPLAY };
}

/**
 * @function getColorConfig
 * @returns {Object} Copy of default color config
 */
export function getColorConfig() {
  return { ...DEFAULT_COLORS };
}

/**
 * @function getSensorConfig
 * @description Get sensor config from a sensors registry
 * @param {string} type - Sensor type key
 * @param {Object} sensorsRegistry - The domain-specific sensors object
 * @returns {Object} Copy of the sensor config
 */
export function getSensorConfig(type, sensorsRegistry) {
  if (!sensorsRegistry[type]) {
    return {};
  }
  return { ...sensorsRegistry[type] };
}
