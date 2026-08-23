import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from 'lit';
import { translations } from '../src/locales/translations.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { SensorMonitorCard } from '../../sensor-monitor/src/sensor-monitor-card.js';

// The four banners a refused configuration paints were written in English, in
// the markup, in a card published in seventeen languages (#122). The one that
// refuses a sensor with no scale was left English *deliberately* by #107, so as
// not to ship one translated warning beside two that were not; that arbitrage
// was right for a pull request and left the subject whole.
//
// A warning is not an editor label, and the difference is the whole reason this
// file exists. An editor label is read by someone who chose to open the editor,
// and `translation-fallback.test.js` lets it fall back to English so a new
// label need not wait for seventeen translations. A warning is painted at the
// moment a configuration is refused, which is exactly when the reader needs to
// understand. So it is treated like a preset name, which `preset-names.test.js`
// requires in every locale, and not like an editor label.
//
// What is checked here is the mechanism: no English left in the markup, every
// locale carrying every message, and the Latin runs inside them isolated. The
// wording of any one translation is not something a test can hold.

const root = resolve(__dirname, '../..');
const read = p => readFileSync(resolve(root, p), 'utf8');

const STATES = {
  'sensor.present': {
    state: '25.7',
    attributes: { unit_of_measurement: '°C' },
    last_updated: '2026-08-23T10:00:00Z',
  },
};

const paint = (Card, config) => {
  const card = new Card();
  card.hass = { states: STATES, entities: {} };
  card.setConfig(config);
  const host = document.createElement('div');
  render(card.render(), host);
  return host;
};

// One configuration per refusal, each the smallest one that triggers it.
const REFUSALS = {
  no_sensors: lang => paint(SensorMonitorCard, { display: { language: lang }, sensors: {} }),
  not_supported: lang =>
    paint(PoolMonitorCard, {
      display: { language: lang },
      sensors: { not_a_pool_measurement: { entity: 'sensor.present' } },
    }),
  not_found: lang =>
    paint(SensorMonitorCard, {
      display: { language: lang },
      sensors: { room: { entity: 'sensor.absent', setpoint: 21, step: 1 } },
    }),
  no_scale: lang =>
    paint(SensorMonitorCard, {
      display: { language: lang },
      sensors: { room: { entity: 'sensor.present' } },
    }),
};

const KEYS = Object.keys(REFUSALS);

const textOf = host => host.textContent.replace(/\s+/g, ' ').trim();

describe('every locale carries every warning, no falling back to English', () => {
  const expected = Object.keys(translations.en.warning);

  for (const [lang, set] of Object.entries(translations)) {
    it(`in ${lang}`, () => {
      const missing = expected.filter(key => typeof set.warning?.[key] !== 'string');
      expect(missing).toEqual([]);
    });
  }

  // The sentence is what changes per language. `{limits}` and its neighbours
  // are YAML keys, and a translated one is a key Home Assistant will not
  // accept. They stay placeholders for that reason, and
  // `translations.test.js` already refuses a locale that drops or renames one,
  // so what is left to check here is that English still spells them as
  // placeholders rather than writing them into the sentence.
  it('the option names are placeholders, not words inside the sentence', () => {
    const scale = translations.en.warning.no_scale;
    for (const option of ['limits', 'setpoint', 'step', 'min', 'max']) {
      expect(scale, option).toContain(`{${option}}`);
    }
  });
});

describe('a refused configuration speaks the language of the card', () => {
  for (const key of KEYS) {
    it(`${key}: the French card reads French, and no English is left`, () => {
      const fr = textOf(REFUSALS[key]('fr'));
      expect(fr).toContain(translations.fr.warning[key].split('{')[0].trim());
      // The English sentence has to be gone, not merely joined by a French one.
      const englishTail = translations.en.warning[key].split('.').pop().trim();
      if (englishTail) expect(fr).not.toContain(englishTail);
    });

    it(`${key}: the English card still reads English`, () => {
      const en = textOf(REFUSALS[key]('en'));
      expect(en).toContain(translations.en.warning[key].split('{')[0].trim());
    });
  }
});

// The card names and entity ids the message quotes are Latin runs, and the
// sentence around them may be Hebrew. An unisolated Latin run drags the
// punctuation beside it to the far side of the line, which is the defect
// `right-to-left.test.js` measured on the reading and its unit.
describe('what the message quotes is isolated from the sentence', () => {
  it('the entity id sits in a bidi isolate', () => {
    const bdi = [...REFUSALS.not_found('he').querySelectorAll('bdi')].map(b => b.textContent);
    expect(bdi).toContain('sensor.absent');
  });

  it('so does every option name, and it is printed as code', () => {
    const host = REFUSALS.no_scale('he');
    const code = [...host.querySelectorAll('bdi > code')].map(c => c.textContent);
    expect(code).toEqual(['limits', 'setpoint', 'step', 'min', 'max']);
  });

  it('an option name is never translated, whatever the language', () => {
    for (const lang of Object.keys(translations)) {
      const code = [...REFUSALS.no_scale(lang).querySelectorAll('code')].map(c => c.textContent);
      expect(code, lang).toEqual(['limits', 'setpoint', 'step', 'min', 'max']);
    }
  });
});

// The banner is the one thing on this card that is a whole sentence, so
// translating it is what puts it in front of a right-to-left reader. Its accent
// bar and the gap after its icon were physical, and a `display: flex` row
// reverses: both would have landed on the empty side.
describe('the banner follows the reading direction', () => {
  const styles = read('core/src/styles/styles.ts');
  const rule = name => styles.match(new RegExp(`\\.${name} \\{[^}]*\\}`, 's'))?.[0] ?? '';

  it('the accent bar is on the side the sentence starts', () => {
    expect(rule('warning-message')).toContain('border-inline-start');
    expect(rule('warning-message')).not.toMatch(/border-(left|right)\s*:/);
  });

  it('the gap after the icon is on the side the sentence runs to', () => {
    expect(rule('warning-message ha-icon')).toContain('margin-inline-end');
    expect(rule('warning-message ha-icon')).not.toMatch(/margin-(left|right)\s*:/);
  });
});

// The four banners live above the split between the full and compact layouts,
// which is what keeps them from being fixed on one side only. `no-scale.test.js`
// already holds that for its own message; this holds it for the sentences.
describe('the warnings are written once, in the markup of neither layout', () => {
  it('card-base builds them all, and card-content builds none', () => {
    const base = read('core/src/card-base.ts');
    for (const key of KEYS) expect(base, key).toContain(`this.warning('${key}'`);
  });

  it('no English sentence is left in the markup that paints them', () => {
    const base = read('core/src/card-base.ts');
    const banners = [...base.matchAll(/<span>([^<]*)<\/span>/g)].map(m => m[1].trim());
    const hardcoded = banners.filter(text => text && !text.startsWith('${'));
    expect(hardcoded).toEqual([]);
  });
});
