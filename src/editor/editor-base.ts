import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, CardConfig, SensorsRegistry } from '../ha/types.js';
import type { LovelaceCardEditor, HaFormSchema } from './types.js';
import { fireEvent } from './types.js';
import { DEFAULT_DISPLAY, DEFAULT_COLORS } from '../configs/config.js';
import { generalSchema, displaySchema, colorsSchema } from './ha-form-schemas.js';
import { editorStyles } from './editor-styles.js';
import { editorText } from './editor-i18n.js';

export abstract class MonitorEditorBase extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() protected _config!: CardConfig;

  static styles = editorStyles;

  /** Editor labels follow the Home Assistant language, see editor-i18n. */
  protected t(key: string): string {
    return editorText(this.hass, key);
  }

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
            .schema=${generalSchema(k => this.t(k))}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._generalChanged}
          ></ha-form>
        </div>

        <div class="section">
          <div class="section-header">Sensors</div>
          ${this.renderSensorSection()}
        </div>

        <ha-expansion-panel .header=${this.t('display_options')}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.display}
            .schema=${displaySchema(k => this.t(k))}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._displayChanged}
          ></ha-form>
        </ha-expansion-panel>

        <ha-expansion-panel .header=${this.t('colors')}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.colors}
            .schema=${colorsSchema(k => this.t(k))}
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
    // An explicit label is already written for a human, in whatever language
    // the editor is in. Title-casing it is noise in English and wrong in
    // French: `\b\w` knows nothing about accents, so the `t` of "etat" sits at
    // a word boundary, and "Entite d'etat" came out as "Entite D'eTat".
    //
    // The fallback below still turns a bare schema name into something
    // readable, which is what it was written for.
    if (schema.label) return schema.label;
    return schema.name.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  }
}
