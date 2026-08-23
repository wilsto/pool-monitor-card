import { describe, it, expect, beforeEach } from 'vitest';
import '../src/editor/sensor-editor.js';
import { translations, getTranslation } from '../src/locales/translations.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AquariumMonitorCard } from '../../aquarium-monitor/src/aquarium-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

// The preset picker groups by category and names each group. Only pool filed
// its presets, so the aquarium's fifteen and the air card's thirteen all fell
// into "Other": one unnamed heap, in which a user looking for ammonia decides
// the card does not have it. Someone once opened a feature request for a thing
// that already shipped, for exactly that reason.
//
// The labels used to be a hand-written list in the editor, next to a second
// hand-written list giving their order, both spelling out pool's four
// categories. That is the eighth such list in this repository, after the
// language menu, the CSS classes, SUPPORTED_LANGUAGES, the editor colours, the
// preset count, the options table and the preset names. It gets the same
// treatment as the seventh: derive, do not recopy.

const CARDS = {
  'pool-monitor': PoolMonitorCard,
  'aquarium-monitor': AquariumMonitorCard,
  'air-monitor': AirQualityCard,
};

const presets = Object.entries(CARDS).flatMap(([card, Card]) =>
  Object.entries(Card.SENSORS).map(([key, preset]) => ({ card, key, preset })),
);

const usedCategories = [...new Set(presets.map(({ preset }) => preset.category))];

describe('every preset is filed under a section', () => {
  for (const [card, Card] of Object.entries(CARDS)) {
    it(card, () => {
      const unfiled = Object.entries(Card.SENSORS)
        .filter(([, preset]) => !preset.category)
        .map(([key]) => key);
      expect(unfiled).toEqual([]);
    });
  }
});

// `category` is a free key, so nothing at compile time says the key means
// anything. What makes it mean something is having a name to show: the picker
// asks for `editor.category.<key>` and getTranslation hands back the key
// itself when nobody answers. A category nobody named prints
// "category.nitrogen_cycle" as a section header.
describe('every section has a name, in the languages that carry them', () => {
  it('English names them all', () => {
    const nameless = usedCategories.filter(
      cat => getTranslation('en', `editor.category.${cat}`) === `editor.category.${cat}`,
    );
    expect(nameless).toEqual([]);
  });

  // French is the second language this table is written in. The other fifteen
  // fall back to English by design (editor-i18n.ts): an editor label ships
  // without waiting for seventeen translations, unlike a sensor name, which is
  // read by the people looking at the card rather than by whoever configures
  // it.
  it('French names them all', () => {
    const nameless = usedCategories.filter(cat => !translations.fr.editor.category[cat]);
    expect(nameless).toEqual([]);
  });

  it('none of them is a snake_case key spelled back', () => {
    // "Comfort" for `comfort` is the name, not the key showing through. What
    // is refused, as for preset names, is a key with an underscore in it
    // reaching the section header untranslated.
    const echoed = usedCategories.filter(
      cat =>
        cat.includes('_') && getTranslation('en', `editor.category.${cat}`).toLowerCase() === cat,
    );
    expect(echoed).toEqual([]);
  });
});

// The mirror invariant. A category renamed in a registry leaves its old label
// behind, and a label nobody reads is how a table starts lying.
describe('no section is named that no card files anything under', () => {
  it('every English category label belongs to a registry', () => {
    const orphans = Object.keys(translations.en.editor.category)
      // `other` is the editor's own bucket for a preset that claims no
      // category. No registry declares it, the picker does.
      .filter(cat => cat !== 'other')
      .filter(cat => !usedCategories.includes(cat));
    expect(orphans).toEqual([]);
  });
});

// --- What the picker actually renders ---

const build = async registry => {
  const el = document.createElement('monitor-sensor-editor');
  el.hass = { language: 'en', states: {}, entities: {} };
  el.registry = registry;
  el.sensors = {};
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
};

/** The disabled options are the section headers; they read ", Name ,". */
const sections = el =>
  [...el.shadowRoot.querySelectorAll('option[disabled]')].map(o =>
    o.textContent.replace(/^[\s,]+|[\s,]+$/g, ''),
  );

beforeEach(() => {
  document.body.replaceChildren();
});

describe('the picker shows the sections the registry declares', () => {
  for (const [card, Card] of Object.entries(CARDS)) {
    it(card, async () => {
      // Not a list written here: the sections and their order are what the
      // registry says, first appearance first. A test holding its own copy
      // would be the ninth hand-maintained list.
      const expected = [...new Set(Object.values(Card.SENSORS).map(p => p.category))].map(cat =>
        getTranslation('en', `editor.category.${cat}`),
      );
      const el = await build(Card.SENSORS);
      expect(sections(el)).toEqual(expected);
    });
  }

  it('files every offered preset under one of them', async () => {
    const el = await build(AquariumMonitorCard.SENSORS);
    const offered = [...el.shadowRoot.querySelectorAll('option:not([disabled])')]
      .map(o => o.value)
      .filter(Boolean);
    expect(offered.sort()).toEqual(Object.keys(AquariumMonitorCard.SENSORS).sort());
  });
});

describe('a card names its own sections, the core does not have to know them', () => {
  it('a category the core has never seen gets its own section', async () => {
    translations.en.editor.category.__essai__ = 'Invented By A Card';
    try {
      const el = await build({
        widget: { name: 'Widget', unit: 'x', category: '__essai__' },
      });
      expect(sections(el)).toEqual(['Invented By A Card']);
    } finally {
      delete translations.en.editor.category.__essai__;
    }
  });

  it('sends a preset with no category to Other, and Other sits last', async () => {
    const el = await build({
      ph: { name: 'pH', unit: 'pH', category: 'water_chemistry' },
      mystery: { name: 'Mystery', unit: 'x' },
      ammonia: { name: 'Ammonia', unit: 'ppm', category: 'nitrogen_cycle' },
    });
    expect(sections(el)).toEqual(['Essential Water Chemistry', 'Nitrogen Cycle', 'Other']);
  });
});
