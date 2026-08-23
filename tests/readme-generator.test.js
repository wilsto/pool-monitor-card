import { describe, it, expect } from 'vitest';
import {
  supportedLanguages,
  loadSensors,
  CARDS,
  TRANSLATORS,
  CORE_CONTRIBUTORS,
} from '../../../scripts/generate-readmes.js';
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

// A third hand-maintained list had to name `co` and did not: `sensorDetails`,
// the prose the sensor page prints under each section. The section still
// rendered, with its unit and its four bands and not a word under them, because
// the generator emits the sentence only `if (detail)`. Carbon monoxide is
// colourless, odourless, and the one reading on that card somebody has to act
// on, and it was the one that shipped bare (#129).
//
// A card that explains its sensors explains all of them. The three cards that
// carry prose covered 57 of their 58 sensors when this was written, so the rule
// is what they already do, minus the one hole.
describe('README generator, a card that explains its sensors explains all of them', () => {
  CARDS.filter(c => Object.keys(c.sensorDetails ?? {}).length).forEach(card => {
    it(`${card.package}: no section is printed with nothing under it`, () => {
      const silent = loadSensors(card.package)
        .map(s => s.key)
        .filter(k => !card.sensorDetails[k]?.trim());
      expect(silent).toEqual([]);
    });
  });
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
        missing.push(
          ...referenced.filter(rel => !existsSync(resolve(base, rel))).map(r => `${page} -> ${r}`),
        );
      }
      expect(seen).toBeGreaterThan(0);
      expect(missing).toEqual([]);
    });
  }
});

// @arketec designed the trend chevrons; they went out on the four cards while
// his name stayed in the issue and the pull request, on no page a user reads.
// The same slip had already happened to the Catalan and Danish translations.
// Two lists have to agree before a credit is actually seen: the one kept here,
// and the pages the generator wrote the last time someone ran it.

const distReadme = card =>
  readFileSync(
    resolve(__dirname, '../../..', 'scripts/dist-readmes', card.repo.split('/')[1], 'README.md'),
    'utf8',
  );

describe('a contribution to the shared core is credited on every card', () => {
  const shared = [...CORE_CONTRIBUTORS, ...TRANSLATORS];

  it('there is something to spread', () => {
    expect(shared.length).toBeGreaterThan(0);
  });

  for (const card of CARDS) {
    it(`${card.package}: names everyone the shared core owes`, () => {
      const credited = new Set((card.acknowledgments ?? []).map(a => a.github));
      expect(shared.filter(p => !credited.has(p.github)).map(p => p.github)).toEqual([]);
    });
  }
});

// "Polish translation" was credited against a `pl` locale that never existed:
// the contribution was Portuguese (pool-monitor-card#18 adds a `pt` block). A
// language named in the credits and absent from the locale directory means the
// credit is wrong, in one direction or the other.
describe('every language a credit names is a language the cards actually ship', () => {
  const english = new Intl.DisplayNames(['en'], { type: 'language' });
  const shipped = new Set(
    supportedLanguages().map(l =>
      english.of(l.code.replace(/-(\w+)$/, (_, region) => `-${region.toUpperCase()}`)),
    ),
  );

  it('the shipped set is not empty', () => {
    expect(shipped.size).toBeGreaterThan(5);
  });

  it('no translator is thanked for a language that ships nowhere', () => {
    const orphans = [...CARDS.flatMap(c => c.acknowledgments ?? []), ...TRANSLATORS]
      .map(t => t.contribution.match(/^(.+) translation$/)?.[1])
      .filter(lang => lang && !shipped.has(lang));
    expect([...new Set(orphans)]).toEqual([]);
  });
});

// A name written here that never reached the published page is the failure the
// list exists to prevent: the credit exists, and the person still does not see
// it. The pages are generated, so a stale page is a page nobody regenerated.
describe('every credited person reaches the page that thanks them', () => {
  for (const card of CARDS) {
    it(`${card.package}: the published page names them all`, () => {
      const page = distReadme(card);
      const people = card.acknowledgments ?? [];
      expect(people.length).toBeGreaterThan(0);
      expect(
        people.filter(a => !page.includes(`https://github.com/${a.github}`)).map(a => a.github),
      ).toEqual([]);
    });
  }
});

describe('no credit is half written', () => {
  it('each one carries a name, a handle and what it was for', () => {
    const broken = CARDS.flatMap(c => c.acknowledgments ?? []).filter(
      a => !a.name?.trim() || !a.github?.trim() || !a.contribution?.trim(),
    );
    expect(broken).toEqual([]);
  });
});
