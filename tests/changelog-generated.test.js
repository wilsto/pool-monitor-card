import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  PACKAGES,
  audit,
  compareVersions,
  releaseNote,
  renderEntry,
  tagsOf,
} from '../../../scripts/generate-changelogs.js';

// The four changelogs were kept by hand and stopped at 2.17.4 on 2026-08-16. Six
// versions per card shipped after that with no entry, and the silence was not
// cosmetic: `publish.yml` read those files to build the release note, found
// nothing, and fell back to a single line pointing at `wilsto/monitor-cards`,
// which is private. A fork author reported the 404 on 2026-08-24, a week after
// the first dead link shipped. Nothing on our side had noticed.
//
// PR #151 fixed the fallback. This file fixes the source: the entries above the
// frontier are derived from the merged pull requests, and what follows refuses a
// file that no longer matches its own derivation.
//
// That refusal is the whole point. Generating the six missing entries once would
// have replaced eleven hand-kept lists with a twelfth, indistinguishable six
// months from now. `npm test` runs on every pull request and on main, and inside
// `publish.yml` before anything is pushed to a distribution repository, so a
// drifted changelog stops a release rather than shipping in one.
const root = resolve(import.meta.dirname, '../../..');

describe('the generated half of each changelog matches its tags', () => {
  it('has tags to derive from at all', () => {
    // Same reasoning as commit-addressing.test.js: on a shallow checkout, or one
    // fetched without tags, every range below would be empty and every file
    // would look correct while proving nothing. Failing here says which.
    for (const pkg of PACKAGES) {
      expect(tagsOf(pkg.name).length, `no ${pkg.name}@* tag is visible: fetch tags before trusting this file`).toBeGreaterThan(0);
    }
  });

  it.each(PACKAGES.map(p => p.name))('%s is what the generator produces', name => {
    const file = audit().find(f => f.name === name);
    expect(
      file.actual,
      `packages/${name}/CHANGELOG.md drifted from its tags. Run: node scripts/generate-changelogs.js --write`,
    ).toBe(file.expected);
  });

  it.each(PACKAGES)('$name still carries every entry written by hand', pkg => {
    // The generated half is disposable, the hand-written half is not: 2.14.0
    // explains a carbon monoxide reading announced as *Ideal* in fifty lines
    // that no derivation can rebuild. The frontier entry has to be present, and
    // it has to be below the generated ones, or the generator has silently
    // taken over a page somebody wrote.
    const text = readFileSync(resolve(root, 'packages', pkg.name, 'CHANGELOG.md'), 'utf8');
    const frontier = text.indexOf(`\n## [${pkg.handWrittenThrough}]`);
    expect(frontier, `the frontier ${pkg.handWrittenThrough} declared in the generator is absent from the file`).toBeGreaterThan(-1);

    const generated = [...text.matchAll(/^## \[([\d.]+)\]/gm)]
      .filter(m => m.index < frontier)
      .map(m => m[1]);
    for (const version of generated) {
      expect(
        compareVersions(version, pkg.handWrittenThrough),
        `${version} sits above the frontier but is not newer than it`,
      ).toBeGreaterThan(0);
    }
  });

  it('every published version above the frontier has an entry', () => {
    // The defect this whole file exists for, stated directly: a tag with no
    // entry. It is what a reader of the distribution repository sees as a
    // version that shipped nothing.
    //
    // Only above the frontier, and that is not laziness. Two tags below it are
    // undocumented and always were, pool-monitor@2.10.0 and @2.10.1:
    //
    //   git tag -l 'pool-monitor@2.10.*'          # 2.10.0 2.10.1 2.10.2
    //   grep -c '\[2.10.0\]' packages/pool-monitor/CHANGELOG.md   # 0
    //
    // Both predate the pull request convention, so nothing can be derived for
    // them and only a person who remembers March could write them. Failing on
    // them would mean a guard nobody can turn green, which is a guard that gets
    // deleted. They stay visible here instead.
    for (const pkg of PACKAGES) {
      const text = readFileSync(resolve(root, 'packages', pkg.name, 'CHANGELOG.md'), 'utf8');
      const missing = tagsOf(pkg.name)
        .filter(v => compareVersions(v, pkg.handWrittenThrough) > 0)
        .filter(v => !text.includes(`\n## [${v}] - `));
      expect(missing, `packages/${pkg.name}/CHANGELOG.md documents no such version`).toEqual([]);
    }
  });
});

describe('nothing in a changelog can hurt a reader who is not us', () => {
  it('no changelog links to the private monorepo', () => {
    // flatten-to-dist.js copies CHANGELOG.md into the distribution repository
    // (its step 7), so these four files are public pages. public-links.test.js
    // draws the same line for scripts/dist-readmes and for publish.yml; this is
    // the third door into a public repository.
    for (const pkg of PACKAGES) {
      const text = readFileSync(resolve(root, 'packages', pkg.name, 'CHANGELOG.md'), 'utf8');
      expect(
        text.includes('github.com/wilsto/monitor-cards'),
        `packages/${pkg.name}/CHANGELOG.md is copied into a public repository and would 404`,
      ).toBe(false);
    }
  });

  it('an entry with nothing behind it says so instead of looking empty', () => {
    // Some tags predate the pull request convention, and a future one may carry
    // no merge at all. An entry with a heading and no body reads like a broken
    // page rather than a quiet release.
    const rendered = renderEntry({ version: '9.9.9', date: '2026-01-01', bullets: [] });
    expect(rendered).toContain('## [9.9.9] - 2026-01-01');
    expect(rendered).toContain('Version bump only');
  });
});

describe('the release note and the changelog stay one mechanism', () => {
  it('the note publish.yml extracts is the entry this generator wrote', () => {
    // publish.yml reads the changelog with awk and only derives when it finds
    // nothing. Both halves now come from the same derivation, so the note a
    // reader gets is the entry checked above rather than a second opinion.
    const latest = tagsOf('pool-monitor').at(-1);
    const note = releaseNote('pool-monitor', latest);
    expect(note, `no entry for pool-monitor ${latest} to publish`).toBeTruthy();
    expect(note.startsWith('###'), 'a release note must open on a heading, never on a bare list').toBe(true);
  });

  it('the note always ends with where to get the card', () => {
    // The changelog says what changed, not where to get it. That paragraph used
    // to exist only in publish.yml's fallback, so filling the changelog would
    // have quietly removed it from every future release: the fallback stops
    // firing the moment the file has an entry. It is appended to both halves.
    const workflow = readFileSync(resolve(root, '.github/workflows/publish.yml'), 'utf8');
    const fallbackAt = workflow.indexOf('if [ ! -s release-notes.md ]');
    const footerAt = workflow.indexOf('Install or update through HACS');
    expect(fallbackAt, 'the derived fallback disappeared from publish.yml').toBeGreaterThan(-1);
    expect(footerAt, 'the release note no longer tells a reader where to get the card').toBeGreaterThan(fallbackAt);
    expect(
      workflow.slice(fallbackAt, footerAt).includes('fi'),
      'the closing paragraph is inside the fallback again, so a note built from the changelog would lose it',
    ).toBe(true);
  });

  it('the generator never reads the clock', () => {
    // A date taken from `today` would make this guard red tomorrow morning with
    // nobody having touched a file, and a guard that goes red on its own gets
    // switched off. Every date here comes from a commit.
    const source = readFileSync(resolve(root, 'scripts/generate-changelogs.js'), 'utf8');
    expect(source.includes('new Date'), 'a generated entry must not be dated from the clock').toBe(false);
    expect(source.includes('Date.now'), 'a generated entry must not be dated from the clock').toBe(false);
  });
});

describe('the generated half does not move on its own', () => {
  it('a release merge does not add a bullet to the entry it releases', () => {
    // The window that would have broken the guard: the entry is generated in the
    // release commit against `last tag..HEAD`, then the release pull request is
    // merged and tagged, so the range grows by that merge commit. Its body is
    // the release commit subject, which the filter drops, so the entry does not
    // move. This checks the filter still drops it.
    const bodies = execFileSync(
      'git',
      ['log', '--merges', '--format=%b', 'pool-monitor@2.22.0..pool-monitor@2.23.0'],
      { cwd: root, encoding: 'utf8' },
    );
    expect(
      bodies.includes('chore(release)'),
      'this range no longer contains a release merge, so it proves nothing about the filter',
    ).toBe(true);

    const entry = audit().find(f => f.name === 'pool-monitor').expected;
    const body = entry.slice(entry.indexOf('## [2.23.0]'), entry.indexOf('## [2.22.0]'));
    expect(body.includes('chore(release)'), 'the release commit leaked into the entry it releases').toBe(false);
    expect(body.toLowerCase().includes('2.23.0 pool'), 'the release commit leaked into the entry it releases').toBe(false);
  });
});
