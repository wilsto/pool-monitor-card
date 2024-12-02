// Mock BUILD_TIMESTAMP
global.__BUILD_TIMESTAMP__ = 'test';

import { vi } from 'vitest';

// Mock css tagged template function
const cssFunction = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

const htmlFunction = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

// Mock constants
vi.mock('../../src/constants.js', () => ({
  CARD_VERSION: '2.x',
  CARD_INFO: {
    cardType: 'custom:pool-monitor-card',
    cardName: 'Pool Monitor Card',
    cardDescription: 'A card for monitoring pool sensors',
  },
  CONSOLE_STYLE: {},
  SUPPORTED_SENSORS: ['temperature', 'ph', 'orp', 'conductivity'],
}));

// Mock Home Assistant dependencies
class MockLitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [];
  }

  constructor() {
    this._config = {};
    this._hass = {};
  }

  setConfig(config) {
    this._config = config;
  }

  set hass(hass) {
    this._hass = hass;
  }

  get hass() {
    return this._hass;
  }

  set config(config) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  render() {
    // Mock basic rendering logic
    if (!this._hass || !this._config) {
      return 'warning-message: No configuration';
    }

    const entity = this._config.sensors?.temperature?.entity;
    if (!entity || !this._hass.states[entity]) {
      return 'warning-message: Sensor temperature is not supported';
    }

    const state = this._hass.states[entity];
    const value = state.state;
    const unit = this._config.display?.show_units ? '°C' : '';

    if (this._config.title && this._config.display?.showTitle) {
      return `<h1 class="pool-monitor-title">${this._config.title}</h1>${value}${unit ? ' ' + unit : ''}`;
    }

    return `${value}${unit ? ' ' + unit : ''}`;
  }

  // Add support for static properties
  static get cardType() {
    return this._cardType;
  }
  static set cardType(value) {
    this._cardType = value;
  }

  static get cardName() {
    return this._cardName;
  }
  static set cardName(value) {
    this._cardName = value;
  }

  static get cardDescription() {
    return this._cardDescription;
  }
  static set cardDescription(value) {
    this._cardDescription = value;
  }
}

// Ajouter les méthodes au prototype
MockLitElement.prototype.html = htmlFunction;
MockLitElement.prototype.css = cssFunction;

// Mock config functions
export const getSensorConfig = type => {
  const configs = {
    temperature: {
      name: 'Temperature',
      unit: '°C',
      setpoint: 27,
      step: 1,
      mode: 'heatflow',
    },
    ph: {
      name: 'pH',
      unit: 'pH',
      setpoint: 7.2,
      step: 0.2,
      mode: 'centric',
      min_limit: 0,
    },
  };
  return configs[type] || {};
};

export const getDisplayConfig = () => ({
  compact: false,
  show_names: true,
  show_labels: true,
  show_last_updated: false,
  show_icons: true,
  show_units: true,
  gradient: true,
  language: 'en',
});

export const getColorConfig = () => ({
  low: '#fdcb6e',
  warn: '#e17055',
  normal: '#00b894',
  cool: '#00BFFF',
  marker: '#000000',
  hi_low: '#00000099',
});

vi.mock('../../src/configs/config.js', () => ({
  getSensorConfig,
  getDisplayConfig,
  getColorConfig,
  SUPPORTED_SENSORS: ['temperature', 'ph'],
}));

// Create a mock ha-panel-lovelace element
class HaPanelLovelace extends MockLitElement {}

// Setup global mocks
global.customElements = {
  define: vi.fn(),
  get: vi.fn(name => {
    if (name === 'ha-panel-lovelace') {
      return HaPanelLovelace;
    }
    return undefined;
  }),
};

// Mock translations
vi.mock('../../src/locales/translations.js', () => ({
  getTranslation: (lang, key) => key,
  formatTranslation: translation => translation,
}));

// Mock sensor configurations for tests
export const mockSensorConfigs = {
  temperature: {
    entity: 'sensor.pool_temperature',
    name: 'Pool Temperature',
    unit: '°C',
    setpoint: 27,
    step: 0.5,
    min: 'sensor.pool_temp_min',
    max: 'sensor.pool_temp_max',
    mode: 'heatflow',
    min_limit: 15,
    nameDefinedByUser: true,
    title: 'Pool Temperature',
  },
  ph: {
    entity: 'sensor.pool_ph',
    name: 'Pool pH',
    unit: 'pH',
    setpoint: 7.2,
    step: 0.1,
    min: 'sensor.pool_ph_min',
    max: 'sensor.pool_ph_max',
    icon: 'mdi:flask',
    mode: 'bidirectional',
    min_limit: 6.8,
    nameDefinedByUser: true,
    title: 'Pool pH',
  },
  orp: {
    entity: 'sensor.pool_orp',
    unit: 'mV',
    setpoint: 750,
    step: 10,
    nameDefinedByUser: false,
  },
  unsupported_sensor: {
    entity: 'sensor.unsupported',
    name: 'Unsupported Sensor',
    invalid: true,
  },
};

// Mock legacy sensor configurations for tests
export const mockLegacyConfig = {
  entity: 'sensor.pool_temperature',
  name: 'Legacy Temperature',
  unit: '°C',
};

// Mock array sensor configurations for tests
export const mockArraySensorConfigs = {
  temperature: [
    {
      entity: 'sensor.pool_temperature_1',
      name: 'Pool Temperature 1',
      unit: '°C',
    },
    {
      entity: 'sensor.pool_temperature_2',
      name: 'Pool Temperature 2',
      unit: '°C',
    },
  ],
};

// Mock sensor states for tests
export const mockSensorStates = {
  'sensor.pool_temperature': {
    state: '26.5',
    attributes: {
      unit_of_measurement: '°C',
      friendly_name: 'Pool Temperature',
    },
  },
  'sensor.pool_temp_min': {
    state: '25.0',
    attributes: {
      unit_of_measurement: '°C',
    },
  },
  'sensor.pool_temp_max': {
    state: '28.0',
    attributes: {
      unit_of_measurement: '°C',
    },
  },
  'sensor.pool_ph': {
    state: '7.3',
    attributes: {
      unit_of_measurement: 'pH',
      friendly_name: 'Pool pH',
    },
  },
  'sensor.pool_ph_min': {
    state: '7.1',
    attributes: {
      unit_of_measurement: 'pH',
    },
  },
  'sensor.pool_ph_max': {
    state: '7.4',
    attributes: {
      unit_of_measurement: 'pH',
    },
  },
};

export { MockLitElement, HaPanelLovelace };
