import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, SensorsRegistry, SensorUserConfig } from '../ha/types.js';
import { editorText } from './editor-i18n.js';

/**
 * Entity domains offered by the pickers. Without them the availability picker
 * lists every entity in the house, which is how a dropdown becomes useless.
 */
const NUMERIC = ['input_number', 'number', 'sensor'];
const AVAILABILITY = ['binary_sensor', 'switch', 'input_boolean'];
import { editorStyles } from './editor-styles.js';

interface ExpandedState {
  [key: string]: boolean; // "type" or "type-index" → expanded
}

export class MonitorSensorEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) sensors: Record<string, SensorUserConfig | SensorUserConfig[]> =
    {};
  @property({ attribute: false }) registry: SensorsRegistry = {};
  @property({ type: Boolean }) freeform = false;

  /** Editor labels follow the Home Assistant language, see editor-i18n. */
  private t(key: string): string {
    return editorText(this.hass, key);
  }

  @state() private _expanded: ExpandedState = {};
  @state() private _newSensorType = '';

  static styles = editorStyles;

  protected render(): TemplateResult {
    const sensorEntries = Object.entries(this.sensors);

    return html`
      <div class="sensor-list">
        ${sensorEntries.length === 0
          ? html`<div class="empty-message">No sensors configured. Add one below.</div>`
          : sensorEntries.map(([type, config]) => this._renderSensorType(type, config))}
        ${this._renderAddSensor()}
      </div>
    `;
  }

  /**
   * Native text field. Home Assistant removed `ha-textfield` in 2026.5 and
   * states that custom cards should not rely on its internal components, so
   * the editor renders its own input rather than tracking the next one.
   */
  private _textField(opts: {
    label: string;
    value: string;
    numeric?: boolean;
    live?: boolean;
    onChange: (value: string) => void;
  }): TemplateResult {
    const handle = (e: Event) => opts.onChange((e.target as HTMLInputElement).value);
    const type = opts.numeric ? 'number' : 'text';
    return html`
      <label class="text-field">
        <span class="text-field-label">${opts.label}</span>
        ${opts.live
          ? html`<input
              class="text-field-input"
              type=${type}
              .value=${opts.value}
              @input=${handle}
            />`
          : html`<input
              class="text-field-input"
              type=${type}
              .value=${opts.value}
              @change=${handle}
            />`}
      </label>
    `;
  }

  private _renderSensorType(
    type: string,
    config: SensorUserConfig | SensorUserConfig[],
  ): TemplateResult {
    if (Array.isArray(config)) {
      return html`${config.map((c, i) => this._renderSensorRow(type, c, i, config.length > 1))}`;
    }
    return this._renderSensorRow(type, config, 0, false);
  }

  private _renderSensorRow(
    type: string,
    config: SensorUserConfig,
    index: number,
    isArray: boolean,
  ): TemplateResult {
    const key = isArray ? `${type}-${index}` : type;
    const expanded = this._expanded[key] || false;
    const preset = this.registry[type];
    const displayName = preset?.name || type;
    const label = isArray ? `${displayName} #${index + 1}` : displayName;

    return html`
      <div class="sensor-row">
        <div class="sensor-row-header" @click=${() => this._toggleExpand(key)}>
          <div class="sensor-row-title">
            <ha-icon icon=${expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}></ha-icon>
            <span>${label}</span>
            ${config.entity
              ? html`<span
                  style="color: var(--secondary-text-color); font-weight: normal; font-size: 12px;"
                  >${config.entity}</span
                >`
              : nothing}
          </div>
          <div class="sensor-row-actions">
            <ha-icon-button
              class="delete-btn"
              .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
              @click=${(e: Event) => {
                e.stopPropagation();
                this._removeSensor(type, index);
              }}
            ></ha-icon-button>
          </div>
        </div>
        ${expanded ? this._renderSensorFields(type, config, index) : nothing}
      </div>
    `;
  }

  /**
   * One collapsible group of fields.
   *
   * `<details>` rather than Home Assistant's expansion panel: the editor was
   * already broken once by an internal component being removed, and this needs
   * no dependency at all. The summary carries what the group is for and where
   * its values come from, because the question a user actually has is not
   * "which fields exist" but "do I have anything to do here".
   */
  private _section(opts: {
    label: string;
    summary: string;
    open?: boolean;
    body: TemplateResult;
  }): TemplateResult {
    return html`
      <details class="sensor-section" ?open=${opts.open}>
        <summary class="sensor-section-head">
          <span class="sensor-section-name">${opts.label}</span>
          <span class="sensor-section-sub">${opts.summary}</span>
        </summary>
        <div class="sensor-section-body">${opts.body}</div>
      </details>
    `;
  }

  /** "3 changed", or what the group falls back to when nothing was overridden. */
  private _summary(config: SensorUserConfig, keys: string[], fallback: string): string {
    const count = keys.filter(
      k => (config as unknown as Record<string, unknown>)[k] !== undefined,
    ).length;
    if (!count) return fallback;
    return this.t('values_changed').replace('{count}', String(count));
  }

  private _numberField(
    label: string,
    type: string,
    index: number,
    field: string,
    config: SensorUserConfig,
  ): TemplateResult {
    const current = (config as unknown as Record<string, unknown>)[field];
    return this._textField({
      label,
      value: current != null ? String(current) : '',
      numeric: true,
      onChange: v => this._updateField(type, index, field, v === '' ? undefined : Number(v)),
    });
  }

  private _entityField(
    label: string,
    type: string,
    index: number,
    field: string,
    config: SensorUserConfig,
    domains?: string[],
  ): TemplateResult {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${((config as unknown as Record<string, unknown>)[field] as string) || ''}
        .label=${label}
        .includeDomains=${domains}
        allow-custom-entity
        @value-changed=${(e: CustomEvent) =>
          this._updateField(type, index, field, e.detail.value || undefined)}
      ></ha-entity-picker>
    `;
  }

  /**
   * Scale bands come either from a setpoint or from explicit limits, and the
   * two are exclusive: `limits` wins and the setpoint is ignored without a
   * word. That was invisible while both sat in the same flat list, so the
   * choice is now made explicitly and only the relevant fields are shown.
   */
  private _renderScale(type: string, config: SensorUserConfig, index: number): TemplateResult {
    const usesLimits = Array.isArray(config.limits) && config.limits.length === 4;
    const preset = this.registry[type] || {};
    const inherited =
      preset.setpoint != null
        ? `${this.t('setpoint')} ${preset.setpoint} (${this.t('inherited')})`
        : this.t('scale_hint_setpoint');

    const setMode = (value: string) => {
      if (value === 'limits') {
        const base =
          preset.limits && preset.limits.length === 4 ? [...preset.limits] : [0, 0, 0, 0];
        this._updateField(type, index, 'limits', base);
      } else {
        this._updateField(type, index, 'limits', undefined);
        this._updateField(type, index, 'direction', undefined);
      }
    };

    const limit = (slot: number) =>
      this._textField({
        label: this.t(`limit_${slot + 1}`),
        value: config.limits?.[slot] != null ? String(config.limits[slot]) : '',
        numeric: true,
        onChange: v => {
          const next = [...(config.limits ?? [0, 0, 0, 0])];
          next[slot] = Number(v);
          this._updateField(type, index, 'limits', next);
        },
      });

    return this._section({
      label: this.t('sec_scale'),
      summary: usesLimits ? this.t('scale_from_limits') : inherited,
      body: html`
        <label class="text-field">
          <span class="text-field-label">${this.t('scale_mode')}</span>
          <select
            class="sensor-select"
            @change=${(e: Event) => setMode((e.target as HTMLSelectElement).value)}
          >
            <option value="setpoint" ?selected=${!usesLimits}>
              ${this.t('scale_from_setpoint')}
            </option>
            <option value="limits" ?selected=${usesLimits}>${this.t('scale_from_limits')}</option>
          </select>
        </label>
        <p class="sensor-hint">
          ${usesLimits ? this.t('scale_hint_limits') : this.t('scale_hint_setpoint')}
        </p>
        ${usesLimits
          ? html`
              <div class="sensor-field-row">${limit(0)}${limit(1)}</div>
              <div class="sensor-field-row">${limit(2)}${limit(3)}</div>
              <label class="text-field">
                <span class="text-field-label">${this.t('direction')}</span>
                <select
                  class="sensor-select"
                  @change=${(e: Event) =>
                    this._updateField(
                      type,
                      index,
                      'direction',
                      (e.target as HTMLSelectElement).value,
                    )}
                >
                  <option
                    value="lower_is_better"
                    ?selected=${config.direction !== 'higher_is_better'}
                  >
                    ${this.t('lower_is_better')}
                  </option>
                  <option
                    value="higher_is_better"
                    ?selected=${config.direction === 'higher_is_better'}
                  >
                    ${this.t('higher_is_better')}
                  </option>
                </select>
              </label>
            `
          : html`
              <div class="sensor-field-row">
                ${this._numberField(this.t('setpoint'), type, index, 'setpoint', config)}
                ${this._numberField(this.t('step'), type, index, 'step', config)}
                ${this._numberField(this.t('min_limit'), type, index, 'min_limit', config)}
              </div>
              <div class="sensor-field-row">
                ${this._numberField(this.t('step_low'), type, index, 'step_low', config)}
                ${this._numberField(this.t('step_high'), type, index, 'step_high', config)}
              </div>
              ${this.freeform || !this.registry[type]
                ? html`
                    <label class="text-field">
                      <span class="text-field-label">${this.t('mode')}</span>
                      <select
                        class="sensor-select"
                        @change=${(e: Event) =>
                          this._updateField(
                            type,
                            index,
                            'mode',
                            (e.target as HTMLSelectElement).value,
                          )}
                      >
                        <option
                          value="centric"
                          ?selected=${(config.mode || 'centric') === 'centric'}
                        >
                          ${this.t('mode_centric')}
                        </option>
                        <option value="heatflow" ?selected=${config.mode === 'heatflow'}>
                          ${this.t('mode_heatflow')}
                        </option>
                      </select>
                    </label>
                  `
                : nothing}
            `}
      `,
    });
  }

  private _renderSensorFields(
    type: string,
    config: SensorUserConfig,
    index: number,
  ): TemplateResult {
    return html`
      <div class="sensor-row-content">
        <div class=${config.entity ? 'sensor-required' : 'sensor-required missing'}>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.entity || ''}
            .label=${`${this.t('entity')} (${this.t('required')})`}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'entity', e.detail.value)}
          ></ha-entity-picker>
          ${config.entity ? '' : html`<p class="sensor-error">${this.t('entity_required')}</p>`}
        </div>

        ${this._textField({
          label: this.t('attribute'),
          value: config.attribute || '',
          onChange: v => this._updateField(type, index, 'attribute', v || undefined),
        })}
        <p class="sensor-hint">${this.t('attribute_hint')}</p>

        ${this._section({
          label: this.t('sec_content'),
          summary: this._summary(config, ['name', 'unit'], this.t('inherited')),
          body: html`
            <div class="sensor-field-row">
              ${this._textField({
                label: this.t('name_override'),
                value: config.name || '',
                onChange: v => this._updateField(type, index, 'name', v || undefined),
              })}
              ${this._textField({
                label: this.t('unit_override'),
                value: config.unit || '',
                onChange: v => this._updateField(type, index, 'unit', v || undefined),
              })}
            </div>
          `,
        })}
        ${this._section({
          label: this.t('sec_appearance'),
          summary: this._summary(config, ['icon', 'image_url'], this.t('sec_appearance_sub')),
          body: html`
            <div class="sensor-field-row">
              ${this._textField({
                label: this.t('icon'),
                value: config.icon || '',
                onChange: v => this._updateField(type, index, 'icon', v || undefined),
              })}
              ${this._textField({
                label: this.t('image_url'),
                value: config.image_url || '',
                onChange: v => this._updateField(type, index, 'image_url', v || undefined),
              })}
            </div>
          `,
        })}
        ${this._renderScale(type, config, index)}
        ${this._section({
          label: this.t('sec_linked'),
          summary: this._summary(
            config,
            [
              'setpoint_entity',
              'min_limit_entity',
              'min',
              'max',
              'availability_entity',
              'battery_entity',
            ],
            this.t('sec_linked_sub'),
          ),
          body: html`
            ${this._entityField(
              this.t('setpoint_entity'),
              type,
              index,
              'setpoint_entity',
              config,
              NUMERIC,
            )}
            ${this._entityField(
              this.t('min_limit_entity'),
              type,
              index,
              'min_limit_entity',
              config,
              NUMERIC,
            )}
            ${this._entityField(this.t('min_entity'), type, index, 'min', config)}
            ${this._entityField(this.t('max_entity'), type, index, 'max', config)}
            ${this._entityField(
              this.t('availability_entity'),
              type,
              index,
              'availability_entity',
              config,
              AVAILABILITY,
            )}
            ${this._entityField(this.t('battery_entity'), type, index, 'battery_entity', config, [
              'sensor',
            ])}
          `,
        })}
        ${this._section({
          label: this.t('sec_timestamp'),
          summary: this._summary(
            config,
            ['last_updated_entity', 'last_updated_attribute'],
            this.t('sec_timestamp_sub'),
          ),
          body: html`
            ${this._entityField(
              this.t('last_updated_entity'),
              type,
              index,
              'last_updated_entity',
              config,
            )}
            ${this._textField({
              label: this.t('last_updated_attribute'),
              value: config.last_updated_attribute || '',
              onChange: v =>
                this._updateField(type, index, 'last_updated_attribute', v || undefined),
            })}
          `,
        })}
      </div>
    `;
  }

  private _renderAddSensor(): TemplateResult {
    if (this.freeform) {
      return html`
        <div class="freeform-input">
          ${this._textField({
            label: this.t('sensor_type_key'),
            value: this._newSensorType,
            live: true,
            onChange: v => {
              this._newSensorType = v;
            },
          })}
          <ha-icon-button
            .path=${'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'}
            @click=${this._addFreeformSensor}
          ></ha-icon-button>
        </div>
      `;
    }

    // Preset mode: show available types not yet configured, grouped by category
    const availableTypes = Object.entries(this.registry)
      .filter(([key]) => !this.sensors[key])
      .map(([key, preset]) => ({
        value: key,
        label: preset.name,
        category: preset.category || 'other',
      }));

    if (availableTypes.length === 0) {
      return html`<div class="empty-message">${this.t('all_configured')}</div>`;
    }

    const categoryLabels: Record<string, string> = {
      water_chemistry: this.t('category.water_chemistry'),
      chemical_balance: this.t('category.chemical_balance'),
      treatment: this.t('category.treatment'),
      equipment: this.t('category.equipment'),
      other: this.t('category.other'),
    };

    const grouped = availableTypes.reduce(
      (acc, item) => {
        const cat = item.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      },
      {} as Record<string, typeof availableTypes>,
    );

    const categoryOrder = [
      'water_chemistry',
      'chemical_balance',
      'treatment',
      'equipment',
      'other',
    ];

    return html`
      <div class="add-sensor-row">
        <select
          class="sensor-select"
          @change=${(e: Event) => {
            const select = e.target as HTMLSelectElement;
            const type = select.value;
            if (type) {
              this._addPresetSensor(type);
              select.value = '';
            }
          }}
        >
          <option value="">Add sensor...</option>
          ${categoryOrder
            .filter(cat => grouped[cat]?.length > 0)
            .map(
              cat => html`
                <option disabled>, ${categoryLabels[cat]} ,</option>
                ${grouped[cat].map(opt => html`<option value=${opt.value}>${opt.label}</option>`)}
              `,
            )}
        </select>
      </div>
    `;
  }

  private _toggleExpand(key: string): void {
    this._expanded = { ...this._expanded, [key]: !this._expanded[key] };
  }

  private _addPresetSensor(type: string): void {
    const updated = { ...this.sensors, [type]: { entity: '' } as SensorUserConfig };
    this._expanded = { ...this._expanded, [type]: true };
    this._fireSensorsChanged(updated);
  }

  private _addFreeformSensor(): void {
    const type = this._newSensorType
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
    if (!type) return;

    if (this.sensors[type]) {
      // Add as array entry
      const existing = this.sensors[type];
      const arr = Array.isArray(existing) ? [...existing] : [existing];
      arr.push({ entity: '' } as SensorUserConfig);
      const updated = { ...this.sensors, [type]: arr };
      const key = `${type}-${arr.length - 1}`;
      this._expanded = { ...this._expanded, [key]: true };
      this._fireSensorsChanged(updated);
    } else {
      const updated = { ...this.sensors, [type]: { entity: '' } as SensorUserConfig };
      this._expanded = { ...this._expanded, [type]: true };
      this._fireSensorsChanged(updated);
    }
    this._newSensorType = '';
  }

  private _removeSensor(type: string, index: number): void {
    const existing = this.sensors[type];
    if (Array.isArray(existing)) {
      const arr = existing.filter((_, i) => i !== index);
      if (arr.length === 0) {
        const { [type]: _, ...rest } = this.sensors;
        void _;
        this._fireSensorsChanged(rest);
      } else if (arr.length === 1) {
        this._fireSensorsChanged({ ...this.sensors, [type]: arr[0] });
      } else {
        this._fireSensorsChanged({ ...this.sensors, [type]: arr });
      }
    } else {
      const { [type]: _, ...rest } = this.sensors;
      void _;
      this._fireSensorsChanged(rest);
    }
  }

  private _updateField(type: string, index: number, field: string, value: unknown): void {
    const existing = this.sensors[type];

    if (Array.isArray(existing)) {
      const arr = [...existing];
      arr[index] = { ...arr[index], [field]: value };
      // Clean undefined values
      if (value === undefined || value === '') {
        delete (arr[index] as unknown as Record<string, unknown>)[field];
      }
      this._fireSensorsChanged({ ...this.sensors, [type]: arr });
    } else {
      const updated = { ...existing, [field]: value } as SensorUserConfig;
      if (value === undefined || value === '') {
        delete (updated as unknown as Record<string, unknown>)[field];
      }
      this._fireSensorsChanged({ ...this.sensors, [type]: updated });
    }
  }

  private _fireSensorsChanged(
    sensors: Record<string, SensorUserConfig | SensorUserConfig[]>,
  ): void {
    this.dispatchEvent(
      new CustomEvent('sensors-changed', {
        bubbles: true,
        composed: true,
        detail: { sensors },
      }),
    );
  }
}

if (!customElements.get('monitor-sensor-editor')) {
  customElements.define('monitor-sensor-editor', MonitorSensorEditor);
}
