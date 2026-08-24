import { LitElement, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { getTranslation, formatTranslation } from './locales/translations.js';
import { styles } from './styles/styles.js';
import { cardContent } from './components/card-content.js';
import { getDisplayConfig, getColorConfig, getSensorConfig } from './configs/config.js';
import { computeTrend, trendLabelKey } from './trend.js';
import { hasScale, outOfScale, overflowLabelKey } from './scale.js';
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
            <span>${this.warning('no_sensors')}</span>
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
                <span>${this.warning('not_supported', { name: sensorData?.name })}</span>
              </div>
            `;
          } else if (sensorData?.not_found) {
            return html`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${this.warning('not_found', { entity: sensorData?.entity })}</span>
              </div>
            `;
          } else if (sensorData?.no_scale) {
            // Third of the three banners, and it sits here for the same reason
            // as the other two: written once, before the layout is chosen, so
            // the full and compact bodies cannot disagree about it.
            return html`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${this.warning('no_scale', { name: sensorData?.name })}</span>
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

  /**
   * The text of a warning banner, in the card's language.
   *
   * A warning is not an editor label. An editor label is read by whoever chose
   * to open the editor, and may fall back to English while a translation
   * catches up; a warning is painted at the moment a configuration is refused,
   * which is exactly when the reader needs to understand. So every locale
   * carries every one of these, and `warning-messages.test.js` is red if one
   * is missing.
   *
   * The message is a sentence with `{placeholders}`, and each one is one of two
   * things:
   *
   * - a value this call supplies, an entity id or a sensor name, printed as it
   *   stands;
   * - anything else, which is a YAML option name and is printed as code. It
   *   stays a placeholder rather than being written into the sentence so that
   *   no translation can turn `limits` into a word Home Assistant will not
   *   accept, and so `translations.test.js` checks every locale still carries
   *   all of them.
   *
   * Both go inside a `<bdi>`. They are Latin runs, the sentence around them may
   * be Hebrew, and an unisolated Latin run drags the punctuation next to it to
   * the wrong side (`right-to-left.test.js`).
   */
  warning(key: string, values: Record<string, string | undefined> = {}): unknown[] {
    const unknown = this.getTranslatedText('warning.unknown');
    return this.getTranslatedText(`warning.${key}`)
      .split(/\{(\w+)\}/)
      .map((part, i) => {
        if (i % 2 === 0) return part;
        return part in values
          ? html`<bdi>${values[part] || unknown}</bdi>`
          : html`<bdi><code>${part}</code></bdi>`;
      });
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
    const entitySource = attribute
      ? ((entityState.attributes as any)?.[attribute] as string)
      : entityState.state;

    /**
     * The text an `override` puts in place of the reading, `undefined` when
     * there is none.
     *
     * It is resolved here, before anything is parsed, and that position is the
     * whole fix of #145. The assignment used to sit forty lines below, after
     * the numeric pipeline had already run on the entity's own state, so the
     * word was spliced into a field the rest of the function believed to hold
     * a number. `Math.max(min_limit, 'OFF')` then coerced it to `NaN`, and
     * that `NaN` travelled: the row painted the six letters `NaN` instead of
     * the word, every `left:` and `transform:` on the row resolved to `NaN%`,
     * and on a monotonic scale every `NaN < limit` comparison being false made
     * `findIndex` return -1, which is the index of the worst band, so the word
     * arrived classified `Very Poor` in the hazardous colour.
     *
     * Treating it as the source instead means a non-numeric override takes the
     * branch the card already has for a reading that is not a number, the one
     * an entity in `unavailable` takes. Nothing new is invented: the row is
     * grey, centred on its bar, in no band, and it carries the word rather
     * than a comma. A numeric override still parses and is still placed on the
     * scale, which is the only behaviour of this option that ever worked.
     */
    const overrideText = override ? override_value || defaultConfig.override || '' : undefined;
    const rawSource = overrideText !== undefined ? overrideText : entitySource;

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
      // The word survives here and nowhere else. `null` is what an entity with
      // nothing readable leaves, and the row renders a comma for it; an
      // `override` was asked for by name, so it shows the name it was given.
      newData.value = overrideText ? overrideText : null;
      newData.state = '';
      // Stated rather than left absent. A reading that is not a number is in
      // no band, so it cannot be in the worst one, and the two layouts read
      // this field without asking whether it was ever assigned.
      newData.blink = false;
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

    // Nothing below this line can run without a reference, so the sensor stops
    // here when it has none (#98). The fallback three lines down used to end
    // on `newData.value`: with no limits and no setpoint, the reading became
    // its own setpoint, the five bands closed around it, and it landed in the
    // middle of them by construction. 1, 12 and 500 µg/m³ all read "Ideal", in
    // green. The card did not fail, it reassured.
    //
    // Refusing costs a bar that used to be drawn, for someone who asked for
    // nothing. It is deliberately the smallest refusal that removes the
    // verdict: this one sensor, told the way a missing entity is already told,
    // while the rest of the card keeps rendering. Announcing the value with no
    // colour and no state was the alternative, and it needed a sixth rendering
    // path written twice, full and compact, to say less.
    if (!hasScale(limits, setpointFromEntity, setpoint, defaultConfig.setpoint)) {
      newData.no_scale = true;
      return newData;
    }

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

    // Whether the reading sits in the worst band its own scale defines.
    //
    // Set inside the branches below rather than recomputed after them, which is
    // the only way it cannot drift from the colour and the label: the same
    // comparison that paints the band raises the flag. A second pass over
    // `setpoint_class` would be a copy of the arithmetic, and the day one side
    // gained a boundary rule the other would keep the old one silently.
    //
    // What counts as "worst" is read off each scale rather than decided here:
    //
    // - Monotonic: the end the ramp paints `hazardous`. It is the top band on
    //   a pollutant and the bottom one on ORP, and `direction` has already
    //   reversed the ramp, so the index is simply the last one.
    // - Centric: the two outer bands, the ones the card already calls Too Low
    //   and Too High and already paints `warn`. Both, because a centric scale
    //   is bad outwards in both directions by construction.
    // - Heatflow: never. Its three states are cool, normal and warm, a
    //   direction of flow rather than a severity, and calling one of them
    //   grave would be inventing a verdict the scale does not carry.
    let worstBand = false;

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
      // Read off `labels`, not off `idx`. The two arrays are reversed together
      // for `higher_is_better`, so the worst band moves to index 0 there while
      // keeping its name: `idx === 4` would have blinked on perfectly good
      // water every time a pool ORP sensor was configured. `band.5` is the
      // hazardous end of the ramp in both directions, by construction.
      worstBand = labels[idx] === 'band.5';
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
        worstBand = true;
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
        worstBand = true;
      }
    }

    // The fact meets the option, once, here. Both layouts then read one field
    // instead of each recombining the two, which is how a rendering fix comes
    // to be applied to the full layout and forgotten on the compact one.
    //
    // The finiteness check is not belt and braces. An `override` replaces the
    // reading with a word, and on a monotonic scale every `NaN < limit`
    // comparison is false, so `findIndex` returns -1 and the word lands in the
    // worst band with the label and the colour to match. That misclassification
    // predates this option and is left alone here (#123 is about the blink);
    // what is refused is a card that blinks at somebody because their pump is
    // reading "OFF".
    newData.blink =
      worstBand && config.display.blink === true && Number.isFinite(Number(newData.value));

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

    // What the clamp above destroys, recorded before anything reads the ratio.
    // Once `toRatio` has returned 1, nothing downstream can tell a value that
    // just crossed the last threshold from one ten times past it (#62). The
    // geometry stays put, by PO decision of 2026-08-22, so the overflow is
    // marked instead: `card-content.ts` puts a small triangle pointing off the
    // end of the scale in the value bubble, with a spoken form beside it.
    const overflow = outOfScale(newData.value, barLeft, barRight);
    newData.out_of_scale = overflow;
    const overflowKey = overflowLabelKey(overflow);
    newData.out_of_scale_label = overflowKey ? this.getTranslatedText(overflowKey) : '';
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

    // A monotonic bar changes colour ON its thresholds, not around them. Each
    // band is painted flat from its own limit to the next, so the boundary the
    // numbers announce is the boundary the eye sees.
    //
    // It used to be one colour stop per limit, which CSS interpolates: a band
    // wore its own colour on the single pixel of its left edge and spent the
    // rest of its width fading into the next one. The bar therefore disagreed
    // with the badge everywhere except exactly on the five stops, and the
    // colour a reader associates with "bad" appeared well past the limit that
    // defines it. Forks compensated by moving the limits themselves down
    // (wilsto/air-quality-card#4: "the baseline was set to 800 because of how
    // the color gradient is implemented (...) this applied to all sensor
    // limits"), which turns a published guideline value into an undocumented
    // display offset and makes every future source have to be deformed the
    // same way by hand. Fixing the rendering once lets a limit stay the
    // published number.
    //
    // Centric and heatflow scales keep their own gradient untouched.
    if (monotonicRamp) {
      // Five bands, six edges: the bar's left end, the four limits, the right
      // end. The last band opens at the highest limit and runs off the scale,
      // so it is pinned to 100%.
      const edges = [0, ...newData.label_positions.slice(1), 100];
      newData.monotonic_stops = monotonicRamp
        .map((colour, i) => `${colour} ${edges[i]}%, ${colour} ${edges[i + 1]}%`)
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
   *
   * `status_entity` never restricted the domain, so a window, a fan, a purifier
   * or a pump could always be pointed at it. What came out was unusable
   * (monitor-cards#61): the badge read `on`, in English, in a French Home
   * Assistant, grey and wearing a question mark. Two things were wrong there,
   * and only one of them was the wording.
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

    // level: 'good' | 'warning' | 'danger' | 'active' | 'inactive' | 'unknown'
    let level: string;

    if (!isNaN(numVal)) {
      // Numeric: 0-33 danger, 34-66 warning, 67-100 good
      level = numVal <= 33 ? 'danger' : numVal <= 66 ? 'warning' : 'good';
    } else {
      const lower = stateVal.toLowerCase();
      const greenStates = ['safe', 'good', 'ok', 'healthy', 'optimal', 'green', 'normal'];
      const orangeStates = ['warning', 'caution', 'moderate', 'yellow'];
      const redStates = ['danger', 'critical', 'bad', 'poor', 'unsafe', 'red', 'high', 'low'];
      // An open window is not a verdict. It is neither good nor bad, and the
      // card has no way to know which: at 400 ppm an open window is a draught,
      // at 1500 ppm it is the fix. So these states get their own level rather
      // than a colour that judges them, and rather than `unknown`, which says
      // the card did not recognise the word. It recognised it perfectly.
      const activeStates = ['on', 'open', 'opening'];
      const inactiveStates = ['off', 'closed', 'closing'];

      if (greenStates.includes(lower)) level = 'good';
      else if (orangeStates.includes(lower)) level = 'warning';
      else if (redStates.includes(lower)) level = 'danger';
      else if (activeStates.includes(lower)) level = 'active';
      else if (inactiveStates.includes(lower)) level = 'inactive';
      else level = 'unknown';
    }

    const colorMap: Record<string, string> = {
      good: colors.normal,
      warning: colors.low,
      danger: colors.warn,
      // Theme tokens, not colours of ours, so the badge follows whatever the
      // user picked. The accent rather than `--state-active-color`: measured on
      // the bench, that token is amber in the default theme, which lands right
      // between this card's yellow and its orange and reads as a caution. The
      // accent is the one colour on the card that cannot be mistaken for a
      // verdict, which is the whole point of these two levels.
      active: 'var(--primary-color, #03a9f4)',
      inactive: 'var(--state-inactive-color, var(--secondary-text-color, #6f6f6f))',
      unknown: 'var(--disabled-text-color, #bdbdbd)',
    };
    const iconMap: Record<string, string> = {
      good: 'mdi:check-circle',
      warning: 'mdi:alert',
      danger: 'mdi:alert-octagon',
      // No icon, unless the entity carries one of its own. A question mark on a
      // window says the card is confused; a hard-coded `mdi:window-open` would
      // be a table to grow one appliance at a time, which is the trap the fork
      // this came from fell into. The text alone is legible, and a user who
      // wants a glyph sets `icon:` on the entity, where Home Assistant already
      // reads it.
      active: '',
      inactive: '',
      unknown: 'mdi:help-circle',
    };
    // Only the two new levels read it. A verdict badge keeps its check mark or
    // its octagon whatever icon the entity carries: that shape is the card
    // speaking, not the entity.
    const ownIcon =
      level === 'active' || level === 'inactive'
        ? (entityState.attributes as any)?.icon
        : undefined;

    return {
      // Home Assistant already translates entity states, per device class, in
      // every language it ships: `on` is Ouvert on a window and Allumé on a
      // fan. Rewriting that into seventeen locale files would be both a worse
      // table and a shorter one. Older frontends have no `formatEntityState`,
      // and they keep exactly today's raw state.
      //
      // Numbers stay untouched on purpose: a WaterGuru score of 85 reads 85,
      // not "85 %", and that is what it has always read.
      label:
        isNaN(numVal) && this.hass?.formatEntityState
          ? this.hass.formatEntityState(entityState)
          : stateVal,
      color: colorMap[level],
      icon: ownIcon || iconMap[level],
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
