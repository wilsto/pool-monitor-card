/**
 * @fileoverview English translations for the Pool Monitor Card
 * @description Contains all English language strings used in the card interface
 */

/**
 * @const {Object} translations
 * @description English translation strings organized by category
 * @property {Object} state - Sensor state descriptions
 * @property {string} state.1 - Description for very low values
 * @property {string} state.2 - Description for low but acceptable values
 * @property {string} state.3 - Description for ideal lower range values
 * @property {string} state.4 - Description for ideal upper range values
 * @property {string} state.5 - Description for high but acceptable values
 * @property {string} state.6 - Description for very high values
 *
 * @property {Object} sensor - Sensor name translations
 * @property {string} sensor.temperature - Primary temperature sensor name
 * @property {string} sensor.temperature_2 - Secondary temperature sensor name
 * @property {string} sensor.ph - pH level sensor name
 * @property {string} sensor.orp - ORP (Oxidation Reduction Potential) sensor name
 * @property {string} sensor.tds - TDS (Total Dissolved Solids) sensor name
 * @property {string} sensor.salinity - Salinity sensor name
 * @property {string} sensor.cya - Cyanuric acid sensor name
 * @property {string} sensor.calcium - Calcium level sensor name
 * @property {string} sensor.phosphate - Phosphate level sensor name
 * @property {string} sensor.alkalinity - Alkalinity level sensor name
 * @property {string} sensor.free_chlorine - Free chlorine level sensor name
 * @property {string} sensor.total_chlorine - Total chlorine level sensor name
 * @property {string} sensor.pressure - Filter pressure sensor name
 * @property {string} sensor.sg - Specific gravity sensor name
 * @property {string} sensor.magnesium - Magnesium level sensor name
 * @property {string} sensor.water_level - Water level sensor name
 * @property {string} sensor.flow_rate - Flow rate sensor name
 * @property {string} sensor.uv_radiation - UV radiation sensor name
 * @property {string} sensor.product_volume - Product volume sensor name
 * @property {string} sensor.product_weight - Product weight sensor name
 * @property {string} sensor.electrical_conductivity - Electrical Conductivity sensor name
 *
 * @property {Object} time - Time-related translations
 * @property {string} time.seconds - Text for events that just happened
 * @property {string} time.minutes - Text format for minutes ago (uses {minutes} and {plural} placeholders)
 * @property {string} time.hours - Text format for hours ago (uses {hours} and {plural} placeholders)
 * @property {string} time.days - Text format for days ago (uses {days} and {plural} placeholders)
 */
export default {
  state: {
    1: 'Too Low',
    2: 'Acceptable Low',
    3: 'Ideal',
    4: 'Ideal',
    5: 'Acceptable High',
    6: 'Too High',
  },
  sensor: {
    temperature: 'Temperature',
    temperature_2: 'Temperature 2',
    ph: 'pH',
    orp: 'ORP',
    tds: 'TDS',
    salinity: 'Salinity',
    cya: 'Cyanuric Acid',
    calcium: 'Calcium',
    phosphate: 'Phosphate',
    alkalinity: 'Alkalinity',
    free_chlorine: 'Free Chlorine',
    total_chlorine: 'Total Chlorine',
    pressure: 'Filter Pressure',
    sg: 'Specific Gravity',
    magnesium: 'Magnesium',
    water_level: 'Water Level',
    flow_rate: 'Flow Rate',
    uv_radiation: 'UV Radiation',
    product_volume: 'Product Volume',
    product_weight: 'Product Weight',
    electrical_conductivity: 'Electrical Conductivity',
  },
  time: {
    seconds: 'just now',
    minutes: '{minutes} minute{plural} ago',
    hours: '{hours} hour{plural} ago',
    days: '{days} day{plural} ago',
  },
};
