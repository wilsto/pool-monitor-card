import type { HaFormSchema } from './types.js';

export const GENERAL_SCHEMA: HaFormSchema[] = [
  { name: 'title', selector: { text: {} } },
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
        options: [
          { value: 'en', label: 'English' },
          { value: 'fr', label: 'Français' },
          { value: 'de', label: 'Deutsch' },
          { value: 'es', label: 'Español' },
          { value: 'it', label: 'Italiano' },
          { value: 'pt', label: 'Português' },
          { value: 'nl', label: 'Nederlands' },
          { value: 'pl', label: 'Polski' },
          { value: 'sk', label: 'Slovenčina' },
          { value: 'pt-br', label: 'Português (Brasil)' },
          { value: 'zh-cn', label: '中文 (简体)' },
          { value: 'zh-tw', label: '中文 (繁體)' },
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
