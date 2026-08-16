import { html, TemplateResult } from 'lit';
import type { CardConfig, SensorData, StatusData } from '../ha/types.js';

/**
 * Horizontal offset for a scale label.
 *
 * Labels are centred on their position, which puts half of them outside the
 * card at 0% and 100%, and the card clips its overflow, so `87` rendered as
 * `8`. A truncated number is worse than an ugly one: it reads as a different
 * value. Edge labels are therefore aligned inwards instead of centred.
 *
 * Only reachable with explicit `limits`: the setpoint/step scale keeps its
 * labels between 16.7% and 83.3%, well clear of the edges.
 */
const labelShift = (position: number): string => {
  if (position <= 0.5) return 'translateX(0)';
  if (position >= 99.5) return 'translateX(-100%)';
  return 'translateX(-50%)';
};

/**
 * The bar has three shapes, and only two of them are fixed.
 *
 * A centric scale is bad-good-bad and a heatflow scale cool-to-warm; both can
 * be painted from constants. A monotonic scale cannot: it runs good to bad, and
 * its colours have to change on the thresholds the labels announce. Painting it
 * with the centric gradient put red at 0 ppm of carbon monoxide and green in
 * the middle, the exact inverse of the message.
 */
export class cardContent {
  static generateTitle(config: CardConfig): TemplateResult {
    const title =
      config.title !== undefined
        ? html` <h1 class="pool-monitor-title">${config.title}</h1> `
        : html``;

    return html`${title}`;
  }

  static generateStatusBadge(
    status: StatusData,
    battery?: { level: number | null; icon: string; color: string } | null,
  ): TemplateResult {
    return html`
      <div class="status-container">
        <span
          class="status-badge"
          style="background-color: ${status.color};"
          @click=${() => cardContent._moreinfo(status.entity_id)}
        >
          <ha-icon icon="${status.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
          ${status.label}
        </span>
        ${status.friendly_name
          ? html`<span class="status-friendly-name">${status.friendly_name}</span>`
          : ''}
        ${battery ? cardContent.generateCardBattery(battery) : ''}
      </div>
    `;
  }

  /**
   * The device's own battery, shown once in the header.
   *
   * A WaterGuru takes every measurement on one battery, so repeating it on
   * each sensor row said the same thing five times (pool-monitor-card#81).
   */
  static generateCardBattery(battery: {
    level: number | null;
    icon: string;
    color: string;
  }): TemplateResult {
    return html`
      <span class="card-battery" style="color: ${battery.color};">
        <ha-icon icon="${battery.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
        ${battery.level != null ? html`${battery.level}%` : ''}
      </span>
    `;
  }

  /** The status of one measurement, next to its name. */
  static generateSensorStatus(status: StatusData): TemplateResult {
    return html`
      <span
        class="sensor-status"
        style="background-color: ${status.color};"
        @click=${(e: Event) => {
          e.stopPropagation();
          cardContent._moreinfo(status.entity_id);
        }}
        >${status.label}</span
      >
    `;
  }

