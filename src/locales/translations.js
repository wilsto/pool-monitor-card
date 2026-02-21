/**
 * @fileoverview Translation system for the Pool Monitor Card
 * @description Manages translations and localization for the card interface.
 * Supports multiple languages with fallback to English if a translation is missing.
 */

import en from './en.js';
import fr from './fr.js';
import es from './es.js';
import de from './de.js';
import it from './it.js';
import nl from './nl.js';
import pt from './pt.js';
import ptBR from './pt-br.js';
import ro from './ro.js';
import sk from './sk.js';
import he from './he.js';
import ru from './ru.js';
import hu from './hu.js';
import sv from './sv.js';
import cs from './cs.js';

/**
 * @const {Object} translations
 * @description Collection of all available translations indexed by language code
 * Supported languages:
 * - en: English
 * - fr: French
 * - es: Spanish
 * - de: German
 * - it: Italian
 * - nl: Dutch
 * - pt: Portuguese
 * - pt-br: Brazilian Portuguese
 * - ro: Romanian
 * - sk: Slovak
 * - he: Hebrew
 * - ru: Russian
 * - hu: Hungarian
 * - sv: Swedish
 * - cs: Czech
 */
export const translations = {
  en,
  fr,
  es,
  de,
  it,
  nl,
  pt,
  'pt-br': ptBR,
  ro,
  sk,
  he,
  ru,
  hu,
  sv,
  cs,
};

/**
 * @function getTranslation
 * @description Retrieves a translation for a given key in the specified language
 * @param {string} lang - Language code (e.g., 'en', 'fr')
 * @param {string} key - Translation key (can be nested using dot notation)
 * @returns {string} The translated text or the key itself if translation not found
 * @example
 * getTranslation('en', 'common.temperature') // returns "Temperature"
 * getTranslation('fr', 'common.temperature') // returns "Température"
 */
export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let result = translations[lang] || translations.en;

  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      return key; // Fallback to key if translation not found
    }
  }

  return result || key;
};

/**
 * @function formatTranslation
 * @description Formats a translation string by replacing placeholders with values
 * @param {string} translation - The translation string containing placeholders
 * @param {Object} values - Object containing values to replace placeholders
 * @returns {string} The formatted translation string
 * @example
 * formatTranslation("Hello {name}!", { name: "John" }) // returns "Hello John!"
 */
export const formatTranslation = (translation, values) => {
  if (!values) return translation;

  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, translation);
};
