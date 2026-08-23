import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// Hand-maintained lists have lied in this repository over and over, and each one got a test
// the day it was caught. The category that never got one is the internal documentation, and
// `TODO.md` is what that costs: it was corrected on 2026-08-17 by a commit whose subject was
// literally "the migration roadmap stops announcing finished work as pending", and it was
// still announcing a test count and a locale count that no longer matched six days later.
//
// It was deleted rather than corrected again, because the numbers were not the defect: a file
// holding state is. State lives on GitHub and in the commands that derive it. What a file may
// hold is mechanism, and mechanism breaks in exactly one way here, a renamed directory.
//
// `CLAUDE.md` is the file that replaces it, and it is read before anything else happens in a
// session, so a path in it that stopped existing misleads every session that follows. This is
// its guard, aimed at that failure mode and at nothing else. It checks no count, on purpose.
//
// `README.md` is guarded the same way and for the same reason, on the human side: it is the
// one document a newcomer reads for sure, and it pointed at `Local/HA_Dev/` for a bench that
// has lived in `bench/` since the migration. Nobody re-reads a paragraph that still parses.
//
// Line endings are normalised: git checks these files out with CRLF on a Windows working
// copy, which passed in CI and failed locally for two earlier documentation guards
// (options-doc.test.js:15, threshold-provenance.test.js:20).

const root = resolve(__dirname, '../../..');
const read = p => readFileSync(resolve(root, p), 'utf8').replace(/\r\n/g, '\n');

// A token is treated as a repository path when its first segment is an entry that actually
// sits at the root of the repository. That rule needs no allow-list to maintain: `npm test`,
// `editor/`, `config/www/` (relative to bench/) and `docker-compose.yaml` are simply not
// repository paths and are left alone, while anything starting with `packages/`, `scripts/`,
// `bench/`, `tests/`, `docs/` or `.github/` is checked.
const topLevel = new Set(readdirSync(root).filter(e => e !== '.git'));
const isRepoPath = token => topLevel.has(token.split('/')[0]);

// `packages/core/tests/{a,b}.test.js` is the table's shorthand for two files. Expanding it
// here is what makes the shorthand checkable instead of decorative.
const expand = token => {
  const brace = token.match(/^(.*)\{([^{}]+)\}(.*)$/);
  if (!brace) return [token];
  return brace[2].split(',').map(part => `${brace[1]}${part}${brace[3]}`);
};

const citedPaths = text =>
  [...new Set([...text.matchAll(/`([^`\s]+)`/g)].map(m => m[1]))]
    .flatMap(expand)
    .filter(isRepoPath);

// A cited path is valid if it exists, or if git is explicitly told to ignore it. The second
// case is not a loophole: `bench/config/www/` is written by the sync script and is absent
// from a fresh clone, and the rule about never committing a `.js` from it has to name it.
const ignoredByGit = path =>
  spawnSync('git', ['check-ignore', '-q', path], { cwd: root }).status === 0;

describe.each(['CLAUDE.md', 'README.md'])('%s cites paths that exist', file => {
  it('every one of them', () => {
    const missing = citedPaths(read(file)).filter(
      p => !existsSync(resolve(root, p)) && !ignoredByGit(p),
    );
    expect(missing).toEqual([]);
  });

  it('and it cites enough of them for the check to mean something', () => {
    // An extractor that silently matched nothing would make the assertion above pass on an
    // empty set. This is a floor on the reader, not a count of anything the file describes.
    expect(citedPaths(read(file)).length).toBeGreaterThan(5);
  });
});

// The territories are the hinge: they are what tells a session which files it may write and
// which perimeter its work belongs to. They are declared in docs/orchestration.md and
// repeated, by path, in the table of CLAUDE.md. Two copies of one list is exactly how every
// list this repository has lost died, so the second copy is checked against the first rather
// than trusted.
//
// Names are deliberately not compared. orchestration.md says "Code partagé" where the table
// says "Rendu partagé", and the table carries two perimeters orchestration.md has no row for,
// "Langues" and "Outillage et banc". Paths are the part that breaks on a rename.
describe('the perimeter table covers every territory of the orchestration page', () => {
  const section = (text, heading) => {
    const start = text.indexOf(heading);
    const end = text.indexOf('\n## ', start + 1);
    return text.slice(start, end === -1 ? undefined : end);
  };

  const territories = citedPaths(section(read('docs/orchestration.md'), '## Territoires'));
  const table = citedPaths(section(read('CLAUDE.md'), '## Table de correspondance'));

  it('reads both lists', () => {
    expect(territories.length).toBeGreaterThan(5);
    expect(table.length).toBeGreaterThan(5);
  });

  it('leaves no territory without a row', () => {
    expect(territories.filter(t => !table.includes(t))).toEqual([]);
  });
});

// These two rules lived only in bench/CLAUDE.md, a second-level file that is not reinjected
// after a context compaction. A hard rule at that level is a guard that switches off without
// saying so, which is worse than no rule at all because the guard looks present. They were
// lifted into the root file; this checks they stay there.
describe('the hard rules that cannot live at the second level stay at the root', () => {
  const claude = read('CLAUDE.md');

  it('keeps the bench out of a worktree', () => {
    expect(claude).toMatch(/worktree/i);
  });

  it('keeps the bench bundles out of git', () => {
    expect(claude).toContain('bench/config/www/');
  });

  it('keeps the type check at zero', () => {
    expect(claude).toContain('npm run typecheck');
  });
});
