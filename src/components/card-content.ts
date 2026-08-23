import { html, TemplateResult } from 'lit';
import type { CardConfig, SensorData, StatusData } from '../ha/types.js';
import { trendGlyphs } from '../trend.js';
import { overflowGlyph, type ScaleOverflow } from '../scale.js';
import { getTranslation } from '../locales/translations.js';

/**
 * The row-level refusal, in the card's language.
 *
 * The banners a user actually meets live in `card-base.ts`, above the split
 * between the two layouts. This one is the guard both layouts keep for a row
 * with no data at all, so it is written twice by construction, and it is
 * translated here rather than in the base for that reason alone.
 */
const noData = (config: CardConfig): string =>
  getTranslation(config?.display?.language || 'en', 'warning.no_data');

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
 * Horizontal offset for the value bubble.
 *
 * Same defect as `labelShift`, one row higher and much wider: the bubble is
 * centred on its position, so half of it leaves the card as soon as the value
 * lands within half a bubble of either end of the scale. `ha-card` clips its
 * overflow, so a pool ORP at 825 with `setpoint: 700` showed `Too High 825 m`
 * and an air-quality humidity row lost the end of `Too High 58` (#70). The
 * bottom of the scale fails the same way; the icon column just absorbs the
 * first few pixels, and nothing absorbs them when `hide_icon` is set.
 *
 * Clamping needs two lengths the same expression cannot usually name: the
 * width of the gauge and the width of the bubble. CSS has both here. `cqw` is
 * one percent of the gauge, which `.sensor-gauge` declares as a query
 * container, and a percentage inside a transform is a percentage of the
 * element's own width. So the browser resolves what JS would otherwise have to
 * measure after every render:
 *
 *   left edge = clamp(0, position - bubble/2, gauge - bubble)
 *
 * A bubble wider than the whole gauge pins to the left edge, since `clamp()`
 * returns its minimum when the bounds cross: the value keeps its start, which
 * is where it is read from.
 *
 * The triangle below keeps its own offset. The bubble slides, the cursor stays
 * on the value it reports.
 */
export const markerShift = (position: number): string => {
  const pct = Math.max(0, Math.min(100, position));
  const fromStart = Number(pct.toFixed(2));
  const fromEnd = Number((100 - pct).toFixed(2));
  return `translateX(clamp(${-fromStart}cqw, -50%, calc(${fromEnd}cqw - 100%)))`;
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
          ${status.icon
            ? html`<ha-icon icon="${status.icon}" style="--mdc-icon-size: 16px;"></ha-icon>`
            : ''}
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

  /**
   * The rise and fall indicator, @arketec's design (see `src/trend.ts`).
   *
   * The triangles are hidden from assistive technology and the direction is
   * spoken instead: a screen reader reading `▴▴▴` announces nothing useful, so
   * the glyph alone would make the trend visible to sighted users only.
   *
   * Both directions sit after the value, where @arketec put falling before the
   * badge and rising after it. His glyphs pointed left and right, so the split
   * followed the glyph; these point up and down and have no horizontal pull.
   * A fixed side also keeps the number still: the marker is centred on its
   * position, so growing it on alternating sides would shift the value
   * sideways every time the trend flipped.
   */
  static generateTrend(data: SensorData): TemplateResult | string {
    const glyphs = trendGlyphs(data.trend);
    if (!glyphs) return '';

    return html`<span class="trend-arrow" aria-hidden="true">${glyphs}</span
      ><span class="sr-only">${data.trend_label || ''}</span>`;
  }

  /**
   * The out-of-scale mark, at the end of the scale the value left (#62).
   *
   * It rides in the value bubble rather than on the cursor, for two reasons
   * that both come down to the bubble being the only thing on this row that
   * can carry text. The mark has to be spoken as well as drawn, exactly as the
   * trend is, and a cursor is a CSS triangle with nothing to say. And the
   * bubble is where the number is read, so the mark is next to the reading it
   * qualifies rather than a row below it.
   *
   * `end` selects which side is being rendered: the mark is drawn outside the
   * value, so it comes before it at the bottom of the scale and after it at
   * the top, and each call site asks for its own end. The bubble's colours are
   * set on the bubble itself, a solid background from the reading and black
   * text, so the mark is as legible in a dark theme as in a light one without
   * a rule of its own.
   *
   * It costs a few pixels of bubble, which the clamp of #70 absorbs: a wider
   * bubble simply slides further from the edge, and the cursor stays on the
   * value. It is the only place the two corrections touch.
   */
  static generateOutOfScale(data: SensorData, end: ScaleOverflow): TemplateResult | string {
    if (data.out_of_scale !== end) return '';

    const glyph = overflowGlyph(data.out_of_scale);
    if (!glyph) return '';

    return html`<span class="out-of-scale" aria-hidden="true">${glyph}</span
      ><span class="sr-only">${data.out_of_scale_label || ''}</span>`;
  }

  /**
   * The reading itself, a number and its unit, isolated from the text around
   * it (#121).
   *
   * `<bdi>` is the standard remedy for exactly this shape, a run whose own
   * direction is not the paragraph's: it wraps the run in a bidi isolate, so
   * the reordering algorithm treats it as one opaque object instead of
   * shuffling its pieces against the neighbours.
   *
   * Without it, the bubble of a Hebrew card is laid out at the paragraph's
   * right-to-left level and `25.7 °C` comes apart. The degree sign is a
   * European Number Terminator with no number adjacent to it, so it resolves
   * as a neutral, takes the paragraph direction, and lands on the far side of
   * the `C`: the bench painted `C° 25.7` (measured on #121, four cards, HA
   * interface in Hebrew). The compact layout escaped it by accident, its
   * sensor name is a strong left-to-right letter right before the number and
   * pulled the whole run along; that accident is not a design, hence the same
   * call on both.
   *
   * In a left-to-right card this renders exactly what the bare text rendered:
   * an isolate around a left-to-right run inside a left-to-right paragraph is
   * a no-op.
   */
  static generateReading(data: SensorData): TemplateResult | string {
    if (data.value == null) return ',';
    return html`<bdi>${data.value} ${data.unit}</bdi>`;
  }

  static generateBody(config: CardConfig, data: SensorData): TemplateResult {
    if (!data) {
      return html` <div class="warning-message">${noData(config)}</div> `;
    }
    const markerPct = data.pct_marker;
    const bubbleTransform = markerShift(markerPct);
    const cursorTransform =
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
                style="background-color: ${data.color};color: black;left: ${markerPct}%;transform: ${bubbleTransform};"
              >
                ${cardContent.generateOutOfScale(data, 'below')}
                ${data.side_align === 'right' && data.state
                  ? html`<span class="marker-state">${data.state}</span>`
                  : ''}
                ${cardContent.generateReading(data)}
                ${data.side_align === 'left' && data.state
                  ? html`<span class="marker-state">${data.state}</span>`
                  : ''}
                ${cardContent.generateTrend(data)} ${cardContent.generateOutOfScale(data, 'above')}
              </div>
              <div
                class="triangle"
                style="border-top: 8px solid ${data.color};left: ${markerPct}%;transform: ${cursorTransform};"
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
      return html` <div class="warning-message">${noData(config)}</div> `;
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
                &nbsp; ${data.title} ${cardContent.generateOutOfScale(data, 'below')}
                ${cardContent.generateReading(data)} ${cardContent.generateTrend(data)}
                ${cardContent.generateOutOfScale(data, 'above')} ${data.separator} ${data.state}
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
