import { describe, it, expect } from 'vitest';
import { supportedLanguages, loadSensors, CARDS } from '../../../scripts/generate-readmes.js';
import { translations } from '../src/locales/translations.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AquariumMonitorCard } from '../../aquarium-monitor/src/aquarium-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

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

// `co` shipped on the air card for the Amazon Smart Air Quality Monitor and
// appears in no README. Two hand-maintained lists had to agree on it and
// neither did: the parser below wants a `setpoint`, and `co` is the only preset
// defined by thresholds instead, while the category list had forgotten it too.

const SENSORS = {
  'pool-monitor': PoolMonitorCard.SENSORS,
  'aquarium-monitor': AquariumMonitorCard.SENSORS,
  'air-quality': AirQualityCard.SENSORS,
};

describe('README generator, no preset is dropped on the way to the page', () => {
  for (const card of CARDS.filter(c => !c.isGeneric)) {
    const declared = Object.keys(SENSORS[card.package] ?? {});

    it(`${card.package}: the parser reads them all`, () => {
      expect(declared.length).toBeGreaterThan(0);
      const parsed = loadSensors(card.package).map(s => s.key);
      expect(declared.filter(k => !parsed.includes(k))).toEqual([]);
    });

    it(`${card.package}: each one is filed under a category`, () => {
      const filed = card.sensorCategories.flatMap(c => c.keys);
      expect(declared.filter(k => !filed.includes(k))).toEqual([]);
    });

    it(`${card.package}: no category names a preset that does not exist`, () => {
      const filed = card.sensorCategories.flatMap(c => c.keys);
      expect(filed.filter(k => !declared.includes(k))).toEqual([]);
    });
  }
});

// A README that points at a picture which is not there shows a broken image on
// the public repository and in the HACS store, and nothing here would notice:
// the file lives in one place and the reference in another.

describe('every picture a README points at is really there', () => {
  const root = resolve(__dirname, '../../..');

  for (const card of CARDS) {
    it(card.package, () => {
      const dir = resolve(root, 'scripts/dist-readmes', card.repo.split('/')[1]);
      // the detail page counts too: its pictures sit beside it, in example/
      const pages = [
        ['README.md', dir],
        ['example/screenshots.md', resolve(dir, 'example')],
      ];
      const missing = [];
      let seen = 0;
      for (const [page, base] of pages) {
        const text = readFileSync(resolve(dir, page), 'utf8');
        const referenced = [...text.matchAll(/!\[[^\]]*\]\((?!https?:)([^)]+)\)/g)].map(m => m[1]);
        seen += referenced.length;
        missing.push(...referenced.filter(rel => !existsSync(resolve(base, rel))).map(r => `${page} -> ${r}`));
      }
      expect(seen).toBeGreaterThan(0);
      expect(missing).toEqual([]);
    });
  }
});
