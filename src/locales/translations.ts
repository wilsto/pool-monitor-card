import type { TranslationSet } from '../ha/types.js';

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

export const translations: Record<string, TranslationSet> = {
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
 * Looks a key up in `lang`, falling back to English key by key.
 *
 * A key missing from a locale used to be rendered raw — a French user saw
 * `sensor.humidity` instead of a name. That forced every new sensor to arrive
 * with fifteen translations at once, or not at all: either someone invents
 * Hungarian and Hebrew they cannot verify, or users get nothing.
 *
 * English is the language every locale file is written against, so falling back
 * to it turns a broken label into a merely untranslated one, and a contributor
 * can improve it later without anyone being blocked meanwhile.
 */
const lookup = (set: TranslationSet | undefined, key: string): string | undefined => {
  let result: any = set;
  for (const k of key.split('.')) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      return undefined;
    }
  }
  return typeof result === 'string' ? result : undefined;
};

export const getTranslation = (lang: string, key: string): string =>
  lookup(translations[lang], key) ?? lookup(translations.en, key) ?? key;

export const formatTranslation = (
  translation: string,
  values?: Record<string, string | number>,
): string => {
  if (!values) return translation;

  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, String(value));
  }, translation);
};
