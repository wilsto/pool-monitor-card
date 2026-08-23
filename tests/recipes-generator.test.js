import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import {
  RECIPES,
  bandLabels,
  bandsOf,
  checkRecipe,
  generateRecipesDoc,
  loadBandPresets,
  sensorOptionKeys,
} from '../../../scripts/generate-recipes.js';
import { CARDS } from '../../../scripts/generate-readmes.js';
import { translations } from '../src/locales/translations.js';
import { AIR_QUALITY_SENSORS } from '../../air-quality/src/sensors.js';
import { AQUARIUM_SENSORS } from '../../aquarium-monitor/src/sensors.js';

// The recipes page publishes a Home Assistant template sensor that reproduces
// the card's own band classification. Two pages saying different things about
// the same threshold is the failure #99 records nine times over, so the page
// is derived and the derivation is checked here against the registry object
// itself, not against the text the generator produced from it.

const root = resolve(__dirname, '../../..');
const read = p => readFileSync(resolve(root, p), 'utf8').replace(/\r\n/g, '\n');
const pageOf = card => resolve(root, 'scripts/dist-readmes', card.cardType, 'docs', 'recipes.md');

const REGISTRIES = {
  'air-quality': AIR_QUALITY_SENSORS,
  'aquarium-monitor': AQUARIUM_SENSORS,
};

describe('the band vocabulary is the card`s, not a second list', () => {
  it('reads the five names from the English locale', () => {
    expect(bandLabels()).toEqual(Object.values(translations.en.band));
  });
});

describe('the numbers on the page are the registry`s', () => {
  for (const [pkg, registry] of Object.entries(REGISTRIES)) {
    it(`matches every banded preset of ${pkg}`, () => {
      const fromSource = Object.entries(registry)
        .filter(([, s]) => Array.isArray(s.limits) && s.limits.length === 4)
        .map(([key, s]) => ({
          key,
          name: s.name,
          unit: s.unit,
          limits: s.limits,
          direction: s.direction ?? 'lower_is_better',
        }));

      const fromGenerator = loadBandPresets(pkg).map(p => ({
        key: p.key,
        name: p.name,
        unit: p.unit,
        limits: p.limits,
        direction: p.direction,
      }));

      expect(fromGenerator).toEqual(fromSource);
      expect(fromGenerator.length).toBeGreaterThan(0);
    });
  }

  it('leaves out the presets the registry does not band', () => {
    // `ph` is a setpoint preset in both registries. A recipe that banded it
    // would invent four boundaries the card does not have.
    expect(loadBandPresets('aquarium-monitor').map(p => p.key)).not.toContain('ph');
  });
});

describe('the direction decides the band order', () => {
  const labels = bandLabels();
  const preset = { rawLimits: ['1', '2', '3', '4'] };

  it('runs good to bad when lower is better', () => {
    const bands = bandsOf({ ...preset, direction: 'lower_is_better' }, labels);
    expect(bands.map(b => b.label)).toEqual(labels);
    expect(bands[0].reading).toBe('below 1');
    expect(bands[4].reading).toBe('4 and above');
  });

  // No preset uses this today. The card reverses the labels for ORP
  // (pool-monitor-card#85), so the generator has to as well, or the first
  // registry entry that needs it ships a page that says the opposite of the
  // card without anyone touching this file.
  it('runs bad to good when higher is better', () => {
    const bands = bandsOf({ ...preset, direction: 'higher_is_better' }, labels);
    expect(bands.map(b => b.label)).toEqual([...labels].reverse());
  });
});

describe('a recipe may not reference something that does not exist', () => {
  const cardTypes = CARDS.map(c => c.cardType);
  const options = sensorOptionKeys();
  const valid = {
    card: 'pool-monitor-card',
    title: 'test',
    source: { repo: 'wilsto/pool-monitor-card', issue: 1, author: 'someone' },
    presets: ['ph'],
    options: ['setpoint_entity'],
    verified: 'run',
    notVerified: 'not run',
    body: ['ph and setpoint_entity'],
  };
  const check = over => () => checkRecipe({ ...valid, ...over }, cardTypes, ['ph'], options);

  it('accepts one that lines up', () => {
    expect(check({})).not.toThrow();
  });

  it('refuses an unknown card', () => {
    expect(check({ card: 'garden-card' })).toThrow(/unknown card/);
  });

  it('refuses a preset the registry dropped', () => {
    expect(
      check({
        presets: ['ph', 'chlorine_from_orp'],
        body: ['ph chlorine_from_orp setpoint_entity'],
      }),
    ).toThrow(/presets that do not exist/);
  });

  it('refuses an option the card never had', () => {
    expect(
      check({
        options: ['setpoint_entity', 'blink_threshold'],
        body: ['ph setpoint_entity blink_threshold'],
      }),
    ).toThrow(/options that do not exist/);
  });

  it('refuses one that will not say what was run', () => {
    expect(check({ verified: '' })).toThrow(/what was verified/);
    expect(check({ notVerified: '' })).toThrow(/what was verified/);
  });

  it('refuses one that answers nobody', () => {
    expect(check({ source: { repo: 'wilsto/pool-monitor-card', issue: 1 } })).toThrow(
      /does not name the request/,
    );
  });

  it('refuses a name declared and never used, which is how a list starts lying', () => {
    expect(check({ presets: ['ph'], body: ['setpoint_entity only'] })).toThrow(/never uses/);
  });
});

