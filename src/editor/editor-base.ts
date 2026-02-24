import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, CardConfig, SensorsRegistry } from '../ha/types.js';
import type { LovelaceCardEditor, HaFormSchema } from './types.js';
import { fireEvent } from './types.js';
import { DEFAULT_DISPLAY, DEFAULT_COLORS } from '../configs/config.js';
import { GENERAL_SCHEMA, DISPLAY_SCHEMA, COLORS_SCHEMA } from './ha-form-schemas.js';
import { editorStyles } from './editor-styles.js';

export abstract class MonitorEditorBase extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() protected _config!: CardConfig;

  static styles = editorStyles;

  abstract get sensorsRegistry(): SensorsRegistry;
  abstract get hasPresets(): boolean;
  abstract renderSensorSection(): TemplateResult;

  setConfig(config: CardConfig): void {
    this._config = {
      ...config,
      display: { ...DEFAULT_DISPLAY, ...config.display },
      colors: { ...DEFAULT_COLORS, ...config.colors },
      sensors: config.sensors || {},
    };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    return html`
      <div class="card-config">
        <div class="section">
          <ha-form
            .hass=${this.hass}
            .data=${{
              title: this._config.title || '',
              status_entity: this._config.status_entity || '',
            }}
            .schema=${GENERAL_SCHEMA}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._generalChanged}
          ></ha-form>
        </div>

        <div class="section">
          <div class="section-header">Sensors</div>
          ${this.renderSensorSection()}
        </div>

        <ha-expansion-panel .header=${'Display Options'}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.display}
            .schema=${DISPLAY_SCHEMA}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._displayChanged}
          ></ha-form>
        </ha-expansion-panel>

        <ha-expansion-panel .header=${'Colors'}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.colors}
            .schema=${COLORS_SCHEMA}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._colorsChanged}
          ></ha-form>
        </ha-expansion-panel>
      </div>
    `;
  }

  private _generalChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = ev.detail.value as Record<string, unknown>;
    this._config = {
      ...this._config,
      title: (value.title as string) || undefined,
      status_entity: (value.status_entity as string) || undefined,
    };
    this._fireConfigChanged();
  }

  private _displayChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._config = { ...this._config, display: { ...this._config.display, ...ev.detail.value } };
    this._fireConfigChanged();
  }

  private _colorsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._config = { ...this._config, colors: { ...this._config.colors, ...ev.detail.value } };
    this._fireConfigChanged();
  }

  protected _sensorsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._config = { ...this._config, sensors: ev.detail.sensors };
    this._fireConfigChanged();
  }

  protected _fireConfigChanged(): void {
    fireEvent(this, 'config-changed', { config: this._config });
  }

  protected _computeLabel(schema: HaFormSchema): string {
    const name = schema.label || schema.name;
    return name.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  }
}
