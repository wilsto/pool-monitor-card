import { describe, it, expect } from 'vitest';
import { translations } from '../src/locales/translations.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';
import { AquariumMonitorCard } from '../../aquarium-monitor/src/aquarium-monitor-card.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';

// A preset with no name renders its own key. The air card wrote `sensor.pm25`
// under the bar, and the aquarium card `sensor.ammonia`, on every install in
// every language, because nine and six presets had no entry at all.
//
// This is the seventh hand-maintained list in this repository, after the
// language menu, the CSS classes, SUPPORTED_LANGUAGES, the editor colours, the
// preset count and the options table. Adding a preset and forgetting its name
// is the same mistake each of those made, so it gets the same treatment.

const CARDS = {
  'pool-monitor': PoolMonitorCard,
  'aquarium-monitor': AquariumMonitorCard,
  'air-monitor': AirQualityCard,
};

const presets = Object.entries(CARDS).flatMap(([card, Card]) =>
  Object.keys(Card.SENSORS).map(key => [card, key]),
);

describe('every preset has a name to show', () => {
  for (const [lang, set] of Object.entries(translations)) {
    it(`in ${lang}`, () => {
      const nameless = presets
        .filter(([, key]) => !set.sensor?.[key])
        .map(([card, key]) => `${card}.${key}`);
      expect(nameless).toEqual([]);
    });
  }
});

describe('a name is a name, not a key', () => {
  it('none of them is the key spelled back', () => {
    const echoed = [];
    for (const [lang, set] of Object.entries(translations)) {
      for (const [, key] of presets) {
        const name = set.sensor?.[key];
        if (name && name.toLowerCase() === key.toLowerCase()) echoed.push(`${lang}.${key}`);
      }
    }
    // `ph` reads pH, `orp` ORP: an abbreviation is the name users know. What is
    // refused is a snake_case key surfacing as a label.
    expect(echoed.filter(e => e.includes('_'))).toEqual([]);
  });
});

