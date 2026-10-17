import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CARDS } from '../../../scripts/generate-readmes.js';
import { translations } from '../src/locales/translations.js';

// Most issues opened on the public repositories are not bugs. They are the same
// handful of questions, asked again by each new user: the card does not show
// up, a good reading is painted orange, the temperature is in Fahrenheit, the
// badge in the screenshots cannot be found (pool-monitor-card#94), a warning
// sits where a reading should be. A new user asks about twice as many of them
// as one who has been around for a while (#77), so every visitor the cards
// gain costs support unless the page answers first.
//
// Each README therefore carries a Troubleshooting section, and this file holds
// what can drift out of it: the section exists on every page, every warning the
// card can paint is quoted there in the words the user actually sees, so a
// search of the page for the banner's text lands on its answer, and every link
// inside it leads to a heading of the same page.

const root = resolve(import.meta.dirname, '../../..');
const repoName = card => card.repo.split('/')[1];
const page = card =>
  readFileSync(resolve(root, 'scripts/dist-readmes', repoName(card), 'README.md'), 'utf-8');

const section = text => {
  const start = text.indexOf('\n## Troubleshooting\n');
  if (start === -1) return null;
  const end = text.indexOf('\n## ', start + 1);
  return text.slice(start, end === -1 ? undefined : end);
};

// The longest run of a warning that contains no placeholder: the part a user
// can copy from the banner and find on the page.
const quotable = message =>
  message
    .split(/\{[^}]+\}/)
    .map(s => s.trim())
    .sort((a, b) => b.length - a.length)[0];

const slug = heading =>
  heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const WARNINGS = Object.entries(translations.en.warning).filter(([key]) => key !== 'unknown');

describe.each(CARDS.map(c => [repoName(c), c]))('%s README, Troubleshooting', (_, card) => {
  it('has the section, before Support', () => {
    const text = page(card);
    expect(section(text)).not.toBeNull();
    expect(text.indexOf('\n## Troubleshooting\n')).toBeLessThan(text.indexOf('\n## Support\n'));
  });

  // A card with no presets accepts any sensor key, so it never paints
  // `not_supported` (card-base.ts marks a sensor invalid only against a preset
  // list), and its page would explain a banner nobody can meet.
  const painted = WARNINGS.filter(([key]) => !(card.isGeneric && key === 'not_supported'));

  it.each(painted)('quotes the "%s" warning as the card paints it', (_, message) => {
    expect(section(page(card)) ?? '').toContain(quotable(message));
  });

  it('links only to headings of the same page', () => {
    const text = page(card);
    const anchors = new Set([...text.matchAll(/^#{2,4} (.+)$/gm)].map(m => slug(m[1])));
    const links = [...(section(text) ?? '').matchAll(/\]\(#([^)]+)\)/g)].map(m => m[1]);
    expect(links.length).toBeGreaterThan(0);
    expect(links.filter(l => !anchors.has(l))).toEqual([]);
  });
});
