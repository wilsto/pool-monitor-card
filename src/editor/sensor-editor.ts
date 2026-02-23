import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, SensorsRegistry, SensorUserConfig } from '../ha/types.js';
import { editorStyles } from './editor-styles.js';

interface ExpandedState {
  [key: string]: boolean; // "type" or "type-index" → expanded
}

export class MonitorSensorEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) sensors: Record<string, SensorUserConfig | SensorUserConfig[]> = {};
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

  private _renderSensorType(type: string, config: SensorUserConfig | SensorUserConfig[]): TemplateResult {
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
              ? html`<span style="color: var(--secondary-text-color); font-weight: normal; font-size: 12px;">${config.entity}</span>`
              : nothing}
          </div>
          <div class="sensor-row-actions">
            <ha-icon-button
              class="delete-btn"
              .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
              @click=${(e: Event) => { e.stopPropagation(); this._removeSensor(type, index); }}
            ></ha-icon-button>
          </div>
        </div>
        ${expanded ? this._renderSensorFields(type, config, index) : nothing}
      </div>
    `;
  }

  private _renderSensorFields(type: string, config: SensorUserConfig, index: number): TemplateResult {
    return html`
      <div class="sensor-row-content">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${config.entity || ''}
          .label=${'Entity'}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) => this._updateField(type, index, 'entity', e.detail.value)}
        ></ha-entity-picker>

        <div class="sensor-field-row">
          <ha-textfield
            .label=${'Name override'}
            .value=${config.name || ''}
            @change=${(e: Event) => this._updateField(type, index, 'name', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            .label=${'Unit override'}
            .value=${config.unit || ''}
            @change=${(e: Event) => this._updateField(type, index, 'unit', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        <div class="sensor-field-row">
          <ha-textfield
            .label=${'Setpoint'}
            .value=${config.setpoint != null ? String(config.setpoint) : ''}
            type="number"
            @change=${(e: Event) => {
              const val = (e.target as HTMLInputElement).value;
              this._updateField(type, index, 'setpoint', val ? Number(val) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            .label=${'Step'}
            .value=${config.step != null ? String(config.step) : ''}
            type="number"
            @change=${(e: Event) => {
              const val = (e.target as HTMLInputElement).value;
              this._updateField(type, index, 'step', val ? Number(val) : undefined);
            }}
          ></ha-textfield>
          <ha-textfield
            .label=${'Min limit'}
            .value=${config.min_limit != null ? String(config.min_limit) : ''}
            type="number"
            @change=${(e: Event) => {
              const val = (e.target as HTMLInputElement).value;
              this._updateField(type, index, 'min_limit', val ? Number(val) : undefined);
            }}
          ></ha-textfield>
        </div>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.min || ''}
            .label=${'Min entity'}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) => this._updateField(type, index, 'min', e.detail.value || undefined)}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${config.max || ''}
            .label=${'Max entity'}
            allow-custom-entity
            @value-changed=${(e: CustomEvent) => this._updateField(type, index, 'max', e.detail.value || undefined)}
          ></ha-entity-picker>
        </div>

        <div class="sensor-field-row">
          <ha-icon-picker
            .hass=${this.hass}
            .value=${config.icon || ''}
            .label=${'Icon'}
            @value-changed=${(e: CustomEvent) => this._updateField(type, index, 'icon', e.detail.value || undefined)}
          ></ha-icon-picker>
          <ha-textfield
            .label=${'Image URL'}
            .value=${config.image_url || ''}
            @change=${(e: Event) => this._updateField(type, index, 'image_url', (e.target as HTMLInputElement).value || undefined)}
          ></ha-textfield>
        </div>

        ${this.freeform || !this.registry[type] ? html`
          <div class="sensor-field-row">
            <ha-select
              .label=${'Mode'}
              .value=${config.mode || 'centric'}
              @selected=${(e: CustomEvent) => this._updateField(type, index, 'mode', (e.target as HTMLSelectElement).value)}
            >
              <mwc-list-item value="centric">Centric</mwc-list-item>
              <mwc-list-item value="heatflow">Heatflow</mwc-list-item>
            </ha-select>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderAddSensor(): TemplateResult {
    if (this.freeform) {
      return html`
        <div class="freeform-input">
          <ha-textfield
            .label=${'Sensor type key'}
            .value=${this._newSensorType}
            @input=${(e: Event) => { this._newSensorType = (e.target as HTMLInputElement).value; }}
          ></ha-textfield>
          <ha-icon-button
            .path=${'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'}
            @click=${this._addFreeformSensor}
          ></ha-icon-button>
        </div>
      `;
    }

    // Preset mode: show available types not yet configured
    const availableTypes = Object.entries(this.registry)
      .filter(([key]) => !this.sensors[key])
      .map(([key, preset]) => ({ value: key, label: preset.name }));

    if (availableTypes.length === 0) {
      return html`<div class="empty-message">All sensor types are configured.</div>`;
    }

    return html`
      <div class="add-sensor-row">
        <ha-select
          .label=${'Add sensor'}
          .value=${''}
          @selected=${(e: CustomEvent) => {
            const type = (e.target as HTMLSelectElement).value;
            if (type) this._addPresetSensor(type);
          }}
        >
          ${availableTypes.map(
            (opt) => html`<mwc-list-item .value=${opt.value}>${opt.label}</mwc-list-item>`,
          )}
        </ha-select>
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
    const type = this._newSensorType.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
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
        this._fireSensorsChanged(rest);
      } else if (arr.length === 1) {
        this._fireSensorsChanged({ ...this.sensors, [type]: arr[0] });
      } else {
        this._fireSensorsChanged({ ...this.sensors, [type]: arr });
      }
    } else {
      const { [type]: _, ...rest } = this.sensors;
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

  private _fireSensorsChanged(sensors: Record<string, SensorUserConfig | SensorUserConfig[]>): void {
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
