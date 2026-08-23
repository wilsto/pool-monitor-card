import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_COLORS } from '../src/configs/config.js';
import { CARDS, paletteColors } from '../../../scripts/generate-readmes.js';

// options-doc.test.js already proves every option is *listed*. A listed option
// is not an explained feature, and the gap cost real time twice:
//
//   pool-monitor-card#85, @rocknrolla85 asked for several temperature probes.
//     Four lines of YAML said it was possible; nothing said what an entry
//     inherits, so he read the page and concluded it was not supported.
//   pool-monitor-card#93, @sentience wrote card-mod styles that did nothing.
//     The section described what card-mod allows without ever saying it is a
//     separate component to install.
//
// The pages are generated, so what ships is whatever was last regenerated.
// These assertions are about the committed pages, not about the generator.

const root = resolve(__dirname, '../../..');
const page = card =>
  readFileSync(
    resolve(root, 'scripts/dist-readmes', card.repo.split('/')[1], 'README.md'),
    'utf8',
  ).replace(/\r\n/g, '\n');

const sectionOf = (text, heading) => {
  const start = text.indexOf(`### ${heading}`);
  if (start === -1) return '';
  const rest = text.slice(start + 4);
  const end = rest.indexOf('\n### ');
  return rest.slice(0, end === -1 ? undefined : end);
};

describe('several probes on one measurement is explained, not just possible', () => {
  for (const card of CARDS) {
    const section = () => sectionOf(page(card), 'Several probes for the same measurement');

    it(`${card.package}: the section is there`, () => {
      expect(section()).not.toBe('');
    });

    it(`${card.package}: the example is a list, and a whole card`, () => {
      const yaml = section().slice(section().indexOf('```yaml'), section().indexOf('```\n'));
      // A snippet without `type:` cannot be pasted into a dashboard as it is.
      expect(yaml).toContain(`type: custom:${card.elementName || card.cardType}`);
      expect(yaml).toMatch(/^ {4}- entity: /m);
      // Two entries, otherwise it does not show what a list is for.
      expect([...yaml.matchAll(/^ {4}- entity: /gm)].length).toBeGreaterThan(1);
      // Every entry named, which is exactly the advice the section gives.
      expect([...yaml.matchAll(/^ {6}name: /gm)].length).toBeGreaterThan(1);
    });
  }
});

describe('the Styling section says card-mod has to be installed first', () => {
  for (const card of CARDS) {
    it(`${card.package}: names HACS and the component`, () => {
      const styling = sectionOf(page(card), 'Styling');
      expect(styling).not.toBe('');
      expect(styling).toContain('HACS');
      expect(styling).toContain('https://github.com/thomasloven/lovelace-card-mod');
    });
  }
});

// The options table pointed at "the Styling section" for `colors.*`, and that
// section named no colour. A cross-reference that answers nothing is worse than
// none: the reader follows it and comes back empty.
describe('the palette is named where the options table sends the reader', () => {
  it('the generator reads every colour the card defines', () => {
    expect(
      paletteColors()
        .map(c => c.key)
        .sort(),
    ).toEqual(Object.keys(DEFAULT_COLORS).sort());
  });

  for (const card of CARDS) {
    it(`${card.package}: the row points at a heading that exists`, () => {
      const text = page(card);
      const row = text.match(/^\| `colors\.\*` \|.*\| ([^|]+) \|$/m);
      expect(row, 'no `colors.*` row in the options table').not.toBeNull();
      const target = row[1].match(/see the (\w+) section/)?.[1];
      expect(target, `unreadable cross-reference: ${row[1]}`).toBeTruthy();
      expect(text).toContain(`### ${target}`);
    });

    it(`${card.package}: every colour is listed with its default`, () => {
      const section = sectionOf(page(card), 'Colours');
      const missing = paletteColors().filter(
        c => !section.includes(`| \`colors.${c.key}\` | \`${c.value}\` |`),
      );
      expect(missing.map(c => c.key)).toEqual([]);
    });
  }
});

// The card refuses a sensor with no scale (#98) and says so on the card itself.
// No page said it anywhere, so the only explanation a user had was that banner,
// in English whatever their language (#122). The two gaps reinforced each
// other: the message could not be read and the page did not explain it.
//
// `scale.ts` is the authority on what counts as a scale, and it counts exactly
// two things. What is checked here is that the pages name the same two, and
// name the two near misses that look like a scale and are not.
describe('the pages say a scale is required, and which ones count', () => {
  for (const card of CARDS) {
    const section = () => sectionOf(page(card), 'Every sensor needs a scale');

    it(`${card.package}: the section is there`, () => {
      expect(section()).not.toBe('');
    });

    it(`${card.package}: it names both references, and what happens without one`, () => {
      const text = section();
      expect(text).toContain('`limits`');
      expect(text).toContain('`setpoint`');
      expect(text).toMatch(/refused/);
    });

    it(`${card.package}: it says min, max and step alone are not one`, () => {
      const text = section();
      expect(text).toContain('`min: 0, max: 100`');
      expect(text).toContain('`step` alone is not one');
    });
  }

  // The generic card is where this bites: nothing supplies a scale behind a
  // freeform key, so its own option table has to carry the requirement rather
  // than leaving it to a section further down the page.
  it('the card with no presets marks it required in its own table', () => {
    const generic = CARDS.find(c => c.isGeneric);
    const text = page(generic);
    const table = text.slice(text.indexOf('| Option | Required | Description |'));
    expect(table.slice(0, table.indexOf('\n\n'))).toMatch(
      /^\| `setpoint` \| \*\*yes\*\*, or `limits` \|/m,
    );
  });
});
