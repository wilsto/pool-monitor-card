import { describe, it, expect } from 'vitest';
import { editorText } from '../src/editor/editor-i18n.js';
import { MonitorEditorBase } from '../src/editor/editor-base.js';
import { colorsSchema, displaySchema, generalSchema } from '../src/editor/ha-form-schemas.js';
import { DEFAULT_COLORS } from '../src/configs/config.js';
import en from '../src/locales/en.js';
import fr from '../src/locales/fr.js';

// The editor had no translation at all: every label was written in English in
// the markup, while the card speaks seventeen languages. A Hungarian user read
// their card in Hungarian and configured it in English.
describe('the editor follows the Home Assistant language', () => {
  it('translates a label into the language Home Assistant is set to', () => {
    expect(editorText({ language: 'fr' }, 'setpoint')).toBe('Consigne');
    expect(editorText({ language: 'en' }, 'setpoint')).toBe('Setpoint');
  });

  it('falls back to English for a language that has no editor labels yet', () => {
    // Catalan and Danish were contributed before this group existed
    expect(editorText({ language: 'ca' }, 'setpoint')).toBe(en.editor.setpoint);
    expect(editorText({ language: 'hu' }, 'colors')).toBe(en.editor.colors);
  });

  it('falls back to English when Home Assistant says nothing', () => {
    expect(editorText(undefined, 'entity')).toBe('Entity');
    expect(editorText({}, 'entity')).toBe('Entity');
  });

  it('reads the Home Assistant language, not the card display language', () => {
    // the person configuring is not necessarily the person looking
    expect(editorText({ language: 'fr', config: { display: { language: 'hu' } } }, 'colors')).toBe(
      'Couleurs',
    );
  });
});

describe('every editor label goes through the registry', () => {
  const walk = (o, p = '') =>
    Object.entries(o).flatMap(([k, v]) =>
      typeof v === 'object' ? walk(v, `${p}${k}.`) : [`${p}${k}`],
    );

  it('French defines no editor key English does not', () => {
    const extra = walk(fr.editor).filter(k => !walk(en.editor).includes(k));
    expect(extra).toEqual([]);
  });

  it('the three schemas ask for a translation of every label they show', () => {
    const asked = [];
    const t = k => {
      asked.push(k);
      return k;
    };
    generalSchema(t);
    displaySchema(t);
    colorsSchema(t);
    expect(asked.length).toBeGreaterThan(10);
    const known = walk(en.editor);
    expect(asked.filter(k => !known.includes(k))).toEqual([]);
  });
});

// The colour list in the editor was hand-written and had drifted twice: it was
// missing `hazardous` since that colour was added, and `fair` from the day it
// landed this morning. Both are painted on screen and neither could be changed.
describe('the colour fields are derived from the palette', () => {
  it('offers every colour the card actually uses', () => {
    const offered = colorsSchema(k => k).map(f => f.name);
    expect(offered.sort()).toEqual(Object.keys(DEFAULT_COLORS).sort());
  });

  it('including the two that were unreachable', () => {
    const offered = colorsSchema(k => k).map(f => f.name);
    expect(offered).toContain('hazardous');
    expect(offered).toContain('fair');
  });
});

// Found on the bench, on the published bundle, not here: the editor was
// title-casing every label it was given, including ones already written for a
// human. In English that is invisible noise ("Status entity" reads as "Status
// Entity"). In French it is wrong, because `\b\w` knows nothing about accents:
// the `t` of "etat" sits at a word boundary, so "Entité d'état" was painted
// "Entité D'éTat".
describe('an explicit label is shown as written', () => {
  // _computeLabel reads only its argument, so it is exercised straight off the
  // prototype rather than by registering a throwaway custom element.
  const compute = schema => MonitorEditorBase.prototype._computeLabel(schema);

  it('leaves a French label with an apostrophe and accents alone', () => {
    expect(compute({ name: 'status_entity', label: "Entité d'état" })).toBe("Entité d'état");
  });

  it('leaves an English label alone rather than title-casing it', () => {
    expect(compute({ name: 'status_entity', label: 'Status entity' })).toBe('Status entity');
  });

  it('still makes a bare schema name readable when no label is given', () => {
    expect(compute({ name: 'show_last_updated' })).toBe('Show Last Updated');
  });

  it('every display option now carries a label, so none falls back', () => {
    const withoutLabel = displaySchema(k => k).filter(f => !f.label);
    expect(withoutLabel.map(f => f.name)).toEqual([]);
  });
});
