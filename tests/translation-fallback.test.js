import { describe, it, expect } from 'vitest';
import { getTranslation, translations } from '../src/locales/translations.js';

// A key missing from a locale used to be shown raw: a French user saw
// "sensor.humidity" instead of a name. That forced every new sensor to arrive
// with fifteen translations at once, or not at all, so either someone invents
// Hungarian and Hebrew they cannot verify, or users get nothing.
//
// English is the language every locale file is written against, so falling back
// to it turns a broken label into a merely untranslated one. A contributor can
// then improve it; nobody is blocked meanwhile.

describe('a missing key falls back to English, never to its own name', () => {
  it('returns the English name when the locale lacks the key', () => {
    expect(getTranslation('fr', 'sensor.temperature')).not.toBe('sensor.temperature');
    // a key that exists in en and (deliberately) nowhere else
    const inventee = 'sensor.__absente_partout__';
    expect(getTranslation('fr', inventee)).toBe(inventee);
  });

  it('prefers the locale when it does have the key', () => {
    expect(getTranslation('fr', 'sensor.temperature')).toBe(translations.fr.sensor.temperature);
  });

  it('falls back for a key present in English only', () => {
    translations.en.sensor.__essai__ = 'Test Sensor';
    try {
      expect(getTranslation('he', 'sensor.__essai__')).toBe('Test Sensor');
      expect(getTranslation('cs', 'sensor.__essai__')).toBe('Test Sensor');
    } finally {
      delete translations.en.sensor.__essai__;
    }
  });

  it('still returns the key when English does not have it either', () => {
    expect(getTranslation('fr', 'sensor.__nulle_part__')).toBe('sensor.__nulle_part__');
  });
});
