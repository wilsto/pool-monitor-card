import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

// monitor-cards#61, from @rpirsc13's fork, which had built `window_entity` and
// `fan_entity` to shorten the road between "the air is bad" and "open the
// window".
//
// `status_entity` never restricted the domain, so pointing it at a window
// already worked. What came out was the problem, and it was measured on the
// bench on 2026-08-23 before anything was changed: the badge read `On` — the
// raw state, in English, in a French Home Assistant — painted with the disabled
// grey and wearing `mdi:help-circle`. Legible as a colour, meaningless as a
// sentence.
//
// Two of those three were defects. The third, the grey, was not: an open window
// is neither good nor bad, and a card that does not know the CO2 level cannot
// say which. What was wrong was *which* grey — the one Home Assistant uses for
// an entity that is broken.

const build = (config, states, extra = {}) => {
  const card = new AirQualityCard();
  card.hass = { states, entities: {}, ...extra };
  card.setConfig(config);
  return card;
};

const state = (value, attributes = {}) => ({
  state: String(value),
  attributes,
  last_updated: '2026-08-23T10:00:00Z',
});

const STATES = {
  'sensor.salon_co2': state(1150),
  'sensor.salon_humidity': state(58),
  'binary_sensor.fenetre_salon': state('on'),
  'binary_sensor.fenetre_cuisine': state('off'),
  'cover.velux': state('open'),
  'cover.velux_ferme': state('closed'),
  'fan.purificateur': state('on', { icon: 'mdi:air-purifier' }),
  'sensor.wg_status': state('Ok'),
  'sensor.wg_score': state(85),
  'sensor.charabia': state('etat_inconnu'),
};

const status = (statusEntity, extra) =>
  build(
    { sensors: { co2: { entity: 'sensor.salon_co2', status_entity: statusEntity } } },
    STATES,
    extra,
  ).processData().co2_1.status;

const ACTIVE = 'var(--primary-color, #03a9f4)';
const INACTIVE = 'var(--state-inactive-color, var(--secondary-text-color, #6f6f6f))';

describe('an equipment state is not a verdict', () => {
  it('an open window is neither green nor red, and no longer the disabled grey', () => {
    const s = status('binary_sensor.fenetre_salon');
    expect(s.color).toBe(ACTIVE);
    expect(s.color).not.toContain('disabled');
  });

  it('a closed window is painted as off, not as broken', () => {
    expect(status('binary_sensor.fenetre_cuisine').color).toBe(INACTIVE);
  });

  // The first attempt used `--state-active-color`, which the bench showed to be
  // amber in the default theme: on a card that paints caution yellow and alarm
  // orange, an amber pill reads as a third verdict.
  it('and neither colour is one the card uses to judge a measurement', () => {
    const { normal, low, warn } = build({ sensors: {} }, STATES).getConfig().colors;
    expect([normal, low, warn]).not.toContain(ACTIVE);
    expect([normal, low, warn]).not.toContain(INACTIVE);
  });

  it('a cover says open and closed the same way a binary sensor says on and off', () => {
    expect(status('cover.velux').color).toBe(ACTIVE);
    expect(status('cover.velux_ferme').color).toBe(INACTIVE);
  });

  it('carries no question mark: the card understood the state perfectly', () => {
    expect(status('binary_sensor.fenetre_salon').icon).toBe('');
    expect(status('binary_sensor.fenetre_cuisine').icon).toBe('');
  });

  it('but shows the entity icon when the entity declares one', () => {
    expect(status('fan.purificateur').icon).toBe('mdi:air-purifier');
  });
});

describe('the state is written in the language the rest of the dashboard is in', () => {
  // Home Assistant already translates entity states per device class, in every
  // language it ships. Verified on the bench: `formatEntityState` is a function
  // on the live frontend, and `component.binary_sensor.entity_component.window`
  // answers Ouvert and Fermé in French. Copying that into seventeen locale
  // files would be a worse table, and a shorter one.
  const withFormatter = {
    formatEntityState: stateObj => ({ on: 'Ouvert', off: 'Fermé' })[stateObj.state] || 'Nope',
  };

  it('asks Home Assistant rather than printing the raw state', () => {
    expect(status('binary_sensor.fenetre_salon', withFormatter).label).toBe('Ouvert');
    expect(status('binary_sensor.fenetre_cuisine', withFormatter).label).toBe('Fermé');
  });

  it('falls back to the raw state on a frontend that has no formatter', () => {
    expect(status('binary_sensor.fenetre_salon').label).toBe('on');
  });

  it('leaves a number alone: a WaterGuru score of 85 reads 85, never "85 %"', () => {
    const numeric = {
      formatEntityState: () => '85 %',
    };
    expect(status('sensor.wg_score', numeric).label).toBe('85');
  });
});

describe('nothing a verdict badge did before has changed', () => {
  it('a WaterGuru Ok is still green and still wears its check mark', () => {
    const s = status('sensor.wg_status');
    expect(s.color).toBe(build({ sensors: {} }, STATES).getConfig().colors.normal);
    expect(s.icon).toBe('mdi:check-circle');
  });

  it('a word the card does not recognise is still grey with a question mark', () => {
    const s = status('sensor.charabia');
    expect(s.color).toBe('var(--disabled-text-color, #bdbdbd)');
    expect(s.icon).toBe('mdi:help-circle');
  });

  it('a numeric score still lands on its band', () => {
    expect(status('sensor.wg_score').color).toBe(
      build({ sensors: {} }, STATES).getConfig().colors.normal,
    );
  });
});

// The card paints its rows twice, and the last fixes each had to be applied in
// both places. One of them nearly was not.
describe('both layouts, and both levels', () => {
  const paint = compact => {
    const card = build(
      {
        title: 'Salon',
        status_entity: 'binary_sensor.fenetre_salon',
        display: { compact },
        sensors: {
          co2: { entity: 'sensor.salon_co2', status_entity: 'binary_sensor.fenetre_cuisine' },
        },
      },
      STATES,
      { formatEntityState: stateObj => ({ on: 'Ouvert', off: 'Fermé' })[stateObj.state] },
    );
    const host = document.createElement('div');
    render(card.render(), host);
    return host;
  };

  for (const compact of [false, true]) {
    const name = compact ? 'compact' : 'full';

    it(`the room's window shows in the header, ${name} layout`, () => {
      expect(paint(compact).textContent).toContain('Ouvert');
    });

    it(`a window pinned to one measurement shows next to it, ${name} layout`, () => {
      expect(paint(compact).textContent).toContain('Fermé');
    });

    it(`and neither of them draws an icon, ${name} layout`, () => {
      const icons = [...paint(compact).querySelectorAll('ha-icon')].map(el =>
        el.getAttribute('icon'),
      );
      expect(icons).not.toContain('mdi:help-circle');
      expect(icons).not.toContain('');
    });
  }
});
