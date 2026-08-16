import { getTranslation } from '../locales/translations.js';
import type { HomeAssistant } from '../ha/types.js';

/**
 * Translates an editor label.
 *
 * The editor follows `hass.language`, deliberately, and not the card's
 * `display.language`. Those two answer different questions: the display
 * language is what viewers of the card read, while the editor is read by
 * whoever is configuring it. Someone can perfectly well build a Hungarian card
 * from a French Home Assistant.
 *
 * A key missing from a locale falls back to English, which is what lets a new
 * label ship without waiting for seventeen translations.
 */
export const editorText = (hass: HomeAssistant | undefined, key: string): string =>
  getTranslation((hass as any)?.language || 'en', `editor.${key}`);
