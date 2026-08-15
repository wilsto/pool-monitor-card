import type { HaFormSchema } from './types.js';
import { translations } from '../locales/translations.js';

/**
 * The language menu is derived from the translations registry — never a second
 * hand-maintained list. The two had drifted: three languages were offered with
 * nothing behind them (`pl`, `zh-cn`, `zh-tw`, falling back to English in
 * silence) while six translated ones were unreachable, including three
 * community contributions.
 *
 * Each locale declares its own name, so adding a translation adds its menu
 * entry with no second edit.
 *
 * Intl.DisplayNames was tried first and rejected: Chrome resolves it to the
 * browser's locale whatever you request — measured 2026-08-15, a French
 * browser listed every language in French ("Anglais", "Allemand"). Node does
 * honour the request, so a unit test would have passed while production was
 * wrong.
 */
export const LANGUAGE_OPTIONS: { value: string; label: string }[] = Object.entries(
  translations,
).map(([code, set]) => ({ value: code, label: set.language || code }));

export const GENERAL_SCHEMA: HaFormSchema[] = [
  { name: 'title', selector: { text: {} } },
  { name: 'status_entity', label: 'Status entity', selector: { entity: {} } },
];

export const DISPLAY_SCHEMA: HaFormSchema[] = [
  { name: 'compact', selector: { boolean: {} } },
  { name: 'show_names', selector: { boolean: {} } },
  { name: 'show_labels', selector: { boolean: {} } },
  { name: 'show_last_updated', selector: { boolean: {} } },
  { name: 'show_icons', selector: { boolean: {} } },
  { name: 'show_units', selector: { boolean: {} } },
  { name: 'gradient', selector: { boolean: {} } },
  {
    name: 'language',
    selector: {
      select: {
        options: LANGUAGE_OPTIONS,
      },
    },
  },
  { name: 'name_font_size', label: 'Name font size (e.g. 0.8em, 14px)', selector: { text: {} } },
  {
    name: 'name_font_weight',
    label: 'Name font weight',
    selector: {
      select: {
        options: [
          { value: '', label: 'Default' },
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: '300', label: 'Light (300)' },
          { value: '600', label: 'Semi-bold (600)' },
        ],
      },
    },
  },
];

export const COLORS_SCHEMA: HaFormSchema[] = [
  { name: 'low', label: 'Low', selector: { text: {} } },
  { name: 'warn', label: 'Warn', selector: { text: {} } },
  { name: 'normal', label: 'Normal', selector: { text: {} } },
  { name: 'cool', label: 'Cool', selector: { text: {} } },
  { name: 'marker', label: 'Marker', selector: { text: {} } },
  { name: 'hi_low', label: 'Hi/Low', selector: { text: {} } },
];
