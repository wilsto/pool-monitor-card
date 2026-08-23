import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

// scripts/publish-all.sh decides what to tag by reading packages/<card>/package.json,
// and it read them through a relative path with no `cd` of its own. It therefore
// published according to whichever directory it happened to be launched from. Run
// from a worktree while aiming at the main checkout, it read that worktree's versions
// and refused, naming versions that were not the ones on main (#111).
//
// The refusal was luck. It happened only because those versions already had tags. The
// symmetric case is silent: a tree carrying higher versions matches no tag, so nothing
// refuses, and the script pushes tags for versions that exist in no file of the
// repository the publish then builds. That is what the decoy below carries.
//
// The property under test is not "it works from the root", it is "it behaves the same
// from anywhere", so the two runs are compared to each other rather than to an expected
// string. What the script prints depends on which tags are present, and that legitimately
// differs between a full clone and CI's depth-1 checkout. The property does not.

const root = resolve(__dirname, '../../..');
const script = join(root, 'scripts', 'publish-all.sh');
const CARDS = ['pool-monitor', 'sensor-monitor', 'aquarium-monitor', 'air-quality'];
const DECOY_VERSION = '99.99.99';

const output = run => run.stdout + run.stderr;

describe('the publish reads the repository it publishes, not the directory it was called from', () => {
  let decoy;
  let fromRoot;
  let fromElsewhere;

  beforeAll(() => {
    // A tree that looks like the monorepo through a relative path, carrying versions
    // that have no tag. Before the fix this is what the script published from.
    decoy = mkdtempSync(join(tmpdir(), 'publish-cwd-'));
    for (const card of CARDS) {
      mkdirSync(join(decoy, 'packages', card), { recursive: true });
      writeFileSync(
        join(decoy, 'packages', card, 'package.json'),
        JSON.stringify({ name: card, version: DECOY_VERSION }),
      );
    }

    // --dry-run throughout: this runs the real publish script against the real repo,
    // and only the dry run is free of `git tag` and `git push`.
    const dryRun = cwd => spawnSync('bash', [script, '--dry-run'], { cwd, encoding: 'utf-8' });
    fromRoot = dryRun(root);
    fromElsewhere = dryRun(decoy);
  });

  afterAll(() => rmSync(decoy, { recursive: true, force: true }));

  it('runs at all', () => {
    // Not skipped when bash is missing: publishing needs bash on this machine anyway,
    // so an absent bash is a finding about the machine, not a reason to stop checking.
    expect(fromRoot.error, 'scripts/publish-all.sh is a bash script').toBeUndefined();
    expect(fromElsewhere.error, 'scripts/publish-all.sh is a bash script').toBeUndefined();
  });

  it('reaches the same verdict from both places', () => {
    expect(fromElsewhere.status, output(fromElsewhere)).toBe(fromRoot.status);
  });

  it('and says exactly the same thing', () => {
    expect(fromElsewhere.stdout).toBe(fromRoot.stdout);
    expect(fromElsewhere.stderr).toBe(fromRoot.stderr);
  });

  it('never reads the versions of the directory it was called from', () => {
    expect(output(fromRoot)).not.toContain(DECOY_VERSION);
    expect(output(fromElsewhere)).not.toContain(DECOY_VERSION);
  });

  it('reads the repository ones instead, so the comparison means something', () => {
    // A floor on the reader: two identically empty outputs would satisfy everything
    // above. This names a version that only the repository holds.
    const version = JSON.parse(
      readFileSync(join(root, 'packages', 'pool-monitor', 'package.json'), 'utf-8'),
    ).version;
    expect(output(fromRoot)).toContain(`pool-monitor@${version}`);
  });

  it('pushes nothing while being asked', () => {
    expect(output(fromRoot)).not.toMatch(/^Tagging /m);
    expect(output(fromElsewhere)).not.toMatch(/^Tagging /m);
  });
});
