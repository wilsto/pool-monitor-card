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

export const getTranslation = (lang: string, key: string): string => {
  const keys = key.split('.');
  let result: any = translations[lang] || translations.en;

  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      return key;
    }
  }

  return result || key;
};

export const formatTranslation = (
  translation: string,
  values?: Record<string, string | number>,
): string => {
  if (!values) return translation;

  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, String(value));
  }, translation);
};
