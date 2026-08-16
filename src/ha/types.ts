import { HassEntity } from 'home-assistant-js-websocket';

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
  category?: 'water_chemistry' | 'chemical_balance' | 'treatment' | 'equipment';
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
}

export interface CardConfig {
  title?: string;
  status_entity?: string;
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
  disabled?: boolean;
  battery_level?: number | null;
  battery_icon?: string;
  battery_color?: string;
}

export interface TranslationSet {
  /** The language's own name, as its speakers write it. Drives the editor menu. */
  language: string;
  state: Record<string, string>;
  sensor: Record<string, string>;
  time: Record<string, string>;
  time_plural: Record<string, string>;
}
