import { describe, it, expect, beforeAll } from 'vitest';

// wilsto/air-quality-card#3, opened by @LouiS22 in April.
//
// `air-quality-card` is registered by four cards on GitHub, ours included, and
// a fifth already uses `air-quality-monitor-card`. Whichever loads second is
// simply not there for the user, and no rename can be forced on the 732
// installations that already write `custom:air-quality-card`.
//
// PO decision 2026-08-16: register a second name and keep the old one, so
// existing configurations keep working. The name follows the family, next to
// pool-monitor-card, aquarium-monitor-card and sensor-monitor-card, and it is
// a less obvious one to reach for than "air quality card", which is exactly
// why four people reached for that one.

const CANONICAL = 'air-monitor-card';
const LEGACY = 'air-quality-card';

beforeAll(async () => {
  globalThis.__BUILD_TIMESTAMP__ = 'test';
  await import('../../air-quality/src/air-quality-card.js');
});

const cardEntry = () =>
  (globalThis.window?.customCards ?? []).find(c => c.type === CANONICAL || c.type === LEGACY);

describe('the card answers to a name nobody else uses', () => {
  it('registers the canonical name', () => {
    expect(customElements.get(CANONICAL)).toBeTruthy();
  });

  it('still registers the old one, so nothing existing breaks', () => {
    expect(customElements.get(LEGACY)).toBeTruthy();
  });

  // The legacy name needs its own constructor, because customElements refuses a
  // class already registered elsewhere. It is a bare subclass, so an element
  // created under the old name is an instance of the canonical card.
  it('the two names render the same card', () => {
    const canonical = customElements.get(CANONICAL);
    const legacy = customElements.get(LEGACY);
    expect(new legacy()).toBeInstanceOf(canonical);
    expect(legacy.SENSORS).toBe(canonical.SENSORS);
    expect(legacy.prototype.render).toBe(canonical.prototype.render);
  });

  it('a config written for either name loads', () => {
    for (const name of [CANONICAL, LEGACY]) {
      const card = new (customElements.get(name))();
      card.hass = { states: {}, entities: {} };
      expect(
        () => card.setConfig({ sensors: { co: { entity: 'sensor.co' } } }),
        name,
      ).not.toThrow();
    }
  });
});

describe('what new users are pointed at', () => {
  it('the card picker advertises the canonical name', () => {
    expect(cardEntry()?.type).toBe(CANONICAL);
  });

  it('and so does the entity suggestion, so a new card never gets the disputed name', () => {
    const hass = {
      states: { 'sensor.hall': { state: '3', attributes: { device_class: 'carbon_monoxide' } } },
    };
    const suggestion = cardEntry()?.getEntitySuggestion?.(hass, 'sensor.hall');
    expect(suggestion?.config?.type).toBe(`custom:${CANONICAL}`);
  });
});

describe('the collision is survived on either name', () => {
  it('the canonical name is free of the four cards that claim the old one', () => {
    // Recorded here so a future rename is not made blind: as of 2026-08-16,
    // `air-quality-card` is used by KadenThomp36, UrbanTechIO, wander00-1 and
    // us, and `air-quality-monitor-card` by YamanKoudmani.
    expect(CANONICAL).not.toBe('air-quality-card');
    expect(CANONICAL).not.toBe('air-quality-monitor-card');
  });
});
