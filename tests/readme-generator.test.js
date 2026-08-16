import { describe, it, expect } from 'vitest';
import { supportedLanguages, loadSensors, CARDS } from '../../../scripts/generate-readmes.js';
import { translations } from '../src/locales/translations.js';

// The README announced "12 languages supported" and named Polish, which has no
// translation, while omitting Hungarian, Swedish, Romanian and Brazilian
// Portuguese. It was a third hand-maintained language list, after the editor
// menu (#8) and the translations registry itself. Derived now, a list that
// cannot drift is better than a list someone remembers to update.

describe('README generator, languages are derived, never listed by hand', () => {
  it('announces exactly the languages that have a translation', () => {
    const announced = supportedLanguages()
      .map(l => l.code)
      .sort();
    expect(announced).toEqual(Object.keys(translations).sort());
  });

  it('names each one, and none is left as a bare code', () => {
    const bare = supportedLanguages().filter(l => !l.name || l.name === l.code);
    expect(bare).toEqual([]);
  });

  it('counts what it lists', () => {
    const langs = supportedLanguages();
    expect(langs.length).toBe(Object.keys(translations).length);
  });
});

// loadSensors read `src/sensors.js` and swallowed the failure with
// `catch { return [] }`. The sources became `.ts` in February; since then the
// sensor documentation regenerated empty, 176 lines of pool sensor details
// would have vanished the next time anyone ran the generator.
describe('README generator, the sensor registry is actually read', () => {
  it('finds the pool sensors', () => {
    const sensors = loadSensors('pool-monitor');
    expect(sensors.length).toBeGreaterThan(10);
    expect(sensors.map(s => s.key)).toContain('ph');
  });

  it('finds the air-quality sensors', () => {
    expect(loadSensors('air-quality').length).toBeGreaterThan(5);
  });

  it('refuses to pretend a missing registry is an empty one', () => {
    expect(() => loadSensors('does-not-exist')).toThrow();
  });
});

// Sensor documentation is emitted category by category: a sensor that belongs
// to no category is simply never written. Three pool sensors (chlorinator,
// pump_speed, light_brightness) had fallen out of the metadata, so the doc
// silently lost them the next time it was generated.
describe('README generator, every sensor belongs to a category', () => {
  CARDS.filter(c => !c.isGeneric).forEach(card => {
    it(`${card.package}: no sensor is left undocumented`, () => {
      const categorised = new Set(card.sensorCategories.flatMap(c => c.keys));
      const orphans = loadSensors(card.package)
        .map(s => s.key)
        .filter(k => !categorised.has(k));
      expect(orphans).toEqual([]);
    });
  });
});
