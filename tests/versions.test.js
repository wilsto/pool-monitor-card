import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The version lives in two places: package.json (drives the release tag) and a
// VERSION constant in the card source (drives the console banner users read when
// they report a bug). Nothing keeps them in sync, so they drift silently.
const CARDS = [
  ['pool-monitor', 'pool-monitor-card.ts'],
  ['sensor-monitor', 'sensor-monitor-card.ts'],
  ['aquarium-monitor', 'aquarium-monitor-card.ts'],
  ['air-quality', 'air-quality-card.ts'],
];

const root = resolve(__dirname, '../../..');

describe('card version consistency', () => {
  CARDS.forEach(([pkg, entry]) => {
    it(`${pkg}: VERSION in source matches package.json`, () => {
      const manifest = JSON.parse(
        readFileSync(resolve(root, 'packages', pkg, 'package.json'), 'utf8'),
      );
      const source = readFileSync(resolve(root, 'packages', pkg, 'src', entry), 'utf8');
      const match = source.match(/const VERSION = '([^']+)'/);

      expect(match, `no VERSION constant found in ${entry}`).not.toBeNull();
      expect(match[1]).toBe(manifest.version);
    });
  });
});
