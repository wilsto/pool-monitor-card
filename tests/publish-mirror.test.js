import { describe, it, expect } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { OWNED_DIRS } from '../../../scripts/flatten-to-dist.js';
import { CARDS } from '../../../scripts/generate-readmes.js';

// The publish clears these directories before copying, so that a file removed
// from the monorepo also disappears from the public repository. Four superseded
// hero images stayed online for months because nothing ever removed anything.
//
// The dangerous version of that fix is emptying the whole clone. `hacs.json`
// exists only in the distribution repository, and HACS refuses a repository
// without one, so wiping it would take all four cards out of the store.

const NEVER_OURS = ['hacs.json', '.gitignore', '.github', 'LICENSE', 'package.json', 'README.md'];

describe('the publish mirrors what it owns and only that', () => {
  it('never clears anything the distribution repository owns', () => {
    expect(OWNED_DIRS.filter(d => NEVER_OURS.includes(d))).toEqual([]);
  });

  it('clears every directory the generated documentation ships', () => {
    const root = resolve(__dirname, '../../..');
    for (const card of CARDS) {
      const dir = resolve(root, 'scripts/dist-readmes', card.repo.split('/')[1]);
      if (!existsSync(dir)) continue;
      const shipped = readdirSync(dir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);
      expect(shipped.filter(d => !OWNED_DIRS.includes(d)), card.package).toEqual([]);
    }
  });

  it('clears the built and copied code as well', () => {
    for (const d of ['src', 'tests', 'dist']) expect(OWNED_DIRS).toContain(d);
  });
});
