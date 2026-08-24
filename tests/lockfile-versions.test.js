import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// package-lock.json copies the version of every workspace package into its own
// `packages/<dir>` entry. Nothing in the release path writes that copy back:
// a version bump touches packages/<card>/package.json, and the lock is only
// rewritten by `npm install`, which no script and no workflow runs. The two
// therefore drift by one release every release, silently.
//
// Measured 2026-08-24 on a tree exported from HEAD with no node_modules: the
// lock still named pool-monitor 2.11.0, sensor-monitor 1.8.1, air-quality and
// aquarium-monitor 0.8.1, eleven and twelve releases behind. `npm ci` accepted
// it without a word, because workspace entries are symlinks and their version
// plays no part in resolution , which is exactly why the drift was invisible.
// What it cost is on the other side: `npm install` on that tree printed "up to
// date" and rewrote those four lines anyway, so anyone installing dependencies
// found their working tree dirty with a diff they had not asked for. It
// happened on 2026-08-23 to the session that shipped PR #112, which reverted it
// by hand to keep its diff clean (#113).
//
// This is the same shape as the hand-kept lists of #99, a fact duplicated
// somewhere nothing updates, except the duplication is made by the tool rather
// than by a person. The remedy is the same: not a reminder, a check that fails.
const root = resolve(__dirname, '../../..');
const read = (...p) => JSON.parse(readFileSync(resolve(root, ...p), 'utf8'));

const lock = read('package-lock.json');
const workspaces = readdirSync(resolve(root, 'packages'), { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

describe('package-lock.json agrees with the workspace packages', () => {
  it('finds every workspace package in the lock', () => {
    expect(workspaces.length).toBeGreaterThan(0);
    workspaces.forEach(dir => {
      expect(lock.packages, `packages/${dir} is missing from package-lock.json`).toHaveProperty(
        `packages/${dir}`,
      );
    });
  });

  workspaces.forEach(dir => {
    it(`${dir}: the lock carries the version package.json declares`, () => {
      const declared = read('packages', dir, 'package.json').version;
      const locked = lock.packages[`packages/${dir}`]?.version;
      expect(
        locked,
        `package-lock.json says ${locked} for packages/${dir}, packages/${dir}/package.json says ${declared}. ` +
          `Run \`npm install --package-lock-only\` and commit the lock with the version bump.`,
      ).toBe(declared);
    });
  });
});