  static generateBody(config: CardConfig, data: SensorData): TemplateResult {
    if (!data) {
      return html` <div class="warning-message">No sensor data available</div> `;
    }
    const markerPct = data.pct_marker;
    const markerTransform =
      markerPct <= 1 ? 'translateX(0)' : markerPct >= 99 ? 'translateX(-100%)' : 'translateX(-50%)';

    return html`
      <!-- ##### ${data.name} section ##### -->
      <div
        class="${data.disabled ? 'section disabled' : 'section'}"
        @click=${() => cardContent._moreinfo(data.entity)}
      >
        <div class="section-row">
          ${!data.hide_icon
            ? html`
                <div class="pool-monitor-entity-img">
                  ${data.is_mdi
                    ? html` <ha-icon icon="${data.mdi_icon}" class="entity-icon"></ha-icon> `
                    : html` <img src="${data.img_src}" class="entity-icon" /> `}
                </div>
              `
            : ''}
          <div class="sensor-gauge">
            <div class="gauge-marker-zone">
              <div
                class="marker"
                style="background-color: ${data.color};color: black;left: ${markerPct}%;transform: ${markerTransform};"
              >
                ${data.side_align === 'right' && data.state
                  ? html`<span class="marker-state">${data.state}</span>`
                  : ''}
                ${data.value != null ? `${data.value} ${data.unit}` : ','}
                ${data.side_align === 'left' && data.state
                  ? html`<span class="marker-state">${data.state}</span>`
                  : ''}
              </div>
              <div
                class="triangle"
                style="border-top: 8px solid ${data.color};left: ${markerPct}%;transform: ${markerTransform};"
              ></div>
            </div>
            <div class="pool-monitor-container">
              ${config.display.gradient
                ? html`
                    <div
                      class="progress-bar-child"
                      style="background: linear-gradient(to right,
                  ${data.monotonic_stops
                        ? data.monotonic_stops
                        : data.mode === 'heatflow'
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
                    <div class="gauge-scale">
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
            <div class="gauge-labels">
              <span
                class="gauge-label"
                style="left: ${data.label_positions[0]}%;transform:${labelShift(
                  data.label_positions[0],
                )}"
                >${data.setpoint_class[0]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[1]}%;transform:${labelShift(
                  data.label_positions[1],
                )}"
                >${data.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[2]}%;transform:${labelShift(
                  data.label_positions[2],
                )};color:${config.colors.normal}"
                >${data.setpoint_class[2]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[3]}%;transform:${labelShift(
                  data.label_positions[3],
                )}"
                >${data.setpoint_class[3]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[4]}%;transform:${labelShift(
                  data.label_positions[4],
                )}"
                >${data.setpoint_class[4]}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        style="display:flex;justify-content:space-between;align-items:center;padding:0 15px;margin-top:-5px;font-size:${config
          .display.name_font_size || '0.8em'};color:var(--secondary-text-color);"
      >
        <span
          style="${config.display.name_font_weight
            ? `font-weight:${config.display.name_font_weight}`
            : ''}"
        >
          ${data.title} ${data.status ? cardContent.generateSensorStatus(data.status) : ''}
          ${data.battery_icon
            ? html`<span class="battery-indicator" style="color: ${data.battery_color};">
                <ha-icon icon="${data.battery_icon}" style="--mdc-icon-size: 14px;"></ha-icon>
                ${data.battery_level != null ? html`${data.battery_level}%` : ''}
              </span>`
            : ''}
        </span>
        ${data.last_updated ? html`<span class="status-note">${data.last_updated}</span>` : ''}
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
        <div class="section-row">
          ${!data.hide_icon
            ? html`
                <div class="pool-monitor-entity-img">
                  ${data.is_mdi
                    ? html`
                        <ha-icon icon="${data.mdi_icon}" class="entity-icon-compact"></ha-icon>
                      `
                    : html` <img src="${data.img_src}" class="entity-icon-compact" /> `}
                </div>
              `
            : ''}
          <div class="sensor-gauge">
            <div class="pool-monitor-container">
              ${config.display.gradient
                ? html`
                    <div
                      class="progress-bar-child"
                      style="background: linear-gradient(to right,
                  ${data.monotonic_stops
                        ? data.monotonic_stops
                        : data.mode === 'heatflow'
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
                    <div class="gauge-scale">
                      <span>${(data as any).min}</span>
                      <span>${(data as any).max}</span>
                    </div>
                  `}
              <div
                class="cursor-text"
                style="border-${data.side_align}: 5px solid ${config.colors
                  .marker}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_cursor}%;${config
                  .display.name_font_size
                  ? `font-size:${config.display.name_font_size}`
                  : ''}${config.display.name_font_weight
                  ? `;font-weight:${config.display.name_font_weight}`
                  : ''}"
              >
                &nbsp; ${data.title} ${data.value != null ? `${data.value} ${data.unit}` : ','}
                ${data.separator} ${data.state}
                ${data.status ? cardContent.generateSensorStatus(data.status) : ''}
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
            <div class="gauge-labels">
              <span
                class="gauge-label"
                style="left: ${data.label_positions[0]}%;transform:${labelShift(
                  data.label_positions[0],
                )}"
                >${data.setpoint_class[0]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[1]}%;transform:${labelShift(
                  data.label_positions[1],
                )}"
                >${data.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[2]}%;transform:${labelShift(
                  data.label_positions[2],
                )};color:${config.colors.normal}"
                >${data.setpoint_class[2]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[3]}%;transform:${labelShift(
                  data.label_positions[3],
                )}"
                >${data.setpoint_class[3]}</span
              >
              <span
                class="gauge-label"
                style="left: ${data.label_positions[4]}%;transform:${labelShift(
                  data.label_positions[4],
                )}"
                >${data.setpoint_class[4]}</span
              >
            </div>
          </div>
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
