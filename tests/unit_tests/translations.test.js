import { describe, test, expect } from 'vitest';
import en from '../../src/locales/en.js';
import de from '../../src/locales/de.js';
import es from '../../src/locales/es.js';
import fr from '../../src/locales/fr.js';
import he from '../../src/locales/he.js';
import it from '../../src/locales/it.js';
import nl from '../../src/locales/nl.js';
import ptBR from '../../src/locales/pt-br.js';
import pt from '../../src/locales/pt.js';
import ro from '../../src/locales/ro.js';
import ru from '../../src/locales/ru.js';
import sk from '../../src/locales/sk.js';

const allLocales = {
  en, de, es, fr, he, it, nl, 'pt-br': ptBR, pt, ro, ru, sk
};

describe('Translation files', () => {
  // Test 1: Syntax validation
  test('All translation files have valid syntax', () => {
    Object.entries(allLocales).forEach(([locale, translations]) => {
      expect(() => JSON.stringify(translations))
        .not.toThrow();
    });
  });

  // Test 2: Key consistency across all locales
  const checkKeysMatch = (obj1, obj2, path = '') => {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
    
    try {
      expect(keys1).toEqual(keys2);
    } catch (error) {
      const missingInFirst = keys2.filter(k => !keys1.includes(k));
      const missingInSecond = keys1.filter(k => !keys2.includes(k));
      throw new Error(
        `Keys don't match at path "${path}"\n` +
        (missingInFirst.length ? `Missing keys: ${missingInFirst.join(', ')}\n` : '') +
        (missingInSecond.length ? `Extra keys: ${missingInSecond.join(', ')}` : '')
      );
    }

    // Recursively check nested objects
    keys1.forEach(key => {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj1[key] === 'object' && obj1[key] !== null &&
          typeof obj2[key] === 'object' && obj2[key] !== null) {
        checkKeysMatch(obj1[key], obj2[key], newPath);
      }
    });
  };

  test('Translation keys match across all locales', () => {
    Object.entries(allLocales).forEach(([locale, translations]) => {
      if (locale !== 'en') {
        try {
          checkKeysMatch(en, translations);
        } catch (error) {
          throw new Error(`Mismatch in ${locale} locale: ${error.message}`);
        }
      }
    });
  });

  // Test 3: Placeholder consistency
  const getPlaceholders = str => {
    if (typeof str !== 'string') return [];
    const matches = str.match(/{\w+}/g);
    return matches ? matches.sort() : [];
  };

  const checkPlaceholders = (obj1, obj2, locale, path = '') => {
    Object.entries(obj1).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && typeof obj2[key] === 'string') {
        const placeholders1 = getPlaceholders(value);
        const placeholders2 = getPlaceholders(obj2[key]);
        
        try {
          expect(placeholders1).toEqual(placeholders2);
        } catch (error) {
          throw new Error(
            `Placeholder mismatch at "${newPath}" in ${locale} locale\n` +
            `Expected: ${placeholders1.join(', ')}\n` +
            `Received: ${placeholders2.join(', ')}`
          );
        }
      } else if (typeof value === 'object' && value !== null &&
                 typeof obj2[key] === 'object' && obj2[key] !== null) {
        checkPlaceholders(value, obj2[key], locale, newPath);
      }
    });
  };

  test('Placeholders match across all translations', () => {
    Object.entries(allLocales).forEach(([locale, translations]) => {
      if (locale !== 'en') {
        checkPlaceholders(en, translations, locale);
      }
    });
  });
});
