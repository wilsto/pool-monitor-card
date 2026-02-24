import { html, TemplateResult } from 'lit';
import type { CardConfig, SensorData, StatusData } from '../ha/types.js';

export class cardContent {
  static generateTitle(config: CardConfig): TemplateResult {
    const title =
      config.title !== undefined
        ? html` <h1 class="pool-monitor-title">${config.title}</h1> `
        : html``;

    return html`${title}`;
  }

  static generateStatusBadge(status: StatusData): TemplateResult {
    return html`
      <div class="status-container" @click=${() => cardContent._moreinfo(status.entity_id)}>
        <span class="status-badge" style="background-color: ${status.color};">
          <ha-icon icon="${status.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
          ${status.label}
        </span>
        ${status.friendly_name
          ? html`<span class="status-friendly-name">${status.friendly_name}</span>`
          : ''}
      </div>
    `;
  }

  static generateBody(config: CardConfig, data: SensorData): TemplateResult {
    if (!data) {
      return html` <div class="warning-message">No sensor data available</div> `;
    }
    return html`
      <!-- ##### ${data.name} section ##### -->
      <div
        class="${data.disabled ? 'section disabled' : 'section'}"
        @click=${() => cardContent._moreinfo(data.entity)}
      >
        <div class="pool-monitor-container-marker">
          <div
            class="marker"
            style="background-color: ${data.color} ;color: black;left: ${data.pct_marker}%;"
          >
            ${data.value != null ? `${data.value} ${data.unit}` : '—'}
          </div>
          <div
            class="marker-state"
            style="font-size: 0.8em; padding-top: 5px;color:${data.color};width: 200px;padding-${data.side_align}:40px;text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_state_step}%;"
          >
            ${data.state}
          </div>
          <div
            class="triangle"
            style="border-top: 10px solid ${data.color} ;left: ${data.pct_marker}%;"
          ></div>
        </div>
        ${!data.hide_icon
          ? html`
              <div class="pool-monitor-entity-img">
                ${data.is_mdi
                  ? html`
                      <ha-icon icon="${data.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
                    `
                  : html` <img src="${data.img_src}" style="width: 32px; height: 32px;" /> `}
              </div>
            `
          : ''}
        <div class="pool-monitor-container">
          ${config.display.gradient
            ? html`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right,
              ${data.mode === 'heatflow'
                    ? `${config.colors.cool} 15%,
                 ${config.colors.low} 50%,
                 ${config.colors.warn} 85%`
                    : `${config.colors.warn} 5%,
                 ${config.colors.low} 30%,
                 ${config.colors.normal},
                 ${config.colors.normal},
                 ${config.colors.low} 70%,
                 ${config.colors.warn} 95%`}
            );"
                ></div>
              `
            : html`
                <div class="grid-container">
                  <div
                    style="background-color: ${config.colors
                      .warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors
                      .warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${(data as any).min}</span>
                  <span>${(data as any).max}</span>
                </div>
              `}
          ${data.pct_min !== data.pct_cursor
            ? html`<div
                class="cursor-text"
                style="border-left: 2px solid ${config.colors
                  .hi_low}; border-top: 2px solid ${config.colors
                  .hi_low}; border-bottom: 2px solid ${config.colors
                  .hi_low}; width: 2px; height: 12px; text-align:${data.side_align}; background-color:transparent; ${data.side_align}: ${data.pct_min}%;"
              ></div>`
            : ''}
          ${data.pct_max !== data.pct_cursor
            ? html`<div
                class="cursor-text"
                style="border-right: 2px solid ${config.colors
                  .hi_low}; border-top: 2px solid ${config.colors
                  .hi_low}; border-bottom: 2px solid ${config.colors
                  .hi_low}; width: 2px; height: 12px; text-align:${data.side_align}; background-color:transparent; ${data.side_align}: ${data.pct_max}%;"
              ></div>`
            : ''}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${config.colors
                .normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${data.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
      <div style="text-align:left;padding-left:15px;">
        ${data.title}
        ${data.battery_icon
          ? html`<span class="battery-indicator" style="color: ${data.battery_color};">
              <ha-icon icon="${data.battery_icon}" style="--mdc-icon-size: 14px;"></ha-icon>
              ${data.battery_level != null ? html`${data.battery_level}%` : ''}
            </span>`
          : ''}
        <br /><small style="position: relative;top:-5px;font-size:9px;color:lightgrey"
          >${data.last_updated}</small
        >
      </div>
    `;
  }

  static generateCompactBody(config: CardConfig, data: SensorData): TemplateResult {
    if (!data) {
      return html` <div class="warning-message">No sensor data available</div> `;
    }
    return html`
      <!-- ##### ${data.name} section ##### -->
      <div class="section-compact" @click=${() => cardContent._moreinfo(data.entity)}>
        ${!data.hide_icon
          ? html`
              <div class="pool-monitor-entity-img">
                ${data.is_mdi
                  ? html`
                      <ha-icon icon="${data.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
                    `
                  : html` <img src="${data.img_src}" style="width: 24px; height: 24px;" /> `}
              </div>
            `
          : ''}
        <div class="pool-monitor-container">
          ${config.display.gradient
            ? html`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right,
              ${data.mode === 'heatflow'
                    ? `${config.colors.cool} 15%,
                 ${config.colors.low} 50%,
                 ${config.colors.warn} 85%`
                    : `${config.colors.warn} 5%,
                 ${config.colors.low} 30%,
                 ${config.colors.normal},
                 ${config.colors.normal},
                 ${config.colors.low} 70%,
                 ${config.colors.warn} 95%`}
            );"
                ></div>
              `
            : html`
                <div class="grid-container">
                  <div
                    style="background-color: ${config.colors
                      .warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${config.colors
                      .warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${(data as any).min}</span>
                  <span>${(data as any).max}</span>
                </div>
              `}
          <div
            class="cursor-text"
            style="border-${data.side_align}: 5px solid ${(config as any)
              .marker}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_cursor}%;"
          >
            &nbsp; ${data.title} ${data.value != null ? `${data.value} ${data.unit}` : '—'}
            ${data.separator} ${data.state}
            ${data.battery_icon
              ? html`<ha-icon
                    icon="${data.battery_icon}"
                    style="--mdc-icon-size: 12px; color: ${data.battery_color};"
                  ></ha-icon
                  >${data.battery_level != null ? html`${data.battery_level}%` : ''}`
              : ''}
            &nbsp;
          </div>
          ${data.pct_min !== data.pct_cursor
            ? html`<div
                class="cursor-text"
                style="border-left: 2px solid ${config.colors
                  .hi_low}; border-top: 2px solid ${config.colors
                  .hi_low}; border-bottom: 2px solid ${config.colors
                  .hi_low}; width: 2px; height: 12px; text-align:${data.side_align}; background-color:transparent; ${data.side_align}: ${data.pct_min}%;"
              ></div>`
            : ''}
          ${data.pct_max !== data.pct_cursor
            ? html`<div
                class="cursor-text"
                style="border-right: 2px solid ${config.colors
                  .hi_low}; border-top: 2px solid ${config.colors
                  .hi_low}; border-bottom: 2px solid ${config.colors
                  .hi_low}; width: 2px; height: 12px; text-align:${data.side_align}; background-color:transparent; ${data.side_align}: ${data.pct_max}%;"
              ></div>`
            : ''}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${config.colors
                .normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${data.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${data.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
    `;
  }

  static _moreinfo(entity: string): void {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    }) as any;
    event.detail = { entityId: entity };
    const homeAssistant = document.querySelector('home-assistant');
    if (homeAssistant) {
      homeAssistant.dispatchEvent(event);
    }
  }
}
