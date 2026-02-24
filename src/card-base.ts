import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { getTranslation, formatTranslation } from './locales/translations.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';
import { getDisplayConfig, getColorConfig, getSensorConfig } from './configs/config.js';
import type {
  HomeAssistant,
  SensorsRegistry,
  CardConfig,
  CardInfo,
  SensorData,
  StatusData,
} from './ha/types.js';

export class MonitorCardBase extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CardConfig;

  static CARD_INFO: CardInfo;
  static SENSORS: SensorsRegistry = {};
  static IMAGE_BASE_URL = '';

  static styles = styles;

  render(): TemplateResult {
    const config = this.getConfig();
    const data = this.processData();
    const status = this.resolveStatus();
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
      ${cardContent.generateTitle(config)} ${status ? cardContent.generateStatusBadge(status) : ''}
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
        } else if (sensorData?.not_found) {
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

  processData(): Record<string, SensorData> {
    const data: Record<string, SensorData> = {};
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
          sensor.step_low,
          sensor.step_high,
          sensor.last_updated_entity,
          sensor.last_updated_attribute,
          sensor.setpoint_entity,
          sensor.min_limit_entity,
        );

        if (sensor.availability_entity) {
          const availState = this.hass?.states?.[sensor.availability_entity]?.state;
          data[sensorKey].disabled = availState === 'off' || availState === 'unavailable';
        }
      });
    });

    return data;
  }

  getTranslatedText(key: string, values?: Record<string, string | number>): string {
    const lang = this.config?.display.language || 'en';
    const translation = getTranslation(lang, key);
    return formatTranslation(translation, values);
  }

  calculateData(
    name: string,
    title: string,
    entity: string,
    entity_min: string | undefined,
    entity_max: string | undefined,
    setpoint: number | undefined,
    setpoint_step: number | undefined,
    unit: string | undefined,
    icon: string | undefined,
    image_url: string | undefined,
    mode: string | undefined,
    min_limit: number | undefined,
    override_value: string | undefined,
    override: boolean | undefined,
    invalid: boolean | undefined,
    step_low?: number | undefined,
    step_high?: number | undefined,
    last_updated_entity?: string | undefined,
    last_updated_attribute?: string | undefined,
    setpoint_entity?: string | undefined,
    min_limit_entity?: string | undefined,
  ): SensorData {
    const newData: any = {};
    const config = this.getConfig();
    const sensorsRegistry = (this.constructor as typeof MonitorCardBase).SENSORS || {};
    const defaultConfig = getSensorConfig(name, sensorsRegistry);
    const imageBaseUrl = (this.constructor as typeof MonitorCardBase).IMAGE_BASE_URL || '';

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
      newData.not_found = true;
      return newData;
    }

    const entityState = this.hass.states[entity];
    const entityRegistry = this.hass.entities?.[entity];
    const precision =
      entityRegistry?.display_precision ??
      (entityState.attributes as any)?.display_precision ??
      (entityState.attributes as any)?.precision ??
      this.countDecimals(parseFloat(entityState.state));

    const rawValue = parseFloat(entityState.state);
    newData.entity = entity;

    if (isNaN(rawValue)) {
      newData.value = null;
      newData.state = '';
      newData.color = 'var(--disabled-text-color, #bdbdbd)';
      newData.pct = '50';
      newData.pct_min = '50';
      newData.pct_max = '50';
      newData.pct_cursor = '50';
      newData.pct_marker = '50';
      newData.pct_state_step = '50';
      newData.side_align = 'left';
      newData.separator = '';
      newData.unit = '';
      newData.setpoint_class = ['', '', '', '', ''];
      newData.progressClass = '';
      if (config.display.show_last_updated) {
        newData.last_updated = this.resolveLastUpdated(
          entityState,
          last_updated_entity,
          last_updated_attribute,
        );
      }
      return newData;
    }

    newData.value = Number(rawValue.toFixed(precision));

    if (config.display.show_last_updated) {
      newData.last_updated = this.resolveLastUpdated(
        entityState,
        last_updated_entity,
        last_updated_attribute,
      );
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

    // Setpoint calculations — entity overrides static value
    const setpointFromEntity = this.resolveEntityNumber(setpoint_entity);
    const sp_val: number =
      setpointFromEntity != null
        ? setpointFromEntity
        : setpoint != null
          ? parseFloat(String(setpoint))
          : defaultConfig.setpoint != null
            ? parseFloat(String(defaultConfig.setpoint))
            : newData.value;
    const sp_step: number =
      setpoint_step != null
        ? parseFloat(String(setpoint_step))
        : defaultConfig.step != null
          ? parseFloat(String(defaultConfig.step))
          : 0.1;

    // Resolve asymmetric steps: step_low for below setpoint, step_high for above
    const sp_step_low: number =
      step_low != null
        ? parseFloat(String(step_low))
        : defaultConfig.step_low != null
          ? parseFloat(String(defaultConfig.step_low))
          : sp_step;
    const sp_step_high: number =
      step_high != null
        ? parseFloat(String(step_high))
        : defaultConfig.step_high != null
          ? parseFloat(String(defaultConfig.step_high))
          : sp_step;

    const countDecimals = Math.max(
      this.countDecimals(sp_val),
      this.countDecimals(sp_step_low),
      this.countDecimals(sp_step_high),
    );

    newData.setpoint = sp_val;

    // min_limit — entity overrides static value
    const minLimitFromEntity = this.resolveEntityNumber(min_limit_entity);
    const minLimitVal =
      minLimitFromEntity != null
        ? minLimitFromEntity
        : min_limit !== undefined
          ? Number(min_limit)
          : -Infinity;
    const sp_minus_2 = Math.max(minLimitVal, sp_val - 2 * sp_step_low);
    const sp_minus_1 = Math.max(minLimitVal, sp_val - sp_step_low);
    const sp_0 = Math.max(minLimitVal, sp_val);
    const sp_plus_1 = Math.max(minLimitVal, sp_val + sp_step_high);
    const sp_plus_2 = Math.max(minLimitVal, sp_val + 2 * sp_step_high);

    newData.setpoint_class = [
      sp_minus_2.toFixed(countDecimals),
      sp_minus_1.toFixed(countDecimals),
      sp_0.toFixed(countDecimals),
      sp_plus_1.toFixed(countDecimals),
      sp_plus_2.toFixed(countDecimals),
    ];

    newData.separator = config.display.show_labels ? '-' : '';
    newData.color = 'transparent';

    if (newData.value !== null) {
      newData.value = Math.max(minLimitVal, newData.value);
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
        newData.color = config.colors.normal;
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

    // Bar width: 3 steps below setpoint + 3 steps above setpoint
    const barLeft = sp_val - 3 * sp_step_low;
    const barWidth = 3 * sp_step_low + 3 * sp_step_high;

    newData.pct = Math.max(
      0,
      Math.min(98.5, (Math.max(0, newData.value - barLeft) / barWidth) * 0.85 * 100 + 15),
    ).toFixed(0);
    newData.pct_min = Math.max(
      0,
      Math.min(98.5, (Math.max(0, newData.min_value - barLeft) / barWidth) * 0.85 * 100 + 15),
    ).toFixed(0);
    newData.pct_max = Math.max(
      0,
      Math.min(98.5, (Math.max(0, newData.max_value - barLeft) / barWidth) * 0.85 * 100 + 15),
    ).toFixed(0);
    newData.pct_marker = newData.value > newData.setpoint ? newData.pct - 12 : newData.pct - 5;
    newData.side_align = newData.value > sp_val ? 'right' : 'left';
    newData.pct_cursor =
      newData.value > sp_val ? 100 - parseFloat(newData.pct) : parseFloat(newData.pct) - 2;
    newData.pct_state_step =
      newData.value > sp_val ? 105 - parseFloat(newData.pct) : parseFloat(newData.pct) + 5;
    newData.pct_min =
      newData.value > sp_val ? 100 - parseFloat(newData.pct_min) : parseFloat(newData.pct_min) - 2;
    newData.pct_max =
      newData.value > sp_val ? 100 - parseFloat(newData.pct_max) : parseFloat(newData.pct_max) - 2;

    return newData;
  }

  countDecimals(number: number | undefined | null): number {
    if (number === undefined || number === null) return 0;
    if (Math.floor(number) === number) return 0;
    const str = number.toString();
    if (str.includes('.')) return str.split('.')[1].length || 0;
    return 0;
  }

  resolveStatus(): StatusData | null {
    const config = this.getConfig();
    const entityId = config.status_entity;
    if (!entityId) return null;

    const entityState = this.hass?.states?.[entityId];
    if (!entityState) return null;

    const stateVal = entityState.state;
    if (stateVal === 'unavailable' || stateVal === 'unknown') return null;

    const colors = config.colors;
    const friendly_name = (entityState.attributes as any)?.friendly_name;
    const numVal = parseFloat(stateVal);

    // level: 'good' | 'warning' | 'danger' | 'unknown'
    let level: string;

    if (!isNaN(numVal)) {
      // Numeric: 0-33 danger, 34-66 warning, 67-100 good
      level = numVal <= 33 ? 'danger' : numVal <= 66 ? 'warning' : 'good';
    } else {
      const lower = stateVal.toLowerCase();
      const greenStates = ['safe', 'good', 'ok', 'healthy', 'optimal'];
      const orangeStates = ['warning', 'caution', 'moderate'];
      const redStates = ['danger', 'critical', 'bad', 'poor', 'unsafe'];

      if (greenStates.includes(lower)) level = 'good';
      else if (orangeStates.includes(lower)) level = 'warning';
      else if (redStates.includes(lower)) level = 'danger';
      else level = 'unknown';
    }

    const colorMap: Record<string, string> = {
      good: colors.normal,
      warning: colors.low,
      danger: colors.warn,
      unknown: 'var(--disabled-text-color, #bdbdbd)',
    };
    const iconMap: Record<string, string> = {
      good: 'mdi:check-circle',
      warning: 'mdi:alert',
      danger: 'mdi:alert-octagon',
      unknown: 'mdi:help-circle',
    };

    return {
      label: stateVal,
      color: colorMap[level],
      icon: iconMap[level],
      friendly_name,
      entity_id: entityId,
    };
  }

  resolveEntityNumber(entityId?: string): number | null {
    if (!entityId) return null;
    const entityState = this.hass?.states?.[entityId];
    if (!entityState) return null;
    const val = parseFloat(entityState.state);
    return isNaN(val) ? null : val;
  }

  resolveLastUpdated(
    entityState: any,
    last_updated_entity?: string,
    last_updated_attribute?: string,
  ): string {
    // If last_updated_entity is set, read from that entity instead
    const sourceEntity = last_updated_entity
      ? this.hass?.states?.[last_updated_entity]
      : entityState;

    if (!sourceEntity) {
      return this.timeFromNow(entityState.last_updated);
    }

    // If last_updated_attribute is set, read from that attribute
    if (last_updated_attribute) {
      const attrValue = sourceEntity.attributes?.[last_updated_attribute];
      if (attrValue) {
        return this.timeFromNow(String(attrValue));
      }
    }

    return this.timeFromNow(sourceEntity.last_updated);
  }

  timeFromNow(dateTime: string): string {
    const date = new Date(dateTime);
    const diff = Date.now() - date.getTime();

    const t = (key: string, n: number): string => {
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

  getConfig(): CardConfig {
    return this.config;
  }

  setConfig(config: any): void {
    const sensorsRegistry = (this.constructor as typeof MonitorCardBase).SENSORS || {};
    const supportedSensors = Object.keys(sensorsRegistry);

    const defaultConfig = {
      display: getDisplayConfig(),
      colors: getColorConfig(),
    };

    const newConfig: CardConfig = {
      ...config,
      status_entity: config.status_entity,
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

    Object.entries(config.sensors).forEach(([sensorType, sensorConfig]: [string, any]) => {
      const defaultSensorConfig = sensorsRegistry[sensorType] || {};
      const sensorArray = Array.isArray(sensorConfig) ? [...sensorConfig] : [{ ...sensorConfig }];

      if (sensorArray.length === 0) {
        throw new Error(`Empty sensor array for ${sensorType}`);
      }

      const mergedSensorArray = sensorArray.map((sensor: any) => ({
        ...defaultSensorConfig,
        ...sensor,
        nameDefinedByUser: !!sensor.name,
      }));

      mergedSensorArray.forEach((sensor: any, index: number) => {
        if (!sensor.entity) {
          throw new Error(`Missing entity for ${sensorType}[${index}]`);
        }
        if (sensor.nameDefinedByUser) {
          sensor.title = sensor.name;
        }
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
