import type { SensorsRegistry } from './ha/types.js';

/**
 * Home Assistant 2026.6 lets a custom card offer itself when the user picks an
 * entity in the card picker. Cards that opt in appear under a Community
 * section, below the built-in suggestions.
 *
 * The documented rule is "only suggest your card when it makes sense for the
 * entity", and it is the whole design constraint here: a picker full of
 * irrelevant cards is worse for everyone than no suggestion at all. So a card
 * only volunteers when the entity maps to one of its own presets without
 * ambiguity. A pH probe is a pool or an aquarium, and both may offer
 * themselves. A plain temperature or humidity reading belongs to all four
 * cards, so none of them claims it.
 *
 * https://developers.home-assistant.io/blog/2026/05/27/custom-card-suggestions/
 */

/** Home Assistant `device_class` value, mapped to the preset key it means here. */
export type DeviceClassMap = Record<string, string>;

export interface EntitySuggestion {
  config: {
    type: string;
    sensors: Record<string, { entity: string }>;
  };
}

/**
 * Matches a preset key against an entity id as whole words.
 *
 * A plain `includes` would read `sensor.phone_battery` as a pH probe, because
 * "phone" contains "ph". Wrapping both sides in underscores means the key has
 * to sit on token boundaries, and it still matches multi-word keys such as
 * `free_chlorine` inside `sensor.pool_free_chlorine`.
 */
const namesAPreset = (entityId: string, key: string): boolean => {
  const objectId = entityId.slice(entityId.indexOf('.') + 1);
  return `_${objectId}_`.includes(`_${key}_`);
};

/**
 * Builds the `getEntitySuggestion` function for one card.
 *
 * `byDeviceClass` carries the strong signal: Home Assistant already knows a
 * sensor measures carbon monoxide. `byName` covers the measurements Home
 * Assistant has no device class for, which is most of pool and aquarium
 * chemistry: ORP, cyanuric acid, ammonia, nitrite.
 */
export const buildEntitySuggestion =
  (cardType: string, registry: SensorsRegistry, byDeviceClass: DeviceClassMap, byName: string[]) =>
  (hass: any, entityId: string): EntitySuggestion | null => {
    if (typeof entityId !== 'string') return null;

    const domain = entityId.split('.')[0];
    if (domain !== 'sensor' && domain !== 'number') return null;

    const state = hass?.states?.[entityId];
    const deviceClass = state?.attributes?.device_class;

    // A card that has no preset for the match cannot render it, so the registry
    // has the last word even when the device class looks right.
    const fromClass = deviceClass ? byDeviceClass[deviceClass] : undefined;
    const key =
      fromClass && registry[fromClass]
        ? fromClass
        : byName.find(k => registry[k] && namesAPreset(entityId, k));

    if (!key) return null;

    return { config: { type: `custom:${cardType}`, sensors: { [key]: { entity: entityId } } } };
  };
