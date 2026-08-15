import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, SensorsRegistry, SensorUserConfig } from '../ha/types.js';
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

  private _renderSensorFields(
    type: string,
    config: SensorUserConfig,
    index: number,
  ): TemplateResult {
    return html`
      <div class="sensor-row-content">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${config.entity || ''}
          .label=${'Entity'}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updateField(type, index, 'entity', e.detail.value)}
        ></ha-entity-picker>

        <div class="sensor-field-row">
          ${this._textField({
            label: 'Name override',
            value: config.name || '',
            onChange: v => this._updateField(type, index, 'name', v || undefined),
          })}
          ${this._textField({
            label: 'Unit override',
            value: config.unit || '',
            onChange: v => this._updateField(type, index, 'unit', v || undefined),
          })}
        </div>

        <div class="sensor-field-row">
          ${this._textField({
            label: 'Setpoint',
            value: config.setpoint != null ? String(config.setpoint) : '',
            numeric: true,
            onChange: v => this._updateField(type, index, 'setpoint', v ? Number(v) : undefined),
          })}
          ${this._textField({
            label: 'Step',
            value: config.step != null ? String(config.step) : '',
            numeric: true,
            onChange: v => this._updateField(type, index, 'step', v ? Number(v) : undefined),
          })}
          ${this._textField({
            label: 'Min limit',
            value: config.min_limit != null ? String(config.min_limit) : '',
            numeric: true,
            onChange: v => this._updateField(type, index, 'min_limit', v ? Number(v) : undefined),
          })}
        </div>

        <div class="sensor-field-row">
          ${this._textField({
            label: 'Step low',
            value: config.step_low != null ? String(config.step_low) : '',
            numeric: true,
            onChange: v => this._updateField(type, index, 'step_low', v ? Number(v) : undefined),
          })}
          ${this._textField({
            label: 'Step high',
            value: config.step_high != null ? String(config.step_high) : '',
            numeric: true,
            onChange: v => this._updateField(type, index, 'step_high', v ? Number(v) : undefined),
          })}
        </div>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.min || ''}
            .label=${'Min entity'}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'min', e.detail.value || undefined)}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.max || ''}
            .label=${'Max entity'}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'max', e.detail.value || undefined)}
          ></ha-entity-picker>
        </div>

        <div class="sensor-field-row">
          <ha-icon-picker
            .hass=${this.hass}
            .value=${config.icon || ''}
            .label=${'Icon'}
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'icon', e.detail.value || undefined)}
          ></ha-icon-picker>
          ${this._textField({
            label: 'Image URL',
            value: config.image_url || '',
            onChange: v => this._updateField(type, index, 'image_url', v || undefined),
          })}
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${config.availability_entity || ''}
          .label=${'Availability entity (optional — grays out when off)'}
          .includeDomains=${['binary_sensor', 'switch', 'input_boolean']}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updateField(type, index, 'availability_entity', e.detail.value || undefined)}
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${config.battery_entity || ''}
          .label=${'Battery entity (optional — shows battery level)'}
          .includeDomains=${['sensor']}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updateField(type, index, 'battery_entity', e.detail.value || undefined)}
        ></ha-entity-picker>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.last_updated_entity || ''}
            .label=${'Last updated entity (optional)'}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'last_updated_entity', e.detail.value || undefined)}
          ></ha-entity-picker>
          ${this._textField({
            label: 'Last updated attribute',
            value: config.last_updated_attribute || '',
            onChange: v => this._updateField(type, index, 'last_updated_attribute', v || undefined),
          })}
        </div>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.setpoint_entity || ''}
            .label=${'Setpoint entity (optional — overrides static setpoint)'}
            .includeDomains=${['input_number', 'number', 'sensor']}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'setpoint_entity', e.detail.value || undefined)}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.min_limit_entity || ''}
            .label=${'Min limit entity (optional — overrides static min_limit)'}
            .includeDomains=${['input_number', 'number', 'sensor']}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) =>
              this._updateField(type, index, 'min_limit_entity', e.detail.value || undefined)}
          ></ha-entity-picker>
        </div>

        ${this.freeform || !this.registry[type]
          ? html`
              <div class="sensor-field-row">
                <label class="text-field">
                  <span class="text-field-label">Mode</span>
                  <select
                    class="sensor-select"
                    @change=${(e: Event) =>
                      this._updateField(type, index, 'mode', (e.target as HTMLSelectElement).value)}
                  >
                    <option value="centric" ?selected=${(config.mode || 'centric') === 'centric'}>
                      Centric
                    </option>
                    <option value="heatflow" ?selected=${config.mode === 'heatflow'}>
                      Heatflow
                    </option>
                  </select>
                </label>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _renderAddSensor(): TemplateResult {
    if (this.freeform) {
      return html`
        <div class="freeform-input">
          ${this._textField({
            label: 'Sensor type key',
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
      return html`<div class="empty-message">All sensor types are configured.</div>`;
    }

    const categoryLabels: Record<string, string> = {
      water_chemistry: 'Essential Water Chemistry',
      chemical_balance: 'Chemical Balance',
      treatment: 'Treatment & Sanitization',
      equipment: 'Equipment & Maintenance',
      other: 'Other',
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
                <option disabled>— ${categoryLabels[cat]} —</option>
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
