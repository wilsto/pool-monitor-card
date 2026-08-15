import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The version used to live in two places: package.json, which drives the release
// tag, and a VERSION constant in the card source, which drives the console banner
// users read when reporting a bug. Nothing kept them in sync and they drifted —
// pool-monitor shipped as 2.11.0 while announcing 2.10.1 (#11).
//
// It now lives in package.json alone and rollup injects it at build time, the
// same way it already injects the build timestamp. A value that exists once
// cannot diverge from itself.
const CARDS = [
  ['pool-monitor', 'pool-monitor-card.ts'],
  ['sensor-monitor', 'sensor-monitor-card.ts'],
  ['aquarium-monitor', 'aquarium-monitor-card.ts'],
  ['air-quality', 'air-quality-card.ts'],
];

const root = resolve(__dirname, '../../..');
const read = (...p) => readFileSync(resolve(root, ...p), 'utf8');

describe('the version exists in exactly one place', () => {
  CARDS.forEach(([pkg, entry]) => {
    it(`${pkg}: the source hardcodes no version`, () => {
      const source = read('packages', pkg, 'src', entry);
      expect(source).not.toMatch(/const VERSION = '[0-9]/);
    });

    it(`${pkg}: rollup injects the version from package.json`, () => {
      const config = read('packages', pkg, 'rollup.config.js');
      expect(config).toContain('__BUILD_VERSION__');
      expect(config).toMatch(/package\.json/);
    });

    it(`${pkg}: the source reads the injected value`, () => {
      expect(read('packages', pkg, 'src', entry)).toContain('__BUILD_VERSION__');
    });
  });

  it('the generated distribution config injects it too', () => {
    const flatten = read('scripts', 'flatten-to-dist.js');
    expect(flatten).toContain('__BUILD_VERSION__');
  });
});
