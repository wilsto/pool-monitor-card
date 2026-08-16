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
 * @property {string} sensor.specific_gravity - Specific gravity sensor name
 * @property {string} sensor.magnesium - Magnesium level sensor name
 * @property {string} sensor.water_level - Water level sensor name
 * @property {string} sensor.flow_rate - Flow rate sensor name
 * @property {string} sensor.uv_radiation - UV radiation sensor name
 * @property {string} sensor.product_volume - Product volume sensor name
 * @property {string} sensor.product_weight - Product weight sensor name
 * @property {string} sensor.ec - Electrical Conductivity sensor name
 *
 * @property {Object} time - Time-related translations (singular forms)
 * @property {string} time.seconds - Text for events that just happened
 * @property {string} time.minutes - Text format for minutes ago (uses {minutes} placeholder)
 * @property {string} time.hours - Text format for hours ago (uses {hours} placeholder)
 * @property {string} time.days - Text format for days ago (uses {days} placeholder)
 *
 * @property {Object} time_plural - Time-related translations (plural forms)
 * @property {string} time_plural.seconds - Text for events that just happened
 * @property {string} time_plural.minutes - Text format for minutes ago (uses {minutes} placeholder)
 * @property {string} time_plural.hours - Text format for hours ago (uses {hours} placeholder)
 * @property {string} time_plural.days - Text format for days ago (uses {days} placeholder)
 */
export default {
  language: 'English',
  state: {
    1: 'Too Low',
    2: 'Acceptable Low',
    3: 'Ideal',
    4: 'Ideal',
    5: 'Acceptable High',
    6: 'Too High',
  },
  // Bands of a monotonic scale, named after the European Air Quality Index.
  // The centric `state` vocabulary above cannot serve here: its middle entry is
  // the ideal, whereas the middle band of a monotonic scale is an exceedance.
  band: {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  },
  // The editor had no translation at all: every label was written in English in
  // the markup, while the card itself speaks seventeen languages. A Hungarian
  // user read their card in Hungarian and configured it in English.
  //
  // The editor follows `hass.language`, not the card's display language: the
  // person configuring is not necessarily the person looking at the result.
  editor: {
    attribute: 'Attribute',
    attribute_hint: 'Leave empty to use the state',
    required: 'required',
    incomplete: 'incomplete',
    inherited: 'inherited',
    entity_required: 'The only field you have to fill. Everything else already has a value.',
    sec_content: 'Content',
    sec_appearance: 'Appearance',
    sec_scale: 'Scale',
    sec_linked: 'Linked entities',
    sec_timestamp: 'Timestamp',
    scale_mode: 'How the bands are set',
    scale_from_setpoint: 'From a setpoint',
    scale_from_limits: 'Explicit thresholds',
    scale_hint_setpoint: 'Four bands derived from the setpoint, one step apart.',
    scale_hint_limits:
      'Give the four boundaries yourself, for a reading whose ideal sits at one end.',
    direction: 'Reads',
    lower_is_better: 'Lower is better',
    higher_is_better: 'Higher is better',
    limit_1: 'Boundary 1',
    limit_2: 'Boundary 2',
    limit_3: 'Boundary 3',
    limit_4: 'Boundary 4',
    values_changed: '{count} changed',
    preview: 'Preview',
    sec_appearance_sub: 'icon, image',
    sec_linked_sub: 'setpoint, bounds, availability, battery',
    sec_timestamp_sub: 'where the measurement time comes from',
    mode: 'Mode',
    mode_centric: 'Centric',
    mode_heatflow: 'Heatflow',
    entity: 'Entity',
    name_override: 'Name override',
    unit_override: 'Unit override',
    setpoint: 'Setpoint',
    step: 'Step',
    min_limit: 'Min limit',
    step_low: 'Step low',
    step_high: 'Step high',
    min_entity: 'Min entity',
    max_entity: 'Max entity',
    icon: 'Icon',
    image_url: 'Image URL',
    availability_entity: 'Availability entity (optional, grays out when off)',
    battery_entity: 'Battery entity (optional, shows battery level)',
    last_updated_entity: 'Last updated entity (optional)',
    last_updated_attribute: 'Last updated attribute',
    setpoint_entity: 'Setpoint entity (optional, overrides static setpoint)',
    min_limit_entity: 'Min limit entity (optional, overrides static min_limit)',
    sensor_type_key: 'Sensor type key',
    all_configured: 'All sensor types are configured.',
    display_options: 'Display Options',
    colors: 'Colors',
    card_title: 'Card title',
    compact: 'Compact mode',
    show_names: 'Show names',
    show_labels: 'Show state labels',
    show_last_updated: 'Show last updated',
    show_icons: 'Show icons',
    show_units: 'Show units',
    gradient: 'Gradient bar',
    language: 'Language',
    status_entity: 'Status entity',
    name_font_size: 'Name font size (e.g. 0.8em, 14px)',
    name_font_weight: 'Name font weight',
    font_weight: {
      default: 'Default',
      normal: 'Normal',
      bold: 'Bold',
      light: 'Light (300)',
      semi_bold: 'Semi-bold (600)',
    },
    category: {
      water_chemistry: 'Essential Water Chemistry',
      chemical_balance: 'Chemical Balance',
      treatment: 'Treatment & Sanitization',
      equipment: 'Equipment & Maintenance',
      other: 'Other',
    },
    color: {
      low: 'Low',
      warn: 'Warn',
      normal: 'Normal',
      fair: 'Fair',
      cool: 'Cool',
      hazardous: 'Hazardous',
      marker: 'Marker',
      hi_low: 'Hi/Low',
    },
  },
  sensor: {
    humidity: 'Humidity',
    filtration_time: 'Filtration Time',
    pump_energy: 'Pump Energy',
    co: 'Carbon Monoxide',
    temperature: 'Temperature',
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
    specific_gravity: 'Specific Gravity',
    magnesium: 'Magnesium',
    water_level: 'Water Level',
    flow_rate: 'Flow Rate',
    uv_radiation: 'UV Radiation',
    product_volume: 'Product Volume',
    product_weight: 'Product Weight',
    ec: 'Electrical Conductivity',
    bromine: 'Bromine',
    chlorinator: 'Chlorinator',
    pump_speed: 'Pump Speed',
    light_brightness: 'Light Brightness',
    heat_pump_setpoint: 'Heat Pump Setpoint',
  },
  time: {
    seconds: 'just now',
    minutes: '{minutes} minute ago',
    hours: '{hours} hour ago',
    days: '{days} day ago',
  },
  time_plural: {
    seconds: 'just now',
    minutes: '{minutes} minutes ago',
    hours: '{hours} hours ago',
    days: '{days} days ago',
  },
};
