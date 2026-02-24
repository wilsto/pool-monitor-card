import type { HomeAssistant, CardConfig } from '../ha/types.js';

// HA's LovelaceCardEditor interface (not in npm packages, define locally)
export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: CardConfig): void;
}

// ha-form schema types (matches HA frontend API)
export interface HaFormSchema {
  name: string;
  label?: string;
  default?: unknown;
  required?: boolean;
  selector: HaFormSelector;
}

export type HaFormSelector =
  | { text: { multiline?: boolean } }
  | { boolean: Record<string, never> }
  | { number: { min?: number; max?: number; step?: number; mode?: 'box' | 'slider' } }
  | { select: { options: Array<{ value: string; label: string }> | string[] } }
  | { entity: { domain?: string; device_class?: string } }
  | { icon: { placeholder?: string } };

// fireEvent helper (standard HA pattern)
export function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
}
