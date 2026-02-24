import { describe, test, expect } from 'vitest';
import { translations, getTranslation, formatTranslation } from '../src/locales/translations.js';

const SUPPORTED_LANGUAGES = [
  'en',
  'fr',
  'es',
  'de',
  'it',
  'nl',
  'pt',
  'pt-br',
  'ro',
  'sk',
  'he',
  'ru',
  'hu',
  'sv',
  'cs',
];

describe('Translations', () => {
  describe('translations object', () => {
    test('should contain all supported languages', () => {
      SUPPORTED_LANGUAGES.forEach(lang => {
        expect(translations).toHaveProperty(lang);
      });
    });

    test('should not have extra unsupported languages', () => {
      expect(Object.keys(translations).sort()).toEqual([...SUPPORTED_LANGUAGES].sort());
    });
  });

  describe('key consistency across locales', () => {
    const referenceKeys = getDeepKeys(translations.en);

    SUPPORTED_LANGUAGES.forEach(lang => {
      test(`${lang} should have the same keys as en`, () => {
        const langKeys = getDeepKeys(translations[lang]);
        expect(langKeys.sort()).toEqual(referenceKeys.sort());
      });
    });
  });

  describe('placeholder consistency', () => {
    const placeholderRegex = /\{(\w+)\}/g;

    SUPPORTED_LANGUAGES.forEach(lang => {
      test(`${lang} should have the same placeholders as en`, () => {
        const enFlat = flattenObject(translations.en);
        const langFlat = flattenObject(translations[lang]);

        Object.entries(enFlat).forEach(([key, enValue]) => {
          if (typeof enValue !== 'string') return;
          const enPlaceholders = [...enValue.matchAll(placeholderRegex)].map(m => m[1]).sort();
          const langValue = langFlat[key];
          if (typeof langValue !== 'string') return;
          const langPlaceholders = [...langValue.matchAll(placeholderRegex)].map(m => m[1]).sort();
          expect(langPlaceholders, `Mismatch in ${lang}.${key}`).toEqual(enPlaceholders);
        });
      });
    });
  });

  describe('getTranslation', () => {
    test('should return correct value for a dot-notation key', () => {
      expect(getTranslation('en', 'state.3')).toBe('Ideal');
    });

    test('should fallback to en for unknown language', () => {
      expect(getTranslation('xx', 'state.3')).toBe('Ideal');
    });

    test('should return the key itself if not found', () => {
      expect(getTranslation('en', 'nonexistent.key')).toBe('nonexistent.key');
    });

    test('should work with nested keys', () => {
      expect(getTranslation('en', 'sensor.temperature')).toBe('Temperature');
      expect(getTranslation('fr', 'sensor.temperature')).toBe(translations.fr.sensor.temperature);
    });
  });

  describe('formatTranslation', () => {
    test('should replace placeholders with values', () => {
      expect(formatTranslation('{minutes} minutes ago', { minutes: 5 })).toBe('5 minutes ago');
    });

    test('should return translation as-is if no values provided', () => {
      expect(formatTranslation('just now')).toBe('just now');
      expect(formatTranslation('just now', undefined)).toBe('just now');
    });

    test('should handle multiple placeholders', () => {
      expect(formatTranslation('{a} and {b}', { a: 'X', b: 'Y' })).toBe('X and Y');
    });
  });
});

// --- Helpers ---

function getDeepKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return getDeepKeys(value, fullKey);
    }
    return [fullKey];
  });
}

function flattenObject(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, fullKey));
    } else {
      acc[fullKey] = value;
    }
    return acc;
  }, {});
}
