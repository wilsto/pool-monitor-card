/**
 * @fileoverview Base class for all monitor cards
 * Contains shared logic: render, processData, calculateData, setConfig
 * Domain-specific cards extend this and provide their own CARD_INFO and SENSORS.
 */

import { LitElement, html } from 'lit';
import { getTranslation, formatTranslation } from './locales/translations.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';
import { getDisplayConfig, getColorConfig, getSensorConfig } from './configs/config.js';

/**
 * @class MonitorCardBase
 * @extends {LitElement}
 * @description Base class for monitor cards. Subclasses must define:
 *   - static CARD_INFO = { cardType, cardName, cardDescription }
 *   - static SENSORS = { sensorType: { name, unit, setpoint, step, mode, ... }, ... }
 *   - static IMAGE_BASE_URL (optional) - base URL for sensor images
 */
export class MonitorCardBase extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  static styles = styles;

  constructor() {
    super();
  }

  /**
   * @method render
   */
  render() {
    const config = this.getConfig();
    const data = this.processData();
    const generateContent = config.display.compact
      ? cardContent.generateCompactBody
      : cardContent.generateBody;

    if (!data || Object.keys(data).length === 0) {
      return html` <div id="pool-monitor-card">
        <div class="warning-message">
          <ha-icon icon="mdi:alert"></ha-icon>
          <span>No valid sensor data available</span>
        </div>
      </div>`;
    }

    return html` <div id="pool-monitor-card">
      ${cardContent.generateTitle(config)}
      ${Object.values(data).map(sensorData => {
        if (sensorData?.invalid) {
          return html`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Sensor ${sensorData?.name || 'unknown'} is not supported. Please verify its
                configuration and ensure it is compatible with the card.</span
              >
            </div>
          `;
        } else if (sensorData?.value === null) {
          return html`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Entity ${sensorData?.entity || 'unknown'} could not be found. Please verify its
                name and ensure the entity is properly configured.</span
              >
            </div>
          `;
        }
        return generateContent(config, sensorData);
      })}
    </div>`;
  }

  /**
   * @method processData
   */
  processData() {
    const data = {};
    const config = this.getConfig();

    Object.entries(config.sensors).forEach(([sensorType, sensorConfigs]) => {
      const sensorArray = Array.isArray(sensorConfigs) ? sensorConfigs : [sensorConfigs];

      sensorArray.forEach((sensor, index) => {
        const sensorKey = `${sensorType}_${index + 1}`;

        data[sensorKey] = this.calculateData(
          sensorType,
          sensor.title || this.getTranslatedText('sensor.' + sensorType),
          sensor.entity,
          sensor.min,
          sensor.max,
          sensor.setpoint,
          sensor.step,
          sensor.unit,
          sensor.icon,
          sensor.image_url,
          sensor.mode,
          sensor.min_limit,
          sensor.override_value,
          sensor.override,
          sensor.invalid,
        );
      });
    });

    return data;
  }

  /**
   * @method getTranslatedText
   */
  getTranslatedText(key, values) {
    const lang = this.config?.display.language || 'en';
    const translation = getTranslation(lang, key);
    return formatTranslation(translation, values);
  }

  /**
   * @method calculateData
   */
  calculateData(
    name,
    title,
    entity,
    entity_min,
    entity_max,
    setpoint,
    setpoint_step,
    unit,
    icon,
    image_url,
    mode,
    min_limit,
    override_value,
    override,
    invalid,
  ) {
    const newData = {};
    const config = this.getConfig();
    const sensorsRegistry = this.constructor.SENSORS || {};
    const defaultConfig = getSensorConfig(name, sensorsRegistry);
    const imageBaseUrl = this.constructor.IMAGE_BASE_URL || '';

    newData.name = name;
    newData.invalid = invalid;
    newData.mode = mode;

    newData.title = config.display.show_names ? title : html`&nbsp;`;

    // Icon/image handling
    newData.hide_icon = false;
    newData.is_mdi = false;
    if (!config.display.show_icons) {
      newData.hide_icon = true;
    } else {
      const sensorIcon = icon || '';
      const sensorImage = image_url || '';

      if (sensorIcon === 'hide') {
        newData.hide_icon = true;
      } else if (sensorImage) {
        newData.img_src = sensorImage;
      } else if (sensorIcon && typeof sensorIcon === 'string' && sensorIcon.startsWith('mdi:')) {
        newData.is_mdi = true;
        newData.mdi_icon = sensorIcon;
      } else if (imageBaseUrl) {
        newData.img_src = `${imageBaseUrl}/${name}.png`;
      } else {
        newData.is_mdi = true;
        newData.mdi_icon = 'mdi:gauge';
      }
    }

    // Check entity exists
    if (!this.hass || !this.hass.states || !this.hass.states[entity]) {
      console.warn(`Entity not found: ${entity}`);
      newData.value = null;
      newData.entity = entity;
      return newData;
    }

    const entityState = this.hass.states[entity];
    const entityRegistry = this.hass.entities?.[entity];
    const precision =
      entityRegistry?.display_precision ??
      entityState.attributes?.display_precision ??
      entityState.attributes?.precision ??
      this.countDecimals(parseFloat(entityState.state));

    const rawValue = parseFloat(entityState.state);
    newData.value = isNaN(rawValue) ? null : Number(rawValue.toFixed(precision));
    newData.entity = entity;

    if (config.display.show_last_updated) {
      newData.last_updated = this.timeFromNow(entityState.last_updated);
    }

    newData.unit = config.display.show_units ? unit || defaultConfig.unit || '' : '';

    if (override) {
      newData.value = override_value || defaultConfig.override;
    }

    // Min/max entities
    newData.min_value =
      entity_min !== undefined &&
      this.hass.states[entity_min] &&
      !isNaN(parseFloat(this.hass.states[entity_min].state))
        ? parseFloat(this.hass.states[entity_min].state)
        : newData.value;

    newData.max_value =
      entity_max !== undefined &&
      this.hass.states[entity_max] &&
      !isNaN(parseFloat(this.hass.states[entity_max].state))
        ? parseFloat(this.hass.states[entity_max].state)
        : newData.value;

    // Setpoint calculations
    setpoint =
      setpoint != null
        ? parseFloat(setpoint)
        : defaultConfig.setpoint != null
          ? parseFloat(defaultConfig.setpoint)
          : newData.value;
    setpoint_step =
      setpoint_step != null
        ? parseFloat(setpoint_step)
        : defaultConfig.step != null
          ? parseFloat(defaultConfig.step)
          : 0.1;

    const countDecimals = Math.max(this.countDecimals(setpoint), this.countDecimals(setpoint_step));

    newData.setpoint = setpoint;

    const minLimit = min_limit !== undefined ? Number(min_limit) : -Infinity;
    const sp_minus_2 = Math.max(minLimit, setpoint - 2 * setpoint_step);
    const sp_minus_1 = Math.max(minLimit, setpoint - setpoint_step);
    const sp = Math.max(minLimit, setpoint);
    const sp_plus_1 = Math.max(minLimit, setpoint + setpoint_step);
    const sp_plus_2 = Math.max(minLimit, setpoint + 2 * setpoint_step);

    newData.setpoint_class = [
      sp_minus_2.toFixed(countDecimals),
      sp_minus_1.toFixed(countDecimals),
      sp.toFixed(countDecimals),
      sp_plus_1.toFixed(countDecimals),
      sp_plus_2.toFixed(countDecimals),
    ];

    newData.separator = config.display.show_labels ? '-' : '';
    newData.color = 'transparent';

    if (newData.value !== null) {
      newData.value = Math.max(minLimit, newData.value);
    }

    if (mode === 'heatflow') {
      if (Number(newData.value) < Number(newData.setpoint_class[1])) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.1') : '';
        newData.color = config.colors.cool;
      } else if (
        Number(newData.value) >= Number(newData.setpoint_class[1]) &&
        Number(newData.value) < Number(newData.setpoint_class[3])
      ) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.3') : '';
        newData.color = config.colors.low;
      } else {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.5') : '';
        newData.color = config.colors.warn;
      }
    } else {
      if (Number(newData.value) < Number(newData.setpoint_class[0])) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.1') : '';
        newData.color = config.colors.warn;
      } else if (
        Number(newData.value) >= Number(newData.setpoint_class[0]) &&
        Number(newData.value) < Number(newData.setpoint_class[1])
      ) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.2') : '';
        newData.color = config.colors.low;
      } else if (
        Number(newData.value) >= Number(newData.setpoint_class[1]) &&
        Number(newData.value) < Number(newData.setpoint_class[2])
      ) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.3') : '';
        newData.color = config.colors.normal;
      } else if (
        Number(newData.value) >= Number(newData.setpoint_class[2]) &&
        Number(newData.value) < Number(newData.setpoint_class[3])
      ) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.4') : '';
        newData.color = config.colors.normal;
      } else if (
        Number(newData.value) >= Number(newData.setpoint_class[3]) &&
        Number(newData.value) < Number(newData.setpoint_class[4])
      ) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.5') : '';
        newData.color = config.colors.low;
      } else if (Number(newData.value) >= Number(newData.setpoint_class[4])) {
        newData.state = config.display.show_labels ? this.getTranslatedText('state.6') : '';
        newData.color = config.colors.warn;
      }
    }
    newData.progressClass = name === 'temperature' ? 'progress-temp' : 'progress';

    newData.pct = Math.max(
      0,
      Math.min(
        98.5,
        (Math.max(0, newData.value - (setpoint - 3 * setpoint_step)) / (6 * setpoint_step)) *
          0.85 *
          100 +
          15,
      ),
    ).toFixed(0);
    newData.pct_min = Math.max(
      0,
      Math.min(
        98.5,
        (Math.max(0, newData.min_value - (setpoint - 3 * setpoint_step)) / (6 * setpoint_step)) *
          0.85 *
          100 +
          15,
      ),
    ).toFixed(0);
    newData.pct_max = Math.max(
      0,
      Math.min(
        98.5,
        (Math.max(0, newData.max_value - (setpoint - 3 * setpoint_step)) / (6 * setpoint_step)) *
          0.85 *
          100 +
          15,
      ),
    ).toFixed(0);
    newData.pct_marker = newData.value > newData.setpoint ? newData.pct - 12 : newData.pct - 5;
    newData.side_align = newData.value > setpoint ? 'right' : 'left';
    newData.pct_cursor =
      newData.value > setpoint ? 100 - parseFloat(newData.pct) : parseFloat(newData.pct) - 2;
    newData.pct_state_step =
      newData.value > setpoint ? 105 - parseFloat(newData.pct) : parseFloat(newData.pct) + 5;
    newData.pct_min =
      newData.value > setpoint
        ? 100 - parseFloat(newData.pct_min)
        : parseFloat(newData.pct_min) - 2;
    newData.pct_max =
      newData.value > setpoint
        ? 100 - parseFloat(newData.pct_max)
        : parseFloat(newData.pct_max) - 2;

    return newData;
  }

  countDecimals(number) {
    if (number === undefined || number === null) return 0;
    if (Math.floor(number) === number) return 0;
    const str = number.toString();
    if (str.includes('.')) return str.split('.')[1].length || 0;
    return 0;
  }

  timeFromNow(dateTime) {
    const date = new Date(dateTime);
    const diff = Date.now() - date.getTime();

    const t = (key, n) => {
      const translationKey = n === 1 ? 'time' : 'time_plural';
      const values = { [key]: n };
      return this.getTranslatedText(`${translationKey}.${key}`, values);
    };

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return t('seconds', 0);
    if (minutes < 60) return t('minutes', minutes);
    if (hours < 24) return t('hours', hours);
    return t('days', days);
  }

  getConfig() {
    return this.config;
  }

  /**
   * @method setConfig
   * @description Sets the card configuration. Uses the subclass SENSORS registry.
   */
  setConfig(config) {
    const sensorsRegistry = this.constructor.SENSORS || {};
    const supportedSensors = Object.keys(sensorsRegistry);

    const defaultConfig = {
      display: getDisplayConfig(),
      colors: getColorConfig(),
    };

    const newConfig = {
      ...config,
      display: {
        ...defaultConfig.display,
        ...(config.display || {}),
      },
      colors: {
        ...defaultConfig.colors,
        ...(config.colors || {}),
      },
      sensors: {},
    };

    if (!config.sensors) {
      throw new Error('Configuration requires sensors to be defined under the "sensors" key.');
    }

    Object.entries(config.sensors).forEach(([sensorType, sensorConfig]) => {
      const defaultSensorConfig = sensorsRegistry[sensorType] || {};
      const sensorArray = Array.isArray(sensorConfig) ? [...sensorConfig] : [{ ...sensorConfig }];

      if (sensorArray.length === 0) {
        throw new Error(`Empty sensor array for ${sensorType}`);
      }

      const mergedSensorArray = sensorArray.map(sensor => ({
        ...defaultSensorConfig,
        ...sensor,
        nameDefinedByUser: !!sensor.name,
      }));

      mergedSensorArray.forEach((sensor, index) => {
        if (!sensor.entity) {
          throw new Error(`Missing entity for ${sensorType}[${index}]`);
        }
        if (sensor.nameDefinedByUser) {
          sensor.title = sensor.name;
        }
        // For cards with a fixed sensors list, mark unknown sensors as invalid
        if (supportedSensors.length > 0 && !supportedSensors.includes(sensorType)) {
          sensor.invalid = true;
        } else {
          sensor.invalid = false;
        }
      });

      newConfig.sensors[sensorType] = mergedSensorArray;
    });

    this.config = newConfig;
  }
}
