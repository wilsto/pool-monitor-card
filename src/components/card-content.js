import { html } from 'lit';

/**
 * @class cardContent
 * @description Class responsible for generating the HTML content of the pool monitor card
 */
export class cardContent {
  /**
   * @static
   * @method generateTitle
   * @description Generates the title section of the card
   * @param {Object} config - The card configuration
   * @param {string} [config.title] - Optional title to display
   * @returns {TemplateResult} The rendered title HTML
   */
  static generateTitle(config) {
    const title =
      config.title !== undefined
        ? html` <h1 class="pool-monitor-title">${config.title}</h1> `
        : html``;

    return html`${title}`;
  }

  /**
   * @static
   * @method generateBody
   * @description Generates the main body content of the card
   * @param {Object} config - The card configuration
   * @param {Object} data - The sensor data to display
   * @param {string} data.name - Sensor name
   * @param {string} data.entity - Entity ID
   * @param {string} data.color - Color for the marker
   * @param {number} data.pct_marker - Percentage position for the marker
   * @param {string} data.value - Current sensor value
   * @param {string} data.unit - Unit of measurement
   * @param {string} data.state - Current state text
   * @param {string} data.side_align - Alignment direction
   * @param {number} data.pct_state_step - Percentage position for state
   * @param {boolean} data.hide_icon - Whether to hide the icon
   * @param {boolean} data.is_mdi - Whether the icon is an MDI icon
   * @param {string} [data.mdi_icon] - MDI icon name if is_mdi is true
   * @param {string} [data.img_src] - Image source if is_mdi is false
   * @returns {TemplateResult} The rendered body HTML
   */
  static generateBody(config, data) {
    if (!data) {
      return html` <div class="warning-message">No sensor data available</div> `;
    }
    return html`
      <!-- ##### ${data.name} section ##### -->
      <div class="section" @click=${() => cardContent._moreinfo(data.entity)}>
        <div class="pool-monitor-container-marker">
          <div
            class="marker"
            style="background-color: ${data.color} ;color: black;left: ${data.pct_marker}%;"
          >
            ${data.value} ${data.unit}
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
                  <span>${data.min}</span>
                  <span>${data.max}</span>
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
        ${data.title}<br /><small style="position: relative;top:-5px;font-size:9px;color:lightgrey"
          >${data.last_updated}</small
        >
      </div>
    `;
  }

  /**
   * @static
   * @method generateCompactBody
   * @description Generates the compact body content of the card
   * @param {Object} config - The card configuration
   * @param {Object} data - The sensor data to display
   * @param {string} data.name - Sensor name
   * @param {string} data.entity - Entity ID
   * @param {string} data.color - Color for the marker
   * @param {number} data.pct_marker - Percentage position for the marker
   * @param {string} data.value - Current sensor value
   * @param {string} data.unit - Unit of measurement
   * @param {string} data.state - Current state text
   * @param {string} data.side_align - Alignment direction
   * @param {number} data.pct_state_step - Percentage position for state
   * @param {boolean} data.hide_icon - Whether to hide the icon
   * @param {boolean} data.is_mdi - Whether the icon is an MDI icon
   * @param {string} [data.mdi_icon] - MDI icon name if is_mdi is true
   * @param {string} [data.img_src] - Image source if is_mdi is false
   * @returns {TemplateResult} The rendered compact body HTML
   */
  static generateCompactBody(config, data) {
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
                  <!-- <div style="background-color: transparent; grid-column: 1 ; border: 0px; box-shadow:none" class="grid-item item-row"> <div style="font-size: 0.8em;color:lightgrey;text-align:left;margin:3px 2px 0 0 ">${data.unit}</div></div> -->
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
                  <span>${data.min}</span>
                  <span>${data.max}</span>
                </div>
              `}
          <div
            class="cursor-text"
            style="border-${data.side_align}: 5px solid ${config.marker}; text-align:${data.side_align};background-color:transparent ;${data.side_align}: ${data.pct_cursor}%;"
          >
            &nbsp; ${data.title} ${data.value} ${data.unit} ${data.separator} ${data.state} &nbsp;
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

  /**
   * @static
   * @method _moreinfo
   * @description Dispatches a more-info event for the given entity
   * @param {string} entity - Entity ID
   */
  static _moreinfo(entity) {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    event.detail = { entityId: entity };
    const homeAssistant = document.querySelector('home-assistant');
    if (homeAssistant) {
      homeAssistant.dispatchEvent(event);
    }
  }
}
