import { describe, it, expect } from 'vitest';
import { readdirSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
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
      expect(
        shipped.filter(d => !OWNED_DIRS.includes(d)),
        card.package,
      ).toEqual([]);
    }
  });

  it('clears the built and copied code as well', () => {
    for (const d of ['src', 'tests', 'dist']) expect(OWNED_DIRS).toContain(d);
  });
});

// The publish is destructive by design: it clears src/, tests/, dist/, docs/,
// example/ and resources/ in each distribution repository before rewriting
// them. Two things therefore have to hold, and neither did.
//
// The script had no main-module guard, so importing it, as the suite above
// does for OWNED_DIRS, ran the whole publish. `npm test` rewrote four real
// distribution directories every time.
//
// And it derived its destination by counting `..` from its own location, which
// is only right from the main checkout. From a worktree three levels deep under
// `.claude/worktrees/`, the same count landed inside the repository, dropping
// four flattened card repos untracked at the root of the main checkout.
describe('the publish only runs when it is asked to', () => {
  const root = resolve(__dirname, '../../..');
  const script = join(root, 'scripts', 'flatten-to-dist.js');

  it('writes nothing when the module is only imported', () => {
    const probe = join(tmpdir(), `flatten-probe-${process.pid}.mjs`);
    const target = join(tmpdir(), `flatten-probe-target-${process.pid}`);
    writeFileSync(
      probe,
      `await import(${JSON.stringify(pathToFileURL(script).href)});
`,
    );
    try {
      // --target so that a regression publishes into a temp directory rather
      // than into the real distribution repositories.
      const run = spawnSync(process.execPath, [probe, '--target', target], { encoding: 'utf-8' });
      expect(run.stdout).toBe('');
      expect(existsSync(target)).toBe(false);
    } finally {
      rmSync(probe, { force: true });
      rmSync(target, { recursive: true, force: true });
    }
  });

  it('never resolves its default destination inside the repository', () => {
    const run = spawnSync(process.execPath, [script, '--package', 'pool-monitor', '--dry-run'], {
      cwd: root,
      encoding: 'utf-8',
    });
    // Either it announced the destination, or it refused because that
    // destination does not exist on this machine, which is the normal case on a
    // fresh CI runner. Both name the path, and the path is what is under test.
    const destination = (run.stdout.match(/→ (.+) ===/) ??
      run.stderr.match(/Refusing to publish into (.+?): no such directory/))?.[1];
    expect(destination, run.stdout + run.stderr).toBeTruthy();

    // Against the main checkout, not `root`: from a worktree those differ, and
    // the main checkout is where the stray directory used to appear.
    const gitDir = execFileSync(
      'git',
      ['rev-parse', '--path-format=absolute', '--git-common-dir'],
      { cwd: root, encoding: 'utf-8' },
    ).trim();
    const mainCheckout = resolve(gitDir, '..');
    expect(relative(mainCheckout, destination).startsWith('..')).toBe(true);
  });
});
