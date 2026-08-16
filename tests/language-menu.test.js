import { describe, it, expect } from 'vitest';
import { displaySchema } from '../src/editor/ha-form-schemas.js';
import { translations } from '../src/locales/translations.js';

// The language menu used to be a second hand-maintained list, and the two
// drifted: 3 languages were offered with no translation behind them (pl, zh-cn,
// zh-tw, silently falling back to English) while 6 translated ones were
// unreachable (cs, he, hu, ro, ru, sv), including three community contributions.
const menuOptions = () =>
  displaySchema(k => k).find(f => f.name === 'language')?.selector?.select?.options ?? [];

describe('language menu is derived from the translations registry', () => {
  it('offers exactly the registered languages, no more, no fewer', () => {
    const offered = menuOptions()
      .map(o => o.value)
      .sort();
    const registered = Object.keys(translations).sort();
    expect(offered).toEqual(registered);
  });

  it('offers no language without a translation behind it', () => {
    const orphans = menuOptions()
      .map(o => o.value)
      .filter(v => !(v in translations));
    expect(orphans).toEqual([]);
  });

  it('leaves no translated language unreachable', () => {
    const offered = new Set(menuOptions().map(o => o.value));
    const hidden = Object.keys(translations).filter(k => !offered.has(k));
    expect(hidden).toEqual([]);
  });

  it('labels every language with a non-empty name', () => {
    const unlabelled = menuOptions().filter(o => !o.label || !o.label.trim());
    expect(unlabelled).toEqual([]);
  });

  it('names each language in its own language, not the browser locale', () => {
    const byValue = Object.fromEntries(menuOptions().map(o => [o.value, o.label]));
    expect(byValue.en).toBe('English');
    expect(byValue.de).toBe('Deutsch');
    expect(byValue.hu).toBe('Magyar');
    expect(byValue.cs).toBe('Čeština');
    expect(byValue.he).toBe('עברית');
    expect(byValue['pt-br']).toBe('Português (Brasil)');
  });

  it('takes each name from the locale file itself', () => {
    // single source of truth: adding a translation adds its menu entry
    const missing = Object.entries(translations)
      .filter(([, set]) => !set.language)
      .map(([code]) => code);
    expect(missing).toEqual([]);
  });
});
