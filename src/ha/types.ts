import { HassEntity } from 'home-assistant-js-websocket';
import type { Trend } from '../trend.js';
import type { ScaleOverflow } from '../scale.js';

export type { HassEntity };

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, EntityRegistryEntry>;
  language: string;
  locale: {
    language: string;
  };
}

export interface EntityRegistryEntry {
  entity_id: string;
  display_precision?: number;
}

export interface SensorPreset {
  name: string;
  unit: string;
  /**
   * A preset drives its scale either from setpoint/step or from explicit
   * `limits`. Carbon monoxide, for instance, has published thresholds that are
   * not evenly spaced, so inventing a setpoint and a step for it would be
   * making up a shape the standard does not have.
   */
  setpoint?: number;
  step?: number;
  step_low?: number;
  step_high?: number;
  limits?: number[];
  direction?: 'lower_is_better' | 'higher_is_better';
  mode?: 'centric' | 'heatflow';
  /**
   * MDI icon for presets that have no artwork. Cards with an IMAGE_BASE_URL
   * otherwise look for `<key>.png` and render a broken image when it is absent.
   */
  icon?: string;
  min_limit?: number;
  override?: string;
  /**
   * Which section of the editor's preset picker this sensor is filed under.
   *
   * A free key, not a closed list: the four values written here were pool's
   * own (water chemistry, treatment, equipment), so an aquarium or an air
   * preset could not carry a category at all and every one of them fell into
   * "Other". A card names its own sections.
   *
   * The key is looked up as `editor.category.<key>`, so a category with no
   * English label surfaces its raw key in the picker. That is what
   * `core/tests/sensor-categories.test.js` refuses, and it is the check the
   * closed list used to stand in for. A preset with no category is filed under
   * "Other", which always sits last.
   */
  category?: string;
}

export type SensorsRegistry = Record<string, SensorPreset>;

export interface CardInfo {
  cardType: string;
  cardName: string;
  cardDescription: string;
}

export interface DisplayConfig {
  compact: boolean;
  show_names: boolean;
  show_labels: boolean;
  show_last_updated: boolean;
  show_icons: boolean;
  show_units: boolean;
  gradient: boolean;
  language: string;
  name_font_size?: string;
  name_font_weight?: string;
}

export interface ColorConfig {
  low: string;
  warn: string;
  normal: string;
  /**
   * The second band of a monotonic scale, still acceptable, no longer ideal.
   * A centric scale has no use for it: it reads good outwards to bad in both
   * directions and never needs a fifth step.
   */
  fair: string;
  cool: string;
  hazardous: string;
  marker: string;
  hi_low: string;
}

export interface SensorUserConfig {
  entity: string;
  title?: string;
  name?: string;
  /** Number = scale boundary. String = tracking entity placing a marker. */
  min?: string | number;
  max?: string | number;
  /** Read this attribute of the entity instead of its state. */
  attribute?: string;
  /** A status published for this measurement alone, shown next to it. */
  status_entity?: string;
  /** Four explicit class boundaries. Replaces the setpoint/step computation. */
  limits?: number[];
  /** Colour ramp direction when `limits` is used. Defaults to lower_is_better. */
  direction?: 'lower_is_better' | 'higher_is_better';
  setpoint?: number;
  step?: number;
  step_low?: number;
  step_high?: number;
  unit?: string;
  icon?: string;
  image_url?: string;
  mode?: 'centric' | 'heatflow';
  min_limit?: number;
  override_value?: string;
  override?: boolean;
  invalid?: boolean;
  nameDefinedByUser?: boolean;
  availability_entity?: string;
  last_updated_entity?: string;
  last_updated_attribute?: string;
  setpoint_entity?: string;
  min_limit_entity?: string;
  battery_entity?: string;
  /**
   * A Home Assistant `derivative` helper watching this measurement. Its sign
   * gives the direction of the chevron, its magnitude the number of chevrons.
   */
  derivative_entity?: string;
  /** How much slope is worth one chevron, and the floor below which none shows. */
  derivative_scale?: number;
}

export interface CardConfig {
  title?: string;
  status_entity?: string;
  /** One battery for the whole device, rather than one per measurement. */
  battery_entity?: string;
  display: DisplayConfig;
  colors: ColorConfig;
  sensors: Record<string, SensorUserConfig | SensorUserConfig[]>;
}

export interface StatusData {
  label: string;
  color: string;
  icon: string;
  friendly_name?: string;
  entity_id: string;
}

export interface SensorData {
  name: string;
  invalid: boolean;
  not_found?: boolean;
  /**
   * No four `limits` and no setpoint from any source, so nothing to judge the
   * reading against (#98). Set instead of a scale, never beside one: the
   * fields below it are never filled when it is true, because computing them
   * would mean inventing the reference that is missing.
   */
  no_scale?: boolean;
  mode: string;
  title: any;
  hide_icon: boolean;
  is_mdi: boolean;
  mdi_icon?: string;
  img_src?: string;
  value: number | null;
  entity: string;
  last_updated?: string;
  unit: string;
  min_value: number;
  max_value: number;
  bar_min: number;
  bar_max: number;
  setpoint: number;
  setpoint_class: string[];
  separator: string;
  color: string;
  state: string;
  progressClass: string;
  pct: string;
  pct_min: string | number;
  pct_max: string | number;
  pct_marker: number;
  side_align: string;
  pct_cursor: number;
  pct_state_step: number;
  label_positions: number[];
  /**
   * Colour stops for a monotonic bar, already in reading order and positioned
   * on the thresholds themselves. Absent on centric and heatflow scales, which
   * keep their own fixed gradient.
   */
  monotonic_stops?: string;
  /** Resolved from the sensor's own `status_entity`, null when it has none. */
  status?: StatusData | null;
  disabled?: boolean;
  battery_level?: number | null;
  battery_icon?: string;
  battery_color?: string;
  /** Chevrons to paint, `null` direction when the measurement is steady or silent. */
  trend?: Trend | null;
  /** What a screen reader announces, already translated. Empty when silent. */
  trend_label?: string;
  /**
   * Which end of the bar the value sits past, `null` when it is on the scale.
   * The position alone cannot say it: the ratio is clamped to the bar (#62).
   */
  out_of_scale?: ScaleOverflow | null;
  /** What a screen reader announces, already translated. Empty when on scale. */
  out_of_scale_label?: string;
}

/**
 * The names written under the bars, in one language.
 *
 * Most keys are a preset (`ph`, `temperature`) and the value is the name
 * itself. The four cards share that table and are right to: of the forty-three
 * presets, most mean the same thing everywhere. `pressure` does not, it is the
 * filter on a pool and the weather on an air monitor.
 *
 * So a key may be a card type instead of a preset, and its value a table of
 * the names that card keeps for itself. `MonitorCardBase.sensorName()` reads
 * the scoped table first and falls back to the shared name.
 */
export interface SensorNames {
  [preset: string]: string | Record<string, string>;
  /**
   * A card type never holds a name of its own, only that card's table. The
   * pattern is the card family, `pool-monitor-card` and its siblings; a card
   * named outside it still works, it simply gets no guard here.
   */
  [cardType: `${string}-monitor-card`]: Record<string, string>;
}

export interface TranslationSet {
  /** The language's own name, as its speakers write it. Drives the editor menu. */
  language: string;
  state: Record<string, string>;
  sensor: SensorNames;
  time: Record<string, string>;
  time_plural: Record<string, string>;
}
