var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;

import { getTranslation, formatTranslation } from './locales/translations.js';
import { CARD_VERSION, CARD_INFO, CONSOLE_STYLE, SUPPORTED_SENSORS } from './constants.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';
import { getSensorConfig, getDisplayConfig, getColorConfig } from './configs/pool_config.js';

console.info(
  `%c POOL-MONITORING-CARD %c ${CARD_VERSION} `,
  CONSOLE_STYLE.title,
  CONSOLE_STYLE.version,
);

class PoolMonitorCard extends LitElement {
  static cardType = CARD_INFO.cardType
  static cardName = CARD_INFO.cardName
  static cardDescription = CARD_INFO.cardDescription

  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  static styles = styles;

  constructor() {
    super();
  }

  render() {
    const config = this.getConfig()
    const data = this.processData()
    const generateContent = config.display.compact ? cardContent.generateCompactBody : cardContent.generateBody;

    // Vérifier si nous avons des données valides
    if (!data || Object.keys(data).length === 0) {
      return html`
        <div id="pool-monitor-card">
          <div class="warning-message">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>No valid sensor data available</span>
          </div>
        </div>`;
    }

    return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}
        ${Object.values(data).map(sensorData => {
          if (sensorData?.invalid) {
            return html`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>Sensor ${sensorData?.name || 'unknown'} is not supported. Please verify its configuration and ensure it is compatible with the card.</span>
              </div>
            `;
          } else if (sensorData?.value === null) {
            return html`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>Entity ${sensorData?.entity || 'unknown'} could not be found. Please verify its name and ensure the entity is properly configured.</span>
              </div>
            `;
          }
          return generateContent(config, sensorData);
        })}
      </div>`;
  }


  processData() {
    const data = {};
    const config = this.getConfig();

    Object.entries(config.sensors).forEach(([sensorType, sensorConfigs]) => {
      // Convertir en tableau si ce n'est pas déjà le cas (rétrocompatibilité)
      const sensorArray = Array.isArray(sensorConfigs) ? sensorConfigs : [sensorConfigs];

      sensorArray.forEach((sensor, index) => {
        const sensorKey = `${sensorType}_${index + 1}`;
        data[sensorKey] = this.calculateData(
          sensorType,
          sensor.name || `${sensorType} ${index + 1}`,
          sensor.entity,
          sensor.min,
          sensor.max,
          sensor.setpoint,
          sensor.step,
          sensor.unit,
          sensor.icon,
          sensor.image_url,
          sensor.override_value,
          sensor.override,
          sensor.invalid
        );

  
      });
    });

    return data;
  }

  getTranslatedText(key, values) {
    const lang = this.config?.language || 'en';
    const translation = getTranslation(lang, key);
    return formatTranslation(translation, values);
  }

  calculateData(name, title, entity, entity_min, entity_max, setpoint, setpoint_step, unit, icon, image_url, override_value, override, invalid) {
    const newData = {};
    const config = this.getConfig();
    const defaultConfig = getSensorConfig(name) || {};

    newData.name = name;
    newData.invalid = invalid;

    newData.title = config.display.show_names ? title : html`&nbsp;`;
    
    // Gestion des icônes et images pour chaque capteur
    if (!config.display.show_icons) {
      newData.hide_icon = true;
    } else {
      const sensorIcon = icon || '';
      const sensorImage = image_url || '';

      if (sensorIcon === 'hide') {
        newData.hide_icon = true;
      } else if (sensorImage) {
        newData.is_mdi = false;
        newData.img_src = sensorImage;
      } else if (sensorIcon && typeof sensorIcon === 'string' && sensorIcon.startsWith('mdi:')) {
        newData.is_mdi = true;
        newData.mdi_icon = sensorIcon;
      } else {
        newData.img_src = `https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/${name}.png`;
      }
    }

    // Vérifier si l'entité existe
    if (!this.hass || !this.hass.states || !this.hass.states[entity]) {
      console.warn(`Entity not found: ${entity}`);
      newData.value = null;
      newData.entity = entity;
      return newData;
    }

    newData.value = parseFloat(this.hass.states[entity].state);
    newData.entity = entity;
    
    if (config.display.show_last_updated) {
      newData.last_updated = this.timeFromNow(this.hass.states[entity].last_updated);
    }
    
    // Utiliser l'unité de la configuration par défaut si non spécifiée
    newData.unit = config.display.show_units ? (unit || defaultConfig.unit || '') : '';
    
    if (override){
      newData.value = override_value || defaultConfig.override;
    }

    // Vérifier les entités min/max
    newData.min_value = entity_min !== undefined && this.hass.states[entity_min] && !isNaN(parseFloat(this.hass.states[entity_min].state))
      ? parseFloat(this.hass.states[entity_min].state)
      : newData.value;
    
    newData.max_value = entity_max !== undefined && this.hass.states[entity_max] && !isNaN(parseFloat(this.hass.states[entity_max].state))
      ? parseFloat(this.hass.states[entity_max].state)
      : newData.value;

    // Utiliser les valeurs par défaut de la configuration si non spécifiées
    setpoint = setpoint !== undefined ? parseFloat(setpoint) : (defaultConfig.setpoint !== undefined ? parseFloat(defaultConfig.setpoint) : newData.value);
    setpoint_step = setpoint_step !== undefined ? parseFloat(setpoint_step) : (defaultConfig.step !== undefined ? parseFloat(defaultConfig.step) : 0.1);

    const countDecimals = Math.max(
      this.countDecimals(setpoint), 
      this.countDecimals(setpoint_step)
    );

    if (newData.value) {
      newData.value = parseFloat(this.hass.states[entity].state);
    }

    newData.setpoint = setpoint;
    newData.setpoint_class = [
      (setpoint - 2 * setpoint_step).toFixed(countDecimals),
      (setpoint - setpoint_step).toFixed(countDecimals),
      (setpoint).toFixed(countDecimals),
      (setpoint + setpoint_step).toFixed(countDecimals),
      (setpoint + 2 * setpoint_step).toFixed(countDecimals)
    ]

    newData.separator = config.show_labels ? "-":"";
    newData.color = "transparent";
    if (Number(newData.value)  < Number(newData.setpoint_class[0])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.1'):"";
      newData.color = config.colors.warn;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[0]) && Number(newData.value)  < Number(newData.setpoint_class[1])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.2'):"";
      newData.color = config.colors.low;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[1]) && Number(newData.value)  < Number(newData.setpoint_class[2])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.3'):"";
      newData.color = config.colors.normal;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[2]) && Number(newData.value)  < Number(newData.setpoint_class[3])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.4'):"";
      newData.color = config.colors.normal;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[3]) && Number(newData.value)  < Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.5'):"";
      newData.color = config.colors.low;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.6'):"";
      newData.color = config.colors.warn;
    }
    newData.progressClass = name === "temperature" ? "progress-temp" : "progress";

    newData.pct = Math.max(0, Math.min(98.5, (Math.max(0, newData.value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.85 * 100 + 13)).toFixed(0);
    newData.pct_min = Math.max(0, Math.min(98.5, (Math.max(0, newData.min_value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.85 * 100 + 13)).toFixed(0);
    newData.pct_max = Math.max(0, Math.min(98.5, (Math.max(0, newData.max_value - (setpoint - 3 *setpoint_step)) / (6 * setpoint_step)) * 0.85 * 100 + 13)).toFixed(0);
    newData.pct_marker = newData.value > newData.setpoint ? newData.pct - 13 : newData.pct - 5;
    newData.side_align = newData.value > setpoint ? "right" : "left" ;
    newData.pct_cursor = newData.value > setpoint ? 100 - parseFloat(newData.pct) : parseFloat(newData.pct) -2;
    newData.pct_state_step = newData.value > setpoint ? 105 - parseFloat(newData.pct): parseFloat(newData.pct)+5;
    newData.pct_min = newData.value > setpoint ? 100 - parseFloat(newData.pct_min) : parseFloat(newData.pct_min) -2;
    newData.pct_max = newData.value > setpoint ? 100 - parseFloat(newData.pct_max) : parseFloat(newData.pct_max) -2;

    return newData
  }

  /**
   * Count the number of decimal places in a number
   * @param {number} number - The number to analyze
   * @returns {number} The number of decimal places (0 if integer or invalid)
   */
  countDecimals(number) {
    if (number === undefined || number === null) {
      return 0;
    }
    if (Math.floor(number) === number) { // si c'est un nombre entier
      return 0;
    }
    const str = number.toString();
    if (str.includes('.')) {
      return str.split(".")[1].length || 0;
    }
    return 0;
  }

  timeFromNow(dateTime) {
    const date = new Date(dateTime);
    const diff = Date.now() - date.getTime();
  
    const t = (key, n) => {
      let plural = n == 1 ? '' : 's';
      let translation = this.getTranslatedText(`time.${key}`);
      translation = translation.replace('{'+ key + '}', n);
      translation = translation.replace('{plural}', plural);
      return translation;
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
    return  this.config;
  }

  setConfig(config) {
    // Utiliser la configuration par défaut de pool_config.js
    const defaultConfig = {
      display: getDisplayConfig(),
      colors: getColorConfig(),
    };

    // Merge avec la configuration utilisateur
    const newConfig = {
      ...config,
      display: {
        ...defaultConfig.display,
        ...(config.display || {})
      },
      colors: {
        ...defaultConfig.colors,
        ...(config.colors || {})
      },
      // Créer une copie profonde de la configuration des sensors
      sensors: {}
    };

    if (!config.sensors) {
      console.warn(`Legacy configuration detected, please move sensors under "sensors" key`, {
        config
      });
      throw new Error('Legacy configuration detected. Please update your setup to define all sensors under the "sensors" key as required by the version 2.0 of the card.');
    }

    // Validation et transformation des capteurs
    Object.entries(config.sensors).forEach(([sensorType, sensorConfig]) => {
      // Obtenir la configuration par défaut pour ce type de capteur
      const defaultSensorConfig = getSensorConfig(sensorType);

      // Vérifier si le sensor est supporté
      if (!SUPPORTED_SENSORS.includes(sensorType)) {
        console.warn(`Unsupported sensor type: ${sensorType}`, {
          sensorType,
          supportedSensors: SUPPORTED_SENSORS,
          config: config,
          sensorConfig
        });
      }

      // Convertir en tableau si ce n'est pas déjà le cas (rétrocompatibilité)
      const sensorArray = Array.isArray(sensorConfig) ? [...sensorConfig] : [{ ...sensorConfig }];
      
      if (sensorArray.length === 0) {
        throw new Error(`Empty sensor array for ${sensorType}`);
      }

      // Fusionner les valeurs par défaut pour chaque capteur du tableau
      const mergedSensorArray = sensorArray.map(sensor => ({
        ...defaultSensorConfig,  // Valeurs par défaut
        ...sensor               // Configuration utilisateur (écrase les valeurs par défaut)
      }));

      mergedSensorArray.forEach((sensor, index) => {
        if (!sensor.entity) {
          throw new Error(`Missing entity for ${sensorType}[${index}]`);
        }
      });

      // Stocker le tableau de capteurs fusionnés dans le nouvel objet
      newConfig.sensors[sensorType] = mergedSensorArray;
    });

    this.config = newConfig;
  }

  static _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    popupEvent.detail = { entityId: entityinfo };
    document.querySelector("home-assistant").dispatchEvent(popupEvent);
  }
}

customElements.define("pool-monitor-card", PoolMonitorCard);
