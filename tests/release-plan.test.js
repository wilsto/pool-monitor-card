import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

// Publishing used to need a version tag pushed by hand, and the cloud sessions that do
// the work here are not allowed to push tags. Every release therefore stopped on a step
// only the PO's own computer could run, for an act the PO had already decided by
// approving the release. Merging a release PR now publishes it: a workflow tags each card
// whose version has no tag yet, then starts the publish for it.
//
// Two things have to hold for that to be safe, and this file checks both.
//
//   The plan names exactly the cards whose version is new. A tag for a version that
//   already shipped would republish it, and a card left out would silently not ship.
//   Run for real, in a throwaway repository, against the script the workflow calls.
//
//   The workflow wiring does what the plan assumes. A tag pushed with the workflow's own
//   token does not start another workflow, so the publish has to be started explicitly,
//   and publish.yml has to accept being started that way.

const root = resolve(__dirname, '../../..');
const PLAN = join(root, 'scripts', 'release-plan.sh');
const read = p => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const CARDS = ['pool-monitor', 'sensor-monitor', 'aquarium-monitor', 'air-quality'];

describe('the release plan names the cards whose version has no tag yet', () => {
  let repo;

  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf-8' });
  const setVersion = (pkg, version) =>
    writeFileSync(join(repo, 'packages', pkg, 'package.json'), JSON.stringify({ version }));
  const plan = () => {
    const run = spawnSync('bash', [join(repo, 'scripts', 'release-plan.sh')], {
      cwd: repo,
      encoding: 'utf-8',
    });
    expect(run.status, run.stdout + run.stderr).toBe(0);
    return run.stdout.split('\n').filter(Boolean);
  };

  beforeEach(() => {
    repo = mkdtempSync(join(tmpdir(), 'release-plan-'));
    mkdirSync(join(repo, 'scripts'));
    copyFileSync(PLAN, join(repo, 'scripts', 'release-plan.sh'));
    for (const pkg of CARDS) {
      mkdirSync(join(repo, 'packages', pkg), { recursive: true });
      setVersion(pkg, '1.0.0');
    }
    git('init', '-q');
    git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '--allow-empty', '-m', 'x');
    git('add', '-A');
    git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'release');
    for (const pkg of CARDS) git('tag', `${pkg}@1.0.0`);
  });

  afterEach(() => rmSync(repo, { recursive: true, force: true }));

  it('names nothing when every version already has its tag', () => {
    expect(plan()).toEqual([]);
  });

  it('names a card whose version was bumped, and only that one', () => {
    setVersion('air-quality', '1.1.0');
    expect(plan()).toEqual(['air-quality@1.1.0']);
  });

  it('names all four after a release that bumps all four', () => {
    for (const pkg of CARDS) setVersion(pkg, '2.0.0');
    expect(plan()).toEqual(CARDS.map(pkg => `${pkg}@2.0.0`));
  });
});

describe('merging a release publishes it', () => {
  const release = read(join(root, '.github', 'workflows', 'release.yml'));
  const publish = read(join(root, '.github', 'workflows', 'publish.yml'));

  it('runs when a version changes on main', () => {
    expect(release).toMatch(/push:\s*\n\s*branches: \[main\]/);
    expect(release).toContain("'packages/*/package.json'");
  });

  it('refuses a changelog that does not match before tagging anything', () => {
    expect(release.indexOf('generate-changelogs.js --check')).toBeGreaterThan(-1);
    expect(release.indexOf('generate-changelogs.js --check')).toBeLessThan(
      release.indexOf('git push origin'),
    );
  });

  it('tags from the plan and starts the publish on each tag', () => {
    expect(release).toContain('scripts/release-plan.sh');
    expect(release).toContain('gh workflow run publish.yml --ref "$tag"');
  });

  it('asks for the two permissions it uses and no others', () => {
    expect(release).toMatch(/permissions:\s*\n\s*contents: write\s*\n\s*actions: write/);
  });

  // A tag pushed with GITHUB_TOKEN starts no workflow, which is GitHub's guard against
  // loops. workflow_dispatch is the documented exception, so publish.yml must accept it.
  it('lets the publish be started on a tag, not only by a tag push', () => {
    expect(publish).toMatch(/^on:\n(?:.*\n)*?\s+workflow_dispatch:/m);
  });
});
