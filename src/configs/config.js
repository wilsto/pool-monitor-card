/**
 * @fileoverview Configuration definitions for the Pool Monitor Card
 */

/**
 * @const {Object} DEFAULT_CONFIG - Default configuration for the Pool Monitor Card
 * @property {Object} display - Display settings
 * @property {boolean} display.compact - Whether to use compact display mode
 * @property {boolean} display.show_names - Whether to show sensor names
 * @property {boolean} display.show_labels - Whether to show labels
 * @property {boolean} display.show_last_updated - Whether to show last updated time
 * @property {boolean} display.show_icons - Whether to show icons
 * @property {boolean} display.show_units - Whether to show measurement units
 * @property {boolean} display.gradient - Whether to show gradient background
 * @property {string} display.language - Language code for translations
 *
 * @property {Object} colors - Color configuration
 * @property {string} colors.low - Color for low values
 * @property {string} colors.warn - Color for warning values
 * @property {string} colors.normal - Color for normal values
 * @property {string} colors.cool - Color for cool values
 * @property {string} colors.marker - Color for markers
 * @property {string} colors.hi_low - Color for high/low indicators
 *
 * @property {Object} sensors - Sensor configurations
 */
export const DEFAULT_CONFIG = {
  display: {
    compact: false,
    show_names: true,
    show_labels: true,
    show_last_updated: false,
    show_icons: true,
    show_units: true,
    gradient: true,
    language: 'en',
  },

  colors: {
    low: '#fdcb6e',
    warn: '#e17055',
    normal: '#00b894',
    cool: '#00BFFF',
    marker: '#000000',
    hi_low: '#00000099',
  },

  sensors: {
    temperature: {
      name: 'Temperature',
      unit: '°C',
      setpoint: 27,
      step: 1,
      mode: 'heatflow',
    },
    orp: {
      name: 'ORP',
      unit: 'mV',
      setpoint: 700,
      step: 50,
      mode: 'centric',
      min_limit: 0,
    },
    ec: {
      name: 'Electrical Conductivity',
      unit: 'µS/cm',
      setpoint: 4000,
      step: 200,
      mode: 'centric',
      min_limit: 0,
    },
    tds: {
      name: 'TDS',
      unit: 'g/L',
      setpoint: 5,
      step: 0.5,
      mode: 'centric',
      min_limit: 0,
    },
    ph: {
      name: 'pH',
      unit: 'pH',
      setpoint: 7.2,
      step: 0.2,
      mode: 'centric',
      min_limit: 0,
    },
    salinity: {
      name: 'Salinity',
      unit: 'ppm',
      setpoint: 3000,
      step: 500,
      mode: 'centric',
      min_limit: 0,
    },
    cya: {
      name: 'Cyanuric Acid',
      unit: 'ppm',
      setpoint: 40,
      step: 10,
      mode: 'centric',
      min_limit: 0,
    },
    calcium: {
      name: 'Calcium',
      unit: 'ppm',
      setpoint: 300,
      step: 100,
      mode: 'centric',
      min_limit: 0,
    },
    phosphate: {
      name: 'Phosphate',
      unit: 'ppb',
      setpoint: 50,
      step: 10,
      mode: 'centric',
      min_limit: 0,
    },
    alkalinity: {
      name: 'Alkalinity',
      unit: 'ppm',
      setpoint: 100,
      step: 20,
      mode: 'centric',
      min_limit: 0,
    },
    free_chlorine: {
      name: 'Free Chlorine',
      unit: 'ppm',
      setpoint: 3,
      step: 0.5,
      mode: 'centric',
      min_limit: 0,
    },
    total_chlorine: {
      name: 'Total Chlorine',
      unit: 'ppm',
      setpoint: 3,
      step: 0.5,
      mode: 'centric',
      min_limit: 0,
    },
    pressure: {
      name: 'Filter Pressure',
      unit: 'psi',
      setpoint: 12,
      step: 2,
      mode: 'centric',
    },
    specific_gravity: {
      name: 'Specific Gravity',
      unit: 'sg',
      setpoint: 1.1,
      step: 0.2,
      mode: 'centric',
    },
    magnesium: {
      name: 'Magnesium',
      unit: 'ppm',
      setpoint: 1200,
      step: 100,
      mode: 'centric',
      min_limit: 0,
    },
    water_level: {
      name: 'Water Level',
      unit: '%',
      setpoint: 100,
      step: 10,
      mode: 'centric',
      min_limit: 0,
    },
    flow_rate: {
      name: 'Flow Rate',
      unit: 'm³/h',
      setpoint: 10,
      step: 1,
      mode: 'centric',
      min_limit: 0,
    },
    uv_radiation: {
      name: 'UV Radiation',
      unit: 'mW/cm²',
      setpoint: 4,
      step: 1,
      mode: 'centric',
      min_limit: 0,
    },
    product_volume: {
      name: 'Product Volume',
      unit: 'L',
      setpoint: 20,
      step: 5,
      mode: 'centric',
      min_limit: 0,
    },
    product_weight: {
      name: 'Product Weight',
      unit: 'kg',
      setpoint: 25,
      step: 5,
      mode: 'centric',
      min_limit: 0,
    },
  },
};

/**
 * @function getSensorConfig
 * @description Get the sensor configuration for a specific sensor type
 * @param {string} type - The type of sensor to get configuration for
 * @returns {Object} The sensor configuration
 */
export function getSensorConfig(type) {
  if (!SUPPORTED_SENSORS.includes(type)) {
    throw new Error(`Unsupported sensor type: ${type}`);
  }
  return { ...DEFAULT_CONFIG.sensors[type] };
}

/**
 * @function getDisplayConfig
 * @description Get the display configuration settings
 * @returns {Object} The display configuration
 */
export function getDisplayConfig() {
  return { ...DEFAULT_CONFIG.display };
}

/**
 * @function getColorConfig
 * @description Get the color configuration settings
 * @returns {Object} The color configuration
 */
export function getColorConfig() {
  return { ...DEFAULT_CONFIG.colors };
}

/**
 * @const {string[]} SUPPORTED_SENSORS - List of supported sensor types
 * @description Array of sensor types supported by the card, derived from sensor configuration
 */
export const SUPPORTED_SENSORS = Object.keys(DEFAULT_CONFIG.sensors);
