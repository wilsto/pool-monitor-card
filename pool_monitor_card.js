var LitElement = LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
var html = LitElement.prototype.html;

import { getTranslation, formatTranslation } from './locales/translations.js';
import { CARD_VERSION, CARD_INFO, CONSOLE_STYLE } from './components/constants.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';

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
    if (config.compact) {
      return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}
   
        ${data.temperature !== undefined ? cardContent.generateCompactBody(config,data.temperature): ''}
        ${data.temperature_2 !== undefined ? cardContent.generateCompactBody(config,data.temperature_2): ''}
        ${data.ph !== undefined ? cardContent.generateCompactBody(config,data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateCompactBody(config,data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateCompactBody(config,data.tds): ''}      
        ${data.salinity !== undefined ? cardContent.generateCompactBody(config,data.salinity): ''}      
        ${data.cya !== undefined ? cardContent.generateCompactBody(config,data.cya): ''}      
        ${data.calcium !== undefined ? cardContent.generateCompactBody(config,data.calcium): ''}      
        ${data.phosphate !== undefined ? cardContent.generateCompactBody(config,data.phosphate): ''}      
        ${data.alkalinity !== undefined ? cardContent.generateCompactBody(config,data.alkalinity): ''}      
        ${data.free_chlorine !== undefined ? cardContent.generateCompactBody(config,data.free_chlorine): ''}      
        ${data.total_chlorine !== undefined ? cardContent.generateCompactBody(config,data.total_chlorine): ''}      
        ${data.pressure !== undefined ? cardContent.generateCompactBody(config,data.pressure): ''}      
        ${data.sg !== undefined ? cardContent.generateCompactBody(config,data.sg): ''}      
        ${data.magnesium !== undefined ? cardContent.generateCompactBody(config,data.magnesium): ''}
        ${data.water_level !== undefined ? cardContent.generateCompactBody(config,data.water_level): ''}
        ${data.flow_rate !== undefined ? cardContent.generateCompactBody(config,data.flow_rate): ''}
        ${data.uv_radiation !== undefined ? cardContent.generateCompactBody(config,data.uv_radiation): ''}
        ${data.product_volume !== undefined ? cardContent.generateCompactBody(config,data.product_volume): ''}
        ${data.product_weight !== undefined ? cardContent.generateCompactBody(config,data.product_weight): ''}
      </div>`;
    } else {
      return html`
      <div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}

        ${data.temperature !== undefined ? cardContent.generateBody(config,data.temperature): ''}
        ${data.temperature_2 !== undefined ? cardContent.generateBody(config,data.temperature_2): ''}
        ${data.ph !== undefined ? cardContent.generateBody(config,data.ph): ''}
        ${data.orp !== undefined ? cardContent.generateBody(config,data.orp): ''}
        ${data.tds !== undefined ? cardContent.generateBody(config,data.tds): ''}      
        ${data.salinity !== undefined ? cardContent.generateBody(config,data.salinity): ''}      
        ${data.cya !== undefined ? cardContent.generateBody(config,data.cya): ''}      
        ${data.calcium !== undefined ? cardContent.generateBody(config,data.calcium): ''}      
        ${data.phosphate !== undefined ? cardContent.generateBody(config,data.phosphate): ''}      
        ${data.alkalinity !== undefined ? cardContent.generateBody(config,data.alkalinity): ''}      
        ${data.free_chlorine !== undefined ? cardContent.generateBody(config,data.free_chlorine): ''}      
        ${data.total_chlorine !== undefined ? cardContent.generateBody(config,data.total_chlorine): ''}      
        ${data.pressure !== undefined ? cardContent.generateBody(config,data.pressure): ''}      
        ${data.sg !== undefined ? cardContent.generateBody(config,data.sg): ''}
        ${data.magnesium !== undefined ? cardContent.generateBody(config,data.magnesium): ''}
        ${data.water_level !== undefined ? cardContent.generateBody(config,data.water_level): ''}
        ${data.flow_rate !== undefined ? cardContent.generateBody(config,data.flow_rate): ''}
        ${data.uv_radiation !== undefined ? cardContent.generateBody(config,data.uv_radiation): ''}
        ${data.product_volume !== undefined ? cardContent.generateBody(config,data.product_volume): ''}
        ${data.product_weight !== undefined ? cardContent.generateBody(config,data.product_weight): ''}
      </div>`;
    }

  }

  getConfig () {
    const config = {};

    config.title = this.config.title ;
    config.compact = this.config.compact ?? false;
    config.show_names = this.config.show_names ?? true;
    config.show_labels = this.config.show_labels ?? true;
    config.show_icons = this.config.show_icons ?? true;
    config.show_last_updated = this.config.show_last_updated ?? false;
    config.show_units = this.config.show_units ?? true;
    config.gradient = this.config.gradient ?? true;
    config.language = this.config.language ?? 'en';

    config.normal_color = this.config.normal_color ?? "#00b894";
    config.low_color = this.config.low_color ?? "#fdcb6e";
    config.warn_color = this.config.warn_color ?? "#e17055";
    config.marker_color = this.config.marker_color ?? "rgba(0, 0, 0, 1)";
    config.hi_low_color = this.config.hi_low_color ?? "rgba(0, 0, 0, .6)";

    config.override = this.config.override ?? false;

    config.temperature = this.config.temperature ;
    config.temperature_min = this.config.temperature_min ;
    config.temperature_max = this.config.temperature_max ;
    config.temperature = this.config.temperature ;
    config.temperature_name = this.getTranslatedText('sensor.temperature');
    config.temperature_unit = this.config.temperature_unit ?? "°C";
    config.temperature_unit = config.temperature_unit.toUpperCase()
    config.temperature_setpoint = this.config.temperature_setpoint ?? (config.temperature_unit === "°F" ? 80 : 27) ;
    config.temperature_step = this.config.temperature_step ?? (config.temperature_unit === "°F" ? 2 : 1) ;
    config.temperature_override = config.temperature_unit === "°F" ? 79 : 26.5;

    config.temperature_2 = this.config.temperature_2 ;
    config.temperature_2_min = this.config.temperature_2_min ;
    config.temperature_2_max = this.config.temperature_2_max ;
    config.temperature_2_name = this.getTranslatedText('sensor.temperature_2');
    config.temperature_2_unit = this.config.temperature_2_unit ?? "°C";
    config.temperature_2_unit = config.temperature_2_unit.toUpperCase()
    config.temperature_2_setpoint = this.config.temperature_2_setpoint ?? (config.temperature_2_unit === "°F" ? 80 : 27) ;
    config.temperature_2_step = this.config.temperature_2_step ?? (config.temperature_2_unit === "°F" ? 2 : 1) ;
    config.temperature_2_override = config.temperature_2_unit === "°F" ? 92 : 28.5;

    config.ph = this.config.ph;
    config.ph_min = this.config.ph_min;
    config.ph_max = this.config.ph_max;
    config.ph_name = this.getTranslatedText('sensor.ph');
    config.ph_unit = this.config.ph_unit ?? "pH";
    config.ph_setpoint = this.config.ph_setpoint ?? 7.2;
    config.ph_step = this.config.ph_step ?? 0.2 ;
    config.ph_override = 7.5;
    
    config.orp = this.config.orp ;
    config.orp_min = this.config.orp_min ;
    config.orp_max = this.config.orp_max ;
    config.orp_name = this.getTranslatedText('sensor.orp');
    config.orp_unit = this.config.orp_unit ?? "mV";
    config.orp_setpoint = this.config.orp_setpoint ?? 700;
    config.orp_step = this.config.orp_step ?? 50 ;
    config.orp_override = 551;

    config.tds = this.config.tds ;
    config.tds_min = this.config.tds_min ;
    config.tds_max = this.config.tds_max ;
    config.tds_name = this.getTranslatedText('sensor.tds');
    config.tds_unit = this.config.tds_unit ?? "g/L";
    config.tds_unit = config.tds_unit.toLowerCase()
    config.tds_setpoint = this.config.tds_setpoint ?? (config.tds_unit === "ppm" ? 4000 : 4) ;
    config.tds_step = this.config.tds_step ?? (config.tds_unit === "ppm" ? 1000 : 1) ;
    config.tds_override = config.tds_unit === "ppm" ? 7000 : 7;

    config.salinity = this.config.salinity ;
    config.salinity_min = this.config.salinity_min ;
    config.salinity_max = this.config.salinity_max ;
    config.salinity_name = this.getTranslatedText('sensor.salinity');
    config.salinity_unit = this.config.salinity_unit ?? "ppm";
    config.salinity_setpoint = this.config.salinity_setpoint ?? (config.salinity_unit === "ppm" ? 3000 : 4.5) ;
    config.salinity_step = this.config.salinity_step ?? (config.salinity_unit === "ppm" ? 500 : 0.5)  ;
    config.salinity_override = config.salinity_unit === "ppm" ? 2750 : 4;

    config.cya = this.config.cya ;
    config.cya_min = this.config.cya_min ;
    config.cya_max = this.config.cya_max ;
    config.cya_name = this.getTranslatedText('sensor.cya');
    config.cya_unit = this.config.cya_unit ?? "ppm";
    config.cya_setpoint = this.config.cya_setpoint ?? 40;
    config.cya_step = this.config.cya_step ?? 10 ;
    config.cya_override = 27;

    config.calcium = this.config.calcium ;
    config.calcium_min = this.config.calcium_min ;
    config.calcium_max = this.config.calcium_max ;
    config.calcium_name = this.getTranslatedText('sensor.calcium');
    config.calcium_unit = this.config.calcium_unit ?? "ppm";
    config.calcium_setpoint = this.config.calcium_setpoint ?? 300;
    config.calcium_step = this.config.calcium_step ?? 100 ;
    config.calcium_override = 425;

    config.phosphate = this.config.phosphate ;
    config.phosphate_min = this.config.phosphate_min ;
    config.phosphate_max = this.config.phosphate_max ;
    config.phosphate_name = this.getTranslatedText('sensor.phosphate');
    config.phosphate_unit = this.config.phosphate_unit ?? "ppb";
    config.phosphate_setpoint = this.config.phosphate_setpoint ?? 100;
    config.phosphate_step = this.config.phosphate_step ?? 100 ;
    config.phosphate_override = 30;

    config.alkalinity = this.config.alkalinity ;
    config.alkalinity_min = this.config.alkalinity_min ;
    config.alkalinity_max = this.config.alkalinity_max ;
    config.alkalinity_name = this.getTranslatedText('sensor.alkalinity');
    config.alkalinity_unit = this.config.alkalinity_unit ?? "ppm";
    config.alkalinity_setpoint = this.config.alkalinity_setpoint ?? 100;
    config.alkalinity_step = this.config.alkalinity_step ?? 20 ;
    config.alkalinity_override = 50;

    config.free_chlorine = this.config.free_chlorine ;
    config.free_chlorine_min = this.config.free_chlorine_min ;
    config.free_chlorine_max = this.config.free_chlorine_max ;
    config.free_chlorine_name = this.getTranslatedText('sensor.free_chlorine');
    config.free_chlorine_unit = this.config.free_chlorine_unit ?? "ppm";
    config.free_chlorine_setpoint = this.config.free_chlorine_setpoint ?? 2;
    config.free_chlorine_step = this.config.free_chlorine_step ?? 1 ;
    config.free_chlorine_override = 1.5;

    config.total_chlorine = this.config.total_chlorine ;
    config.total_chlorine_min = this.config.total_chlorine_min ;
    config.total_chlorine_max = this.config.total_chlorine_max ;
    config.total_chlorine_name = this.getTranslatedText('sensor.total_chlorine');
    config.total_chlorine_unit = this.config.total_chlorine_unit ?? "ppm";
    config.total_chlorine_setpoint = this.config.total_chlorine_setpoint ?? 3;
    config.total_chlorine_step = this.config.total_chlorine_step ?? 1 ;
    config.total_chlorine_override = 5.5;

    config.pressure = this.config.pressure ;
    config.pressure_min = this.config.pressure_min ;
    config.pressure_max = this.config.pressure_max ;
    config.pressure_name = this.getTranslatedText('sensor.pressure');
    config.pressure_unit = this.config.pressure_unit ?? "psi";
    config.pressure_setpoint = this.config.pressure_setpoint ?? (config.pressure_unit === "bar" ? 1.5 : 23);
    config.pressure_step = this.config.pressure_step ?? (config.pressure_unit === "bar" ? 0.5 : 7);
    config.pressure_override = 32  ;

    config.sg = this.config.sg ;
    config.sg_name = this.getTranslatedText('sensor.sg');
    config.sg_unit = this.config.sg_unit ?? "g/cm³";
    config.sg_setpoint = this.config.sg_setpoint ?? (config.sg_unit === "Ratio" ? 0.5 : 1.5);
    config.sg_step = this.config.sg_step ?? 0.001;
    config.sg_override = 1  ;

    config.magnesium = this.config.magnesium;
    config.magnesium_min = this.config.magnesium_min;
    config.magnesium_max = this.config.magnesium_max;
    config.magnesium_name = this.getTranslatedText('sensor.magnesium');
    config.magnesium_unit = this.config.magnesium_unit ?? "ppm";
    config.magnesium_setpoint = this.config.magnesium_setpoint ?? 700;
    config.magnesium_step = this.config.magnesium_step ?? 100;
    config.magnesium_override = config.magnesium_unit === "ppm" ? 2100 : 2.1;

    config.water_level = this.config.water_level;
    config.water_level_min = this.config.water_level_min;
    config.water_level_max = this.config.water_level_max;
    config.water_level_name = this.getTranslatedText('sensor.water_level');
    config.water_level_unit = this.config.water_level_unit ?? "%";
    config.water_level_setpoint = this.config.water_level_setpoint ?? 50;
    config.water_level_step = this.config.water_level_step ?? 10;
    config.water_level_override = 75;

    config.flow_rate = this.config.flow_rate;
    config.flow_rate_min = this.config.flow_rate_min;
    config.flow_rate_max = this.config.flow_rate_max;
    config.flow_rate_name = this.getTranslatedText('sensor.flow_rate');
    config.flow_rate_unit = this.config.flow_rate_unit ?? "L/min";
    config.flow_rate_setpoint = this.config.flow_rate_setpoint ?? 100;
    config.flow_rate_step = this.config.flow_rate_step ?? 20;
    config.flow_rate_override = 150;

    config.uv_radiation = this.config.uv_radiation;
    config.uv_radiation_min = this.config.uv_radiation_min;
    config.uv_radiation_max = this.config.uv_radiation_max;
    config.uv_radiation_name = this.getTranslatedText('sensor.uv_radiation');
    config.uv_radiation_unit = this.config.uv_radiation_unit ?? "mW/cm²";
    config.uv_radiation_setpoint = this.config.uv_radiation_setpoint ?? 30;
    config.uv_radiation_step = this.config.uv_radiation_step ?? 5;
    config.uv_radiation_override = 40;

    config.product_volume = this.config.product_volume;
    config.product_volume_min = this.config.product_volume_min;
    config.product_volume_max = this.config.product_volume_max;
    config.product_volume_name = this.getTranslatedText('sensor.product_volume');
    config.product_volume_unit = this.config.product_volume_unit ?? "L";
    config.product_volume_setpoint = this.config.product_volume_setpoint ?? 20;
    config.product_volume_step = this.config.product_volume_step ?? 5;
    config.product_volume_override = 15;

    config.product_weight = this.config.product_weight;
    config.product_weight_min = this.config.product_weight_min;
    config.product_weight_max = this.config.product_weight_max;
    config.product_weight_name = this.getTranslatedText('sensor.product_weight');
    config.product_weight_unit = this.config.product_weight_unit ?? "kg";
    config.product_weight_setpoint = this.config.product_weight_setpoint ?? 25;
    config.product_weight_step = this.config.product_weight_step ?? 5;
    config.product_weight_override = 20;

    return config;
  }

  processData () {    

    const data = {}
    const config = this.getConfig()

    if (config.temperature) {
      data.temperature = this.calculateData('temperature', config.temperature_name, config.temperature, config.temperature_min, config.temperature_max, config.temperature_setpoint, config.temperature_step,config.temperature_unit,  config.temperature_override, config.override) 
    }
    if (config.temperature_2) {
      data.temperature_2 = this.calculateData('temperature_2', config.temperature_2_name, config.temperature_2, config.temperature_2_min, config.temperature_2_max, config.temperature_2_setpoint, config.temperature_2_step,config.temperature_2_unit,  config.temperature_2_override, config.override) 
    }
    if (config.ph) {
      data.ph = this.calculateData('ph', config.ph_name, config.ph, config.ph_min, config.ph_max, config.ph_setpoint,config.ph_step,config.ph_unit,config.ph_override, config.override) 
    }
    if (config.orp) {
      data.orp = this.calculateData('orp', config.orp_name, config.orp, config.orp_min, config.orp_max, config.orp_setpoint,config.orp_step ,config.orp_unit, config.orp_override, config.override) 
    }
    if (config.tds) {
      data.tds = this.calculateData('tds', config.tds_name, config.tds, config.tds_min, config.tds_max, config.tds_setpoint,config.tds_step, config.tds_unit, config.tds_override, config.override) 
    }
    if (config.salinity) {
      data.salinity = this.calculateData('salinity', config.salinity_name, config.salinity, config.salinity_min, config.salinity_max, config.salinity_setpoint,config.salinity_step, config.salinity_unit, config.salinity_override, config.override) 
    }
    if (config.cya) {
      data.cya = this.calculateData('cya', config.cya_name, config.cya, config.cya_min, config.cya_max, config.cya_setpoint,config.cya_step, config.cya_unit, config.cya_override, config.override) 
    }
    if (config.calcium) {
      data.calcium = this.calculateData('calcium', config.calcium_name, config.calcium, config.calcium_min, config.calcium_max, config.calcium_setpoint,config.calcium_step, config.calcium_unit, config.calcium_override, config.override) 
    }
    if (config.phosphate) {
      data.phosphate = this.calculateData('phosphate', config.phosphate_name, config.phosphate, config.phosphate_min, config.phosphate_max, config.phosphate_setpoint,config.phosphate_step, config.phosphate_unit, config.phosphate_override, config.override) 
    }
    if (config.alkalinity) {
      data.alkalinity = this.calculateData('alkalinity', config.alkalinity_name, config.alkalinity, config.alkalinity_min, config.alkalinity_max, config.alkalinity_setpoint,config.alkalinity_step, config.alkalinity_unit, config.alkalinity_override, config.override) 
    }    
    if (config.free_chlorine) {
      data.free_chlorine = this.calculateData('free_chlorine', config.free_chlorine_name, config.free_chlorine, config.free_chlorine_min, config.free_chlorine_max, config.free_chlorine_setpoint,config.free_chlorine_step, config.free_chlorine_unit, config.free_chlorine_override, config.override) 
    }    
    if (config.total_chlorine) {
      data.total_chlorine = this.calculateData('total_chlorine', config.total_chlorine_name, config.total_chlorine, config.total_chlorine_min, config.total_chlorine_max, config.total_chlorine_setpoint,config.total_chlorine_step, config.total_chlorine_unit, config.total_chlorine_override, config.override) 
    }    
    if (config.pressure) {
      data.pressure = this.calculateData('pressure', config.pressure_name, config.pressure, config.pressure_min, config.pressure_max, config.pressure_setpoint,config.pressure_step, config.pressure_unit, config.pressure_override, config.override) 
    }    
    if (config.sg) {
      data.sg = this.calculateData('sg', config.sg_name, config.sg, config.sg_min, config.sg_max, config.sg_setpoint,config.sg_step, config.sg_unit, config.sg_override, config.override) 
    }    
    if (config.magnesium) {
      data.magnesium = this.calculateData('magnesium', config.magnesium_name, config.magnesium, config.magnesium_min, config.magnesium_max, config.magnesium_setpoint, config.magnesium_step, config.magnesium_unit, config.magnesium_override, config.override)
    }
    if (config.water_level) {
      data.water_level = this.calculateData('water_level', config.water_level_name, config.water_level, config.water_level_min, config.water_level_max, config.water_level_setpoint, config.water_level_step, config.water_level_unit, config.water_level_override, config.override)
    }
    if (config.flow_rate) {
      data.flow_rate = this.calculateData('flow_rate', config.flow_rate_name, config.flow_rate, config.flow_rate_min, config.flow_rate_max, config.flow_rate_setpoint, config.flow_rate_step, config.flow_rate_unit, config.flow_rate_override, config.override)
    }
    if (config.uv_radiation) {
      data.uv_radiation = this.calculateData('uv_radiation', config.uv_radiation_name, config.uv_radiation, config.uv_radiation_min, config.uv_radiation_max, config.uv_radiation_setpoint, config.uv_radiation_step, config.uv_radiation_unit, config.uv_radiation_override, config.override)
    }
    if (config.product_volume) {
      data.product_volume = this.calculateData('product_volume', config.product_volume_name, config.product_volume, config.product_volume_min, config.product_volume_max, config.product_volume_setpoint, config.product_volume_step, config.product_volume_unit, config.product_volume_override, config.override)
    }
    if (config.product_weight) {
      data.product_weight = this.calculateData('product_weight', config.product_weight_name, config.product_weight, config.product_weight_min, config.product_weight_max, config.product_weight_setpoint, config.product_weight_step, config.product_weight_unit, config.product_weight_override, config.override)
    }
    return data
  }

  getTranslatedText(key, values) {
    const lang = this.config?.language || 'en';
    const translation = getTranslation(lang, key);
    return formatTranslation(translation, values);
  }

  calculateData(name, title, entity, entity_min, entity_max, setpoint, setpoint_step, unit, override_value, override) {
    const newData = {};
    const config = this.getConfig()

    newData.name = name;
    newData.title = config.show_names ? title : html`&nbsp;`;
    
    // Modification pour gérer les différents types d'icônes
    if (!config.show_icons) {
      newData.hide_icon = true;
    } else {
      const iconConfig = this.config[`${name}_icon`] || {};
      if (iconConfig.hide) {
        newData.hide_icon = true;
      } else if (iconConfig.image_url) {
        newData.img_src = iconConfig.image_url;
      } else if (iconConfig.mdi) {
        newData.is_mdi = true;
        newData.mdi_icon = iconConfig.mdi;
      } else {
        newData.img_src = "https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources/"+ name +".png";
      }
    }

    newData.value = parseFloat(this.hass.states[entity].state);
    newData.entity = entity;
    if (config.show_last_updated) {
      newData.last_updated = this.timeFromNow(this.hass.states[entity].last_updated);
    }

    newData.unit = config.show_units ? unit : '';
    if (override){
      newData.value = override_value;
    }

    newData.min_value = entity_min !== undefined ? parseFloat(this.hass.states[entity_min].state):newData.value;
    newData.max_value = entity_max !== undefined ? parseFloat(this.hass.states[entity_max].state):newData.value;

    newData.setpoint = setpoint ;
    const countDecimals = Math.max(this.countDecimals(setpoint), this.countDecimals(setpoint_step));
    if (newData.value) {
      newData.value = this.hass.states[entity].state;
    }
    if (newData.min_value) {
      newData.min_value = entity_min !== undefined ? this.hass.states[entity_min].state : newData.value;
    }
    if (newData.max_value) {
      newData.max_value = entity_max !== undefined ? this.hass.states[entity_max].state : newData.value;
    }
    newData.setpoint_class = [
      (setpoint - 2 *setpoint_step).toFixed(countDecimals),
      (setpoint - setpoint_step).toFixed(countDecimals),
      (setpoint).toFixed(countDecimals),
      (setpoint + setpoint_step).toFixed(countDecimals),
      (setpoint + 2 *setpoint_step).toFixed(countDecimals)
    ]

    newData.separator = config.show_labels ? "-":"";
    newData.color = "transparent";
    if (Number(newData.value)  < Number(newData.setpoint_class[0])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.1'):"";
      newData.color = config.warn_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[0]) && Number(newData.value)  < Number(newData.setpoint_class[1])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.2'):"";
      newData.color = config.low_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[1]) && Number(newData.value)  < Number(newData.setpoint_class[2])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.3'):"";
      newData.color = config.normal_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[2]) && Number(newData.value)  < Number(newData.setpoint_class[3])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.4'):"";
      newData.color = config.normal_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[3]) && Number(newData.value)  < Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.5'):"";
      newData.color = config.low_color;
    } else if (Number(newData.value)  >= Number(newData.setpoint_class[4])) {
      newData.state = config.show_labels ? this.getTranslatedText('state.6'):"";
      newData.color = config.warn_color;
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
   * @returns {number} The number of decimal places (0 if integer)
   */
  countDecimals(number) {
    if (Math.floor(number) === number) { // si c'est un nombre entier
      return 0;
    }
    return number.toString().split(".")[1].length || 0;
  }

  timeFromNow(dateTime) {
    const date = new Date(dateTime);
    const diff = Date.now() - date.getTime();
  
    const t = (key, n) => {
      let plural = n == 1 ? '' : 's'
      let translation = this.getTranslatedText(`time.${key}`);
      translation = translation.replace('{'+ key + '}', n) 
      translation = translation.replace('{plural}', plural) 
      return translation;
    };

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return t('now', 0);
    if (minutes < 60) return t('minute', minutes);
    if (hours < 24) return t('hour', hours);
    return t('day', days);
  }


  setConfig(config) {
    if (!config.temperature && !config.ph && !config.orp && !config.tds && !config.salinity && !config.cya && !config.calcium && !config.phosphate && !config.alkalinity && !config.free_chlorine && !config.total_chlorine && !config.pressure && !config.sg && !config.water_level && !config.flow_rate && !config.uv_radiation && !config.product_volume && !config.product_weight) {
      throw new Error("You need to define entities");
    }
    this.config =  { ...config };
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
