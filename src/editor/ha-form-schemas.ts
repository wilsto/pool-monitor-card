import type { HaFormSchema } from './types.js';
import { translations } from '../locales/translations.js';
import { DEFAULT_COLORS } from '../configs/config.js';

/** Resolves an editor label. Supplied by the editor, which knows the language. */
type Translate = (key: string) => string;

/**
 * The language menu is derived from the translations registry, never a second
 * hand-maintained list. The two had drifted: three languages were offered with
 * nothing behind them (`pl`, `zh-cn`, `zh-tw`, falling back to English in
 * silence) while six translated ones were unreachable, including three
 * community contributions.
 *
 * Each locale declares its own name, so adding a translation adds its menu
 * entry with no second edit.
 *
 * Intl.DisplayNames was tried first and rejected: Chrome resolves it to the
 * browser's locale whatever you request, measured 2026-08-15, a French
 * browser listed every language in French ("Anglais", "Allemand"). Node does
 * honour the request, so a unit test would have passed while production was
 * wrong.
 */
export const LANGUAGE_OPTIONS: { value: string; label: string }[] = Object.entries(
  translations,
).map(([code, set]) => ({ value: code, label: set.language || code }));

export const generalSchema = (t: Translate): HaFormSchema[] => [
  { name: 'title', label: t('card_title'), selector: { text: {} } },
  { name: 'status_entity', label: t('status_entity'), selector: { entity: {} } },
];

export const displaySchema = (t: Translate): HaFormSchema[] => [
  { name: 'compact', label: t('compact'), selector: { boolean: {} } },
  { name: 'show_names', label: t('show_names'), selector: { boolean: {} } },
  { name: 'show_labels', label: t('show_labels'), selector: { boolean: {} } },
  { name: 'show_last_updated', label: t('show_last_updated'), selector: { boolean: {} } },
  { name: 'show_icons', label: t('show_icons'), selector: { boolean: {} } },
  { name: 'show_units', label: t('show_units'), selector: { boolean: {} } },
  { name: 'gradient', label: t('gradient'), selector: { boolean: {} } },
  {
    name: 'language',
    label: t('language'),
    selector: {
      select: {
        options: LANGUAGE_OPTIONS,
      },
    },
  },
  { name: 'name_font_size', label: t('name_font_size'), selector: { text: {} } },
  {
    name: 'name_font_weight',
    label: t('name_font_weight'),
    selector: {
      select: {
        options: [
          { value: '', label: t('font_weight.default') },
          { value: 'normal', label: t('font_weight.normal') },
          { value: 'bold', label: t('font_weight.bold') },
          { value: '300', label: t('font_weight.light') },
          { value: '600', label: t('font_weight.semi_bold') },
        ],
      },
    },
  },
];

/**
 * Derived from the palette, never a hand-written list. The two had already
 * drifted: `hazardous` was missing since it was added, and `fair` was missing
 * the day it landed, so neither colour could be changed from the editor while
 * both are used on screen.
 *
 * This is the same failure as the language menu, the options table and the
 * documented CSS classes. A second list always ends up lying.
 */
export const colorsSchema = (t: Translate): HaFormSchema[] =>
  Object.keys(DEFAULT_COLORS).map(name => ({
    name,
    label: t(`color.${name}`),
    selector: { text: {} },
  }));
