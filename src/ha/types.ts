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
  setpoint: number;
  step: number;
  step_low?: number;
  step_high?: number;
  mode: 'centric' | 'heatflow';
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
}

export interface ColorConfig {
  low: string;
  warn: string;
  normal: string;
  cool: string;
  marker: string;
  hi_low: string;
}

export interface SensorUserConfig {
  entity: string;
  title?: string;
  name?: string;
  min?: string;
  max?: string;
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
}

export interface CardConfig {
  title?: string;
  display: DisplayConfig;
  colors: ColorConfig;
  sensors: Record<string, SensorUserConfig | SensorUserConfig[]>;
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
  disabled?: boolean;
}

export interface TranslationSet {
  state: Record<string, string>;
  sensor: Record<string, string>;
  time: Record<string, string>;
  time_plural: Record<string, string>;
}
