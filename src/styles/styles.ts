/**
 * @fileoverview Styles definition for the Pool Monitor Card
 * @description This file contains all CSS styles used in the Pool Monitor Card component.
 * The styles are defined using LitElement's CSS template literals and use Home Assistant's CSS variables
 * for consistent theming across the application.
 */

import { css } from 'lit';

/**
 * @const {CSSResult} styles - CSS styles for the Pool Monitor Card
 * @description Defines all visual styles for the card including:
 * - Card layout and appearance
 * - Section layouts (normal and compact modes)
 * - Title styling
 * - Container layouts and positioning
 * - Marker and indicator styles
 * - Gradient and color transitions
 * - Responsive design adjustments
 *
 * The card container is an ha-card, so Home Assistant's own theming applies
 * without this file restating it. Remaining variables used here:
 * - --primary-text-color
 * - --secondary-text-color
 * - --warning-color
 */
export const styles = css`
  /**
   * The card renders an ha-card, which carries Home Assistant's own background,
   * radius, border and shadow, and which card-mod can target, as it does on
   * every other card. :host used to imitate all of that, which is why a
   * card-mod rule on ha-card matched nothing here (#1).
   */
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    transition: all 0.3s ease-out 0s;
    position: relative;
    padding-top: 25px;
  }

  /** Section layouts */
  .section {
    padding-bottom: 10px;
    padding: 0px;
  }

  /**
   * A sensor whose availability_entity reports off or unavailable.
   *
   * Both layouts, and the selector is one rule for that reason: the compact
   * row carried no marker at all until #148, so a probe unplugged three days
   * ago showed its last known value exactly as a live measurement would.
   * Splitting this in two is how the next one drifts.
   *
   * No backtick in this comment, deliberately: the stylesheet is a tagged
   * template literal and a backtick ends it.
   */
  .section.disabled,
  .section-compact.disabled {
    opacity: 0.4;
    filter: grayscale(0.8);
    pointer-events: none;
  }

  .section-compact {
    padding-bottom: 5px;
    padding: 0px;
  }

  /** Title styles */
  /**
   * The inset is logical, not physical (#121). The title follows the reading
   * direction, so in a Hebrew card it sits on the right, and a padding on the
   * left would hold its 15px on the empty side while the text touched the card
   * edge. Measured on the bench, that is what it did.
   */
  .pool-monitor-title {
    font-size: 1.5rem;
    font-weight: 500;
    padding-inline-start: 15px;
    padding-bottom: 15px;
    margin: 0;
  }

  /**
   * Entity image container, aligned to the end rather than to the right for
   * the reason above: the icon is meant to hug the bar it belongs to, and the
   * row that carries both flips with the reading direction. On a wide Hebrew
   * card the physical right left a 15px gap between bar and icon (#121).
   */
  .pool-monitor-entity-img {
    text-align: end;
    width: 10%;
    flex-shrink: 0;
    margin-top: 35px;
  }

  .section-compact .pool-monitor-entity-img {
    margin-top: 0;
  }

  .section-row {
    display: flex;
    align-items: flex-start;
  }

  /**
   * Unified gauge container, marker, bar, labels share same coordinate space.
   *
   * Declared a query container so that cqw inside it means one percent of the
   * gauge. That is what lets the value bubble clamp itself to the card in CSS
   * (markerShift, card-content.ts) instead of being measured in JS after every
   * render. Its own width never depends on its contents: it is a flex item
   * with flex 1 and min-width 0, so the flex line decides it.
   */
  .sensor-gauge {
    flex: 1;
    min-width: 0;
    container-type: inline-size;
  }

  .gauge-marker-zone {
    position: relative;
    height: 35px;
  }

  .gauge-marker-zone .marker {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 20px;
    padding: 2px 8px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    z-index: 2;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
  }

  .gauge-marker-zone .marker-state {
    font-size: 0.85em;
    font-weight: 400;
    opacity: 0.9;
  }

  /**
   * Rise and fall indicator, @arketec's design. Slightly faded and tightened
   * so a run of three triangles reads as one mark next to the value rather
   * than as three separate characters competing with it. The triangles are
   * drawn a little smaller than the value they annotate: they qualify it, they
   * are not the reading. Not smaller than this, though. A small triangle only
   * fills the upper half of its em box, so at 0.75em it stopped reading as a
   * direction on the bench and started reading as a dot.
   */
  .trend-arrow {
    font-size: 0.9em;
    letter-spacing: -1px;
    opacity: 0.85;
    margin: 0 2px;
  }

  /**
   * The mark that says the value has left the scale (#62), drawn at the end it
   * left. Unlike the trend beside it, this one is not a qualifier: it says the
   * cursor is no longer reporting a position, so it is not faded and it is not
   * shrunk. Full size and full opacity, a triangle pointing off the bar.
   *
   * It needs no colour of its own. The mark sits in the value bubble, which
   * paints its own background from the reading and its own text black, so it
   * reads the same in a dark theme as in a light one.
   */
  .out-of-scale {
    font-size: 1em;
    line-height: 1;
    letter-spacing: -1px;
    margin: 0 1px;
  }

  /**
   * Carries the trend for a screen reader while the chevrons carry it for the
   * eye. Clipped rather than hidden, because hiding it would take it out of
   * the accessibility tree along with everything else.
   */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .gauge-marker-zone .triangle {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    bottom: 0px;
    z-index: 2;
  }

  /** Main container layouts */
  .pool-monitor-container {
    display: grid;
    padding: 5px 0;
    height: 15px;
    position: relative;
  }

  .gauge-labels {
    position: relative;
    height: 18px;
    margin-top: -5px;
  }

  .gauge-label {
    position: absolute;
    transform: translateX(-50%);
    font-size: 0.8em;
    white-space: nowrap;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 0;
    grid-template-rows: 15px;
    line-height: 15px;
    position: relative;
    margin: 0px;
  }

  .grid-item {
    padding: 7px 0;
    margin: 0;
  }

  .grid-item-text-box {
    font-size: 0.8em;
    text-align: center;
    font-weight: 700;
  }

  .item-row {
    grid-row: 1;
  }

  .cursor {
    text-align: center;
    justify-self: center;
    font-size: 13px;
    font-weight: 600;
    color: black;
    position: absolute;
    z-index: 1;
  }

  /**
   * The compact layout's reading row, and the two-pixel marks that record the
   * lowest and highest readings of the day in both layouts.
   *
   * The width is the row's own content rather than the flat 200px it used to
   * be, because that is the length the clamp of markerShift() has to work
   * against: a fixed 200px pushed a three-character row a fifth of the bar
   * away from the value it reports, and a row longer than 200px overflowed its
   * own box anyway. The min and max marks set width inline, so they keep the
   * two pixels they are.
   */
  .cursor-text {
    position: absolute;
    width: max-content;
    height: 15px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 0px;
    top: 5px;
    font-size: 11px;
    font-weight: 500;
    text-align: right;
    color: black;
    z-index: 1;
  }

  /**
   * The compact layout's cursor, the counterpart of .triangle above.
   *
   * It used to be a border on the reading row itself, which was fine only for
   * as long as the row never moved. The row now slides to stay inside the card
   * (#144), and a cursor carried along by it would report a value the reading
   * is no longer next to, so the two are separate elements: the reading
   * slides, the mark stays on the value.
   */
  .compact-cursor {
    position: absolute;
    width: 5px;
    height: 15px;
    top: 5px;
    z-index: 1;
  }

  .progress-bar-child {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  .sensor-monitor-container {
    position: relative;
    height: 20px;
    margin: 0px 0px 0px 0px;
    border-radius: 5px;
    overflow: hidden;
  }

  .status-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px 10px;
    cursor: pointer;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
    color: white;
    text-transform: capitalize;
  }

  .status-badge ha-icon {
    color: white;
  }

  .status-friendly-name {
    font-size: 0.8em;
    color: var(--secondary-text-color, #888);
  }

  /**
   * Static sizing lives here, not in inline style attributes. An inline style
   * beats any injected stylesheet by specificity, so card-mod could not reach
   * these, which is what @apsmith12 ran into asking to adjust element and font
   * sizes (#1). Dynamic values (computed positions, colours from the reading)
   * stay inline: they change per render.
   */
  .entity-icon {
    width: 32px;
    height: 32px;
  }

  .entity-icon-compact {
    width: 24px;
    height: 24px;
  }

  .gauge-scale {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    font-size: 0.7em;
    color: var(--secondary-text-color);
  }

  .status-note {
    font-size: 0.85em;
    opacity: 0.7;
  }

  /* The accent bar and the icon gap follow the reading direction. They were
     physical, and a warning is the one thing on this card that is a sentence:
     translating it (#122) is what puts it in front of a Hebrew reader, where
     the flex row reverses and both landed on the empty side. Same fix as the
     title inset in #121, and identical rendering in a left-to-right card. */
  .warning-message {
    background-color: var(--warning-color, rgba(255, 152, 0, 0.1));
    border-inline-start: 4px solid var(--warning-color, #ff9800);
    border-radius: 4px;
    padding: 12px 16px;
    margin: 8px 0;
    color: var(--warning-text-color, var(--primary-text-color));
    font-size: 0.95em;
    line-height: 1.4;
    display: flex;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .warning-message ha-icon {
    color: var(--warning-color, #ff9800);
    margin-inline-end: 12px;
    flex-shrink: 0;
  }

  .battery-indicator {
    font-size: 9px;
    vertical-align: middle;
    margin-left: 4px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* The device's own battery, shown once beside the card status rather than
     repeated on every measurement (pool-monitor-card#81). */
  .card-battery {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-left: 8px;
    font-size: 0.8em;
    font-weight: 600;
  }

  /* The reading in the worst band of its scale, blinking (#123).
     Asked for by @rpirsc13 on wilsto/air-quality-card#4 as blink_threshold,
     and asked for as an animation: a colour that changes is only seen by
     someone already looking, motion is seen by someone walking past.

     (No backticks anywhere in this file. It is one tagged template literal, so
     a backtick in a comment ends the stylesheet and the parse error lands
     dozens of lines later on whatever follows.)

     A fade rather than a switch, and a slow one: 1.4s is 0.71 Hz, where the
     general and red flash thresholds of WCAG 2.3.1 start at 3 Hz. Nothing here
     comes near a seizure risk, and the gap is left wide on purpose because the
     screen of a home dashboard stays lit all day.

     Only opacity is animated. It is one of the two properties a browser can
     composite without laying the row out again, so the number does not reflow
     and the bubble does not jitter against the clamp of #70. Animating the
     colour instead would have fought the band colour the same element carries.

     0.35 rather than 0: a reading that disappears is a reading someone reads at
     the wrong moment and gets nothing from, which on carbon monoxide is the
     opposite of the point. It dims, it does not go away. */
  .blink {
    animation: blink 1.4s ease-in-out infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0.35;
    }
  }

  /* Someone who asked for less motion has a reason, and vestibular disorders
     are the common one. Switching the animation off is the easy half.

     The half that is easy to skip: the reason for the motion does not go away
     with it, so it is replaced rather than deleted. A static ring says the same
     "look here" without moving, which is what the W3C guidance on this query
     asks for. currentColor because the ring then inherits whatever the row
     already uses for text: black inside the value bubble, the theme's text
     colour in the compact row, legible in both without a rule per theme.

     The verdict itself was never carried by the motion. The band colour and the
     band name, Very Poor or Too High, translated, are on the row either way and
     are what a screen reader is given. The blink adds urgency to information
     that is already there, which is exactly why removing it loses nothing. */
  @media (prefers-reduced-motion: reduce) {
    .blink {
      animation: none;
      outline: 2px solid currentColor;
      outline-offset: 2px;
      border-radius: 3px;
    }
  }

  /* The status of one measurement, next to its name (pool-monitor-card#82). */
  .sensor-status {
    display: inline-block;
    margin-left: 6px;
    padding: 0 6px;
    border-radius: 8px;
    font-size: 0.7em;
    font-weight: 700;
    line-height: 1.5;
    color: #ffffff;
    vertical-align: middle;
    cursor: pointer;
  }
`;
