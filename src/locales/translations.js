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
  ru
};

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

export const formatTranslation = (translation, values) => {
  if (!values) return translation;
  
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, translation);
};
