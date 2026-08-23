import { describe, test, expect } from 'vitest';
import { translations, getTranslation, formatTranslation } from '../src/locales/translations.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AquariumMonitorCard } from '../../aquarium-monitor/src/aquarium-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { SensorMonitorCard } from '../../sensor-monitor/src/sensor-monitor-card.js';

// Asked of the cards rather than listed here: a list would be an eighth one to
// keep by hand, and forgetting it is the mistake this file exists to catch.
const CARD_TYPES = [PoolMonitorCard, AquariumMonitorCard, AirQualityCard, SensorMonitorCard].map(
  Card => Card.CARD_INFO.cardType,
);

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
  'ca',
  'da',
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

  // A locale no longer has to carry every key: a missing one falls back to
  // English rather than rendering raw. Strict parity meant a new sensor could
  // not ship until fifteen translations existed, which in practice meant
  // inventing languages nobody could verify.
  //
  // An EXTRA key is still an error, it is a typo, and it will never be read.
  describe('key consistency across locales', () => {
    const referenceKeys = getDeepKeys(translations.en);

    SUPPORTED_LANGUAGES.forEach(lang => {
      test(`${lang} defines no key that English does not`, () => {
        const orphelines = getDeepKeys(translations[lang]).filter(k => !referenceKeys.includes(k));
        expect(orphelines, `${lang} has keys absent from en, likely typos`).toEqual([]);
      });
    });
  });

  // Under `sensor`, a key is a preset and its value the name to paint, except
  // when the key is a card type: the value is then that card's own names, for
  // the presets it refuses to share. `pressure` is the filter on a pool and
  // the weather on an air monitor.
  //
  // `SensorNames` in ha/types.ts says a card type never holds a bare name.
  // What it cannot say is the other half, that everything else is a name and
  // not a table: an index signature has no way to mean "any key but those".
  // A preset nested by accident would be read by nobody and reported by
  // nothing, so it gets checked here.
  describe('names shared, and names a card keeps for itself', () => {
    SUPPORTED_LANGUAGES.forEach(lang => {
      test(`${lang} nests under card types and nowhere else`, () => {
        const nested = Object.entries(translations[lang].sensor)
          .filter(([, value]) => typeof value === 'object')
          .map(([key]) => key);
        expect(nested.filter(key => !CARD_TYPES.includes(key))).toEqual([]);
      });

      test(`${lang} scopes names to a card, not tables of tables`, () => {
        const deeper = Object.entries(translations[lang].sensor)
          .filter(([key]) => CARD_TYPES.includes(key))
          .flatMap(([key, table]) =>
            Object.entries(table)
              .filter(([, name]) => typeof name !== 'string')
              .map(([preset]) => `${key}.${preset}`),
          );
        expect(deeper).toEqual([]);
      });

      test(`${lang} agrees with English on which keys are which`, () => {
        const disagreements = Object.entries(translations[lang].sensor)
          .filter(([key]) => key in translations.en.sensor)
          .filter(([key, value]) => typeof value !== typeof translations.en.sensor[key])
          .map(([key]) => key);
        expect(disagreements).toEqual([]);
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
