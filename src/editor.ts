import { html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MonitorEditorBase } from './editor/editor-base.js';
import '../../core/src/editor/sensor-editor.js';
import { POOL_SENSORS } from './sensors.js';
import type { SensorsRegistry } from './ha/types.js';

@customElement('pool-monitor-card-editor')
export class PoolMonitorCardEditor extends MonitorEditorBase {
  get sensorsRegistry(): SensorsRegistry {
    return POOL_SENSORS;
  }

  get hasPresets(): boolean {
    return true;
  }

  renderSensorSection(): TemplateResult {
    return html`
      <monitor-sensor-editor
        .hass=${this.hass}
        .sensors=${this._config.sensors || {}}
        .registry=${this.sensorsRegistry}
        @sensors-changed=${this._sensorsChanged}
      ></monitor-sensor-editor>
    `;
  }
}