describe('every shipped recipe passes its own guard', () => {
  const options = sensorOptionKeys();
  const cardTypes = CARDS.map(c => c.cardType);

  for (const recipe of RECIPES) {
    it(`${recipe.title}`, () => {
      const card = CARDS.find(c => c.cardType === recipe.card);
      const registry = read(`packages/${card.package}/src/sensors.ts`);
      for (const key of recipe.presets) {
        expect(registry, `${key} is gone from the registry`).toContain(`\n  ${key}: {`);
      }
      expect(() => checkRecipe(recipe, cardTypes, [...recipe.presets], options)).not.toThrow();
    });
  }

  it('publishes no free chlorine from pH and ORP, contested in pool-monitor-card#4', () => {
    // Refused in #116 section 7: the lookup table holds at one temperature, one
    // alkalinity and one mineralisation, and two users of the domain said so in
    // the thread. A wrong recipe on a published page looks official.
    //
    // Aimed at the hand-written half only. A derived band recipe for the `orp`
    // preset would be legitimate the day the registry gives it four limits, and
    // this guard must not be what stops it.
    const chlorineFromOrp = RECIPES.filter(r => {
      const body = r.body.join('\n').toLowerCase();
      return body.includes('orp') && body.includes('chlorine');
    }).map(r => r.title);
    expect(chlorineFromOrp).toEqual([]);
  });
});

describe('the committed pages are what the generator produces', () => {
  for (const card of CARDS) {
    it(`${card.cardType}`, () => {
      const expected = generateRecipesDoc(card);
      const page = pageOf(card);
      if (expected === null) {
        // A card with nothing to publish gets no page rather than an empty one
        // repeating docs/sensors.md.
        expect(existsSync(page)).toBe(false);
        return;
      }
      expect(existsSync(page), `${card.cardType} was never generated`).toBe(true);
      expect(readFileSync(page, 'utf8').replace(/\r\n/g, '\n')).toBe(expected);
    });
  }

  it('says on every page what has been run and what has not', () => {
    for (const card of CARDS) {
      const page = pageOf(card);
      if (!existsSync(page)) continue;
      expect(read(`scripts/dist-readmes/${card.cardType}/docs/recipes.md`)).toContain(
        '**Not verified.**',
      );
    }
  });
});

// #119 wrote a recipes page into three distribution repositories and no home
// page pointed at any of them. A page nothing references is a file, not
// documentation, and the reverse is worse: a link to a page that was never
// generated is a 404 in a published repository.
describe('a recipes page is reachable, and a link never points at a missing one', () => {
  const homePageOf = card => resolve(root, 'scripts/dist-readmes', card.cardType, 'README.md');

  for (const card of CARDS) {
    it(`${card.cardType}`, () => {
      const published = generateRecipesDoc(card) !== null;

      // `hasRecipes` is what the home page reads, and only the recipe generator
      // knows the truth. Keeping the two apart would let the first recipe added
      // to a card ship an unreachable page in silence.
      expect(
        Boolean(card.hasRecipes),
        `${card.cardType}: hasRecipes says ${Boolean(card.hasRecipes)}, generateRecipesDoc says ${published}`,
      ).toBe(published);

      const home = readFileSync(homePageOf(card), 'utf8');
      expect(home.includes('docs/recipes.md')).toBe(published);
      expect(existsSync(pageOf(card))).toBe(published);
    });
  }
});

// The message sat outside the entry guard, so importing the module announced
// "All files generated" without writing anything, and generate-recipes.js
// imports it. The worst defect found this week was a published page stating
// thresholds the card no longer applied because it had never been regenerated:
// this was the message that made the opposite believable.
describe('importing a generator writes nothing and claims nothing', () => {
  const script = resolve(root, 'scripts/generate-readmes.js');

  it('stays silent when imported instead of run', () => {
    const run = spawnSync(
      process.execPath,
      ['-e', `import(${JSON.stringify(pathToFileURL(script).href)})`],
      { encoding: 'utf-8' },
    );
    expect(run.status).toBe(0);
    expect(run.stdout.trim()).toBe('');
  });
});
