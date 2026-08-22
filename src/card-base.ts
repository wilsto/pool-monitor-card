import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { getTranslation, formatTranslation } from './locales/translations.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';
import { getDisplayConfig, getColorConfig, getSensorConfig } from './configs/config.js';
import { computeTrend, trendLabelKey } from './trend.js';
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
    const cardBattery = this.resolveCardBattery();
    const generateContent = config.display.compact
      ? cardContent.generateCompactBody
      : cardContent.generateBody;

    if (!data || Object.keys(data).length === 0) {
      return html` <ha-card
        ><div id="pool-monitor-card">
          <div class="warning-message">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>No valid sensor data available</span>
          </div>
        </div></ha-card
      >`;
    }

    return html` <ha-card
      ><div id="pool-monitor-card">
        ${cardContent.generateTitle(config)}
        ${status
          ? cardContent.generateStatusBadge(status, cardBattery)
          : cardBattery
            ? html`<div class="status-container">
                ${cardContent.generateCardBattery(cardBattery)}
              </div>`
            : ''}
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
      </div></ha-card
    >`;
  }

  getCardSize(): number {
    if (!this.config?.sensors) return 3;
    const sensorCount = Object.values(this.config.sensors).reduce(
      (count: number, s: unknown) => count + (Array.isArray(s) ? s.length : 1),
      0,
    );
    const compact = this.config?.display?.compact;
    const titleRows = this.config?.title ? 1 : 0;
    return titleRows + sensorCount * (compact ? 2 : 3);
  }

  getGridOptions(): { rows: number; min_rows: number; columns: number; min_columns: number } {
    const size = this.getCardSize();
    return {
      rows: size,
      min_rows: Math.max(2, Math.ceil(size / 2)),
      columns: 12,
      min_columns: 6,
    };
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
          sensor.title || this.sensorName(sensorType),
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
          sensor.limits,
          sensor.direction,
          sensor.attribute,
        );

        if (sensor.availability_entity) {
          const availState = this.hass?.states?.[sensor.availability_entity]?.state;
          data[sensorKey].disabled = availState === 'off' || availState === 'unavailable';
        }

        // Rise and fall indicator, @arketec's design (see src/trend.ts).
        // Resolved here rather than inside calculateData, which already takes
        // twenty-three positional arguments; availability, battery and status
        // are attached the same way.
        const trend = computeTrend(
          this.resolveEntityNumber(sensor.derivative_entity),
          sensor.derivative_scale,
        );
        data[sensorKey].trend = trend;
        const labelKey = trendLabelKey(trend);
        data[sensorKey].trend_label = labelKey ? this.getTranslatedText(labelKey) : '';

        if (sensor.battery_entity) {
          const battery = this.resolveBattery(sensor.battery_entity);
          data[sensorKey].battery_level = battery.level;
          data[sensorKey].battery_icon = battery.icon;
          data[sensorKey].battery_color = battery.color;
        }

        // A status published for this measurement alone. WaterGuru gives one
        // per reading (HIGH, LOW, Ok), which the card could only show for the
        // whole device before. Same resolution as the card-level badge, so the
        // two cannot disagree on what "HIGH" means.
        data[sensorKey].status = sensor.status_entity
          ? this.resolveStatus(sensor.status_entity)
          : null;
      });
    });

    return data;
  }

  /**
   * The name to write under the bar for a preset.
   *
   * The names table is shared by the four cards, and it is right to be: of the
   * forty-three presets, thirty-one belong to a single card and most of the
   * rest mean the same thing everywhere. `pressure` does not. It is the filter
   * on a pool and the weather on an air monitor, so whichever card wrote the
   * entry named it for the other one too.
   *
   * A card may therefore keep its own name for a preset, under its own key in
   * the table. The key the user writes in YAML is not involved: it still finds
   * the preset the same way, with the same unit and the same ideal value. Only
   * the label changes.
   */
  sensorName(sensorType: string): string {
    const card = (this.constructor as typeof MonitorCardBase).CARD_INFO?.cardType;
    const own = `sensor.${card}.${sensorType}`;
    const name = card ? this.getTranslatedText(own) : own;
    // getTranslation hands back the key itself when nothing answers to it
    return name === own ? this.getTranslatedText(`sensor.${sensorType}`) : name;
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
    entity_min: string | number | undefined,
    entity_max: string | number | undefined,
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
    limits?: number[] | undefined,
    direction?: 'lower_is_better' | 'higher_is_better' | undefined,
    attribute?: string | undefined,
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
    // A reading may live on an attribute rather than the state: several
    // integrations publish more than one measurement per entity, and today each
    // one needs a template sensor just to be displayed (sensor-monitor-card#3).
    // A missing attribute reads as no value, not as the state, which would show
    // an unrelated number as if it were the one asked for.
    const rawSource = attribute
      ? ((entityState.attributes as any)?.[attribute] as string)
      : entityState.state;

    // Decimals are counted on whatever actually supplies the number. Reading
    // them from the state while the value comes from an attribute is how a
    // climate entity, whose state is the word "heat", made 20.5 render as 21:
    // parseFloat("heat") is NaN, NaN has no decimals, so the value was rounded
    // to the nearest integer without anything saying so.
    const precision =
      entityRegistry?.display_precision ??
      (entityState.attributes as any)?.display_precision ??
      (entityState.attributes as any)?.precision ??
      this.countDecimals(parseFloat(rawSource));

    const rawValue = parseFloat(rawSource);
    newData.entity = entity;

    if (isNaN(rawValue)) {
      newData.value = null;
      newData.state = '';
      newData.color = 'var(--disabled-text-color, #bdbdbd)';
      newData.pct = '50';
      newData.pct_min = '50';
      newData.pct_max = '50';
      newData.pct_cursor = '50';
      newData.pct_marker = 50;
      newData.pct_state_step = '50';
      newData.side_align = 'left';
      newData.separator = '';
      newData.unit = '';
      newData.setpoint_class = ['', '', '', '', ''];
      newData.label_positions = [50, 50, 50, 50, 50];
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

    // `min` and `max` accept two forms and the type decides, PO decision
    // 2026-08-15 (#5). A number is a scale boundary, which is what the README
    // has always documented; a string is a tracking entity placing a marker on
    // the bar. Before this, a number was resolved as an entity id, matched
    // nothing, and silently fell back to the current value.
    const asBound = (v: string | number | undefined): number | undefined =>
      typeof v === 'number' && !isNaN(v) ? v : undefined;
    const asEntity = (v: string | number | undefined): string | undefined =>
      typeof v === 'string' && v !== '' ? v : undefined;

    const boundMin = asBound(entity_min);
    const boundMax = asBound(entity_max);
    const trackMin = asEntity(entity_min);
    const trackMax = asEntity(entity_max);

    // Markers: entity form only. A boundary is not an observation.
    newData.min_value =
      trackMin !== undefined &&
      this.hass.states[trackMin] &&
      !isNaN(parseFloat(this.hass.states[trackMin].state))
        ? parseFloat(this.hass.states[trackMin].state)
        : newData.value;

    newData.max_value =
      trackMax !== undefined &&
      this.hass.states[trackMax] &&
      !isNaN(parseFloat(this.hass.states[trackMax].state))
        ? parseFloat(this.hass.states[trackMax].state)
        : newData.value;

    // Setpoint calculations, entity overrides static value
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

    const useLimits = Array.isArray(limits) && limits.length === 4;
    const resolvedLimits = (limits || []).map(Number);

    // Decimals follow whatever actually drives the scale: the limits when they
    // are given, the setpoint and steps otherwise. Reading them from an ignored
    // setpoint produced labels like "0.0" for an integer boundary.
    const countDecimals = useLimits
      ? Math.max(...resolvedLimits.map(l => this.countDecimals(l)), 0)
      : Math.max(
          this.countDecimals(sp_val),
          this.countDecimals(sp_step_low),
          this.countDecimals(sp_step_high),
        );

    newData.setpoint = sp_val;

    // min_limit, entity overrides static value
    const minLimitFromEntity = this.resolveEntityNumber(min_limit_entity);
    const minLimitVal =
      minLimitFromEntity != null
        ? minLimitFromEntity
        : min_limit !== undefined
          ? Number(min_limit)
          : -Infinity;
    // Explicit boundaries win over the setpoint computation, PO decision
    // 2026-08-15 (#7). Approach adapted from @rpirsc13
    // (wilsto/air-quality-card#4): reuse the existing five-class mechanism and
    // only change how the five numbers are filled, rather than adding a
    // parallel rendering path.
    const sp_minus_2 = useLimits
      ? Math.max(minLimitVal, boundMin != null ? boundMin : 0)
      : Math.max(minLimitVal, sp_val - 2 * sp_step_low);
    const sp_minus_1 = useLimits
      ? Math.max(minLimitVal, resolvedLimits[0])
      : Math.max(minLimitVal, sp_val - sp_step_low);
    const sp_0 = useLimits
      ? Math.max(minLimitVal, resolvedLimits[1])
      : Math.max(minLimitVal, sp_val);
    const sp_plus_1 = useLimits
      ? Math.max(minLimitVal, resolvedLimits[2])
      : Math.max(minLimitVal, sp_val + sp_step_high);
    const sp_plus_2 = useLimits
      ? Math.max(minLimitVal, resolvedLimits[3])
      : Math.max(minLimitVal, sp_val + 2 * sp_step_high);

    newData.setpoint_class = [
      sp_minus_2.toFixed(countDecimals),
      sp_minus_1.toFixed(countDecimals),
      sp_0.toFixed(countDecimals),
      sp_plus_1.toFixed(countDecimals),
      sp_plus_2.toFixed(countDecimals),
    ];

    newData.separator = config.display.show_labels ? '-' : '';
    newData.color = 'transparent';

    // Held outside the branch below so the bar can be painted with the very
    // colours the reading is classified against, one ramp, not two that drift.
    let monotonicRamp: string[] | null = null;

    if (newData.value !== null) {
      newData.value = Math.max(minLimitVal, newData.value);
    }

    if (useLimits) {
      // Monotonic ramp. lower_is_better is the default: it fits pollutants
      // (PM2.5, CO2, VOC). higher_is_better covers ORP (pool-monitor-card#85),
      // which the original 'quality' mode could not express.
      //
      // The colours run good to bad, and never start on `cool`: blue at the
      // clean end of a pollutant scale reads as a fault, which is how carbon
      // monoxide came to announce 3 ppm of perfectly good air as "Too Low".
      //
      // The band names are the European Air Quality Index ones, good, fair,
      // moderate, poor, very poor, rather than the centric vocabulary, whose
      // middle band is by construction the ideal. On a monotonic scale the
      // middle band is already an exceedance: CO at 20 ppm was announced as
      // "Ideal", more than twice the WHO eight-hour guideline.
      monotonicRamp = [
        config.colors.normal,
        config.colors.fair,
        config.colors.low,
        config.colors.warn,
        config.colors.hazardous,
      ];
      const labels = ['band.1', 'band.2', 'band.3', 'band.4', 'band.5'];
      if (direction === 'higher_is_better') {
        monotonicRamp.reverse();
        labels.reverse();
      }
      const v = Number(newData.value);
      const band = [1, 2, 3, 4].findIndex(i => v < Number(newData.setpoint_class[i]));
      const idx = band === -1 ? 4 : band;
      newData.color = monotonicRamp[idx];
      newData.state = config.display.show_labels ? this.getTranslatedText(labels[idx]) : '';
    } else if (mode === 'heatflow') {
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

    // Bar range, in order of precedence:
    //   1. explicit numeric min/max
    //   2. the limits themselves, when a sensor is driven by them
    //   3. the setpoint, three steps either side
    //
    // Step 2 exists because a preset may carry limits and nothing else, carbon
    // monoxide has published thresholds and no meaningful setpoint. Deriving the
    // range from an absent setpoint gave a zero-width bar and stacked all five
    // labels on top of each other at 100%. Every earlier test passed min and max
    // explicitly, so none of them saw it; it took looking at the rendered card.
    const barLeft = boundMin != null ? boundMin : useLimits ? sp_minus_2 : sp_val - 3 * sp_step_low;
    const barRight =
      boundMax != null ? boundMax : useLimits ? sp_plus_2 : sp_val + 3 * sp_step_high;
    const barWidth = barRight - barLeft;
    newData.bar_min = barLeft;
    newData.bar_max = barRight;

    // Unified ratio formula: maps value to [0, 1] within the bar range
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const toRatio = (v: number) => (barWidth > 0 ? clamp01((v - barLeft) / barWidth) : 0);

    const ratio = toRatio(newData.value);
    newData.pct = (ratio * 100).toFixed(1);
    newData.pct_marker = ratio * 100;
    newData.side_align = newData.value > sp_val ? 'right' : 'left';
    newData.pct_cursor = newData.value > sp_val ? 100 - ratio * 100 : ratio * 100;
    newData.pct_state_step = newData.value > sp_val ? 100 - ratio * 100 + 1 : ratio * 100 + 1;
    const ratioMinVal = toRatio(newData.min_value) * 100;
    const ratioMaxVal = toRatio(newData.max_value) * 100;
    newData.pct_min = newData.value > sp_val ? 100 - ratioMinVal : ratioMinVal;
    newData.pct_max = newData.value > sp_val ? 100 - ratioMaxVal : ratioMaxVal;

    // Label positions: same formula applied to each label value
    newData.label_positions = [
      toRatio(sp_minus_2) * 100,
      toRatio(sp_minus_1) * 100,
      toRatio(sp_0) * 100,
      toRatio(sp_plus_1) * 100,
      toRatio(sp_plus_2) * 100,
    ];

    // A monotonic bar changes colour on its thresholds rather than in fixed
    // proportions, so the eye lands on the same boundary the numbers announce.
    // Centric and heatflow scales keep their own gradient untouched.
    if (monotonicRamp) {
      newData.monotonic_stops = monotonicRamp
        .map((colour, i) => `${colour} ${newData.label_positions[i]}%`)
        .join(', ');
    }

    return newData;
  }

  countDecimals(number: number | undefined | null): number {
    if (number === undefined || number === null) return 0;
    if (Math.floor(number) === number) return 0;
    const str = number.toString();
    if (str.includes('.')) return str.split('.')[1].length || 0;
    return 0;
  }

  /**
   * Battery level, icon and colour for one entity.
   *
   * Pulled out of the per-sensor loop so the card-level battery uses the very
   * same thresholds: a WaterGuru takes every measurement on one battery, and
   * two readings of the same battery must not disagree on whether it is low.
   */
  resolveBattery(entityId: string): { level: number | null; icon: string; color: string } {
    const unknown = {
      level: null,
      icon: 'mdi:battery-unknown',
      color: 'var(--disabled-text-color, #bdbdbd)',
    };
    const state = this.hass?.states?.[entityId];
    if (!state || state.state === 'unavailable' || state.state === 'unknown') return unknown;

    const level = parseFloat(state.state);
    if (isNaN(level)) return unknown;

    return {
      level,
      icon: level > 50 ? 'mdi:battery' : level >= 20 ? 'mdi:battery-50' : 'mdi:battery-20',
      color:
        level > 50
          ? 'var(--state-sensor-battery-high-color, #4caf50)'
          : level >= 20
            ? 'var(--state-sensor-battery-medium-color, #ff9800)'
            : 'var(--state-sensor-battery-low-color, #f44336)',
    };
  }

  /** The card's own battery, when the device has a single one. */
  resolveCardBattery(): { level: number | null; icon: string; color: string } | null {
    const entityId = this.getConfig().battery_entity;
    return entityId ? this.resolveBattery(entityId) : null;
  }

  /**
   * Turns a status entity into a badge.
   *
   * Takes the entity id so the same mapping serves the card header and each
   * individual measurement: a device that says "HIGH" means the same thing
   * wherever it is shown.
   */
  resolveStatus(entityId?: string): StatusData | null {
    const config = this.getConfig();
    const id = entityId ?? config.status_entity;
    if (!id) return null;

    const entityState = this.hass?.states?.[id];
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
      const greenStates = ['safe', 'good', 'ok', 'healthy', 'optimal', 'green', 'normal'];
      const orangeStates = ['warning', 'caution', 'moderate', 'yellow'];
      const redStates = ['danger', 'critical', 'bad', 'poor', 'unsafe', 'red', 'high', 'low'];

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
      entity_id: id,
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

/**
 * Registers a card, tolerating a name already taken by another HACS card.
 *
 * `@customElement` defines the element at module evaluation and throws a
 * DOMException if the name exists, which kills the whole module, not just the
 * registration. Measured on wilsto/air-quality-card#3: another card publishes
 * the same `air-quality-card` element name, so whichever loads second dies
 * outright rather than merely failing to render.
 *
 * We do not rename: that would break every existing configuration for a case
 * that only affects users who installed both. We do refuse to take the page
 * down over it, and we say why in the console instead of failing mutely.
 *
 * The same guard already protects `monitor-sensor-editor`.
 */
export function defineCard(name: string, ctor: CustomElementConstructor): void {
  if (customElements.get(name)) {
    console.warn(
      `[${name}] another custom card already registered this element name, so this one ` +
        `will not render. Both cannot coexist, keep the one you want and remove the other.`,
    );
    return;
  }
  customElements.define(name, ctor);
}
