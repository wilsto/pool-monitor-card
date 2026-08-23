import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, readdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

// The publish workflow splits a tag in two and used the half after the `@` without ever
// saying what that half may contain. The trigger filter is `pool-monitor@*`, so it was
// whatever got pushed, and it went on to name a git tag, a GitHub release and a commit
// message in four distribution repositories. The package half was pinned to four names
// by a `case`; the version half was pinned by nothing.
//
// Nothing was ever exploited and nothing could have been from outside: the repository is
// private and one account can push to it. This is the shape being removed, not an
// incident being repaired. The shape matters because the two things that keep it
// harmless, a private repository and a narrow tag filter, are both one settings change
// away from being false, and neither change would touch this file.
//
// Two properties are checked, and they fail for different reasons:
//
//   The parse refuses a version it cannot vouch for. Run for real, in bash, against the
//   script the workflow actually carries, because a regex copied into a test proves only
//   that the copy is well written.
//
//   No `${{ }}` is left inside a `run:`. That substitution happens before a shell exists,
//   so no amount of quoting inside the script can undo it, and it is the pattern GitHub's
//   hardening guide names first. `env:` hands the shell a value already formed.
//
// Line endings are normalised: git checks these files out with CRLF on a Windows working
// copy, and a test that split on "\n" alone has already passed here while measuring
// nothing (quality-baseline.test.js).

const root = resolve(__dirname, '../../..');
const workflowDir = resolve(root, '.github/workflows');
const read = p => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const workflows = readdirSync(workflowDir).filter(f => /\.ya?ml$/.test(f));

/**
 * Every `run:` block of a workflow, as {name, script}.
 *
 * A block opens on a `run: |` line and holds every following line indented past it, which
 * is what YAML's block scalar means. Written by hand rather than with a parser because no
 * YAML library is a dependency of this repository and one guard does not justify adding
 * one; the count assertion below is what stops the hand-written reader from going quietly
 * blind.
 */
function runBlocks(text) {
  const lines = text.split('\n');
  const blocks = [];
  let name = '(unnamed step)';

  for (let i = 0; i < lines.length; i++) {
    const named = lines[i].match(/^\s*-?\s*name:\s*(.+)$/);
    if (named) name = named[1].trim();

    const opener = lines[i].match(/^(\s*)-?\s*run:\s*(\S.*)?$/);
    if (!opener) continue;

    const indent = opener[1].length;
    // `run: npm ci` puts the whole script on the opening line.
    if (opener[2] && opener[2] !== '|' && opener[2] !== '|-') {
      blocks.push({ name, script: opener[2] });
      continue;
    }

    const body = [];
    let j = i + 1;
    for (; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        body.push('');
        continue;
      }
      if (lines[j].search(/\S/) <= indent) break;
      body.push(lines[j]);
    }
    i = j - 1;

    const strip = Math.min(...body.filter(l => l.trim()).map(l => l.search(/\S/)));
    blocks.push({ name, script: body.map(l => l.slice(strip)).join('\n') });
  }

  return blocks;
}

describe('the reader that finds run: blocks actually finds them', () => {
  // Without this, a reader that matched nothing would make every assertion below pass on
  // an empty set, which is how a green test measures nothing.
  it('reads several blocks out of the publish workflow', () => {
    expect(runBlocks(read(join(workflowDir, 'publish.yml'))).length).toBeGreaterThan(4);
  });

  it('and reads their contents, not just their headers', () => {
    const parse = runBlocks(read(join(workflowDir, 'publish.yml'))).find(
      b => b.name === 'Parse tag',
    );
    expect(parse, 'the step is named "Parse tag" in publish.yml').toBeDefined();
    expect(parse.script).toContain('GITHUB_OUTPUT');
  });
});

describe.each(workflows)('%s passes values through env, never through ${{ }}', file => {
  it('no run: block interpolates an expression', () => {
    const offenders = runBlocks(read(join(workflowDir, file)))
      .filter(b => b.script.includes('${{'))
      .map(b => b.name);
    expect(
      offenders,
      'these steps substitute a value into the script text before any shell exists to quote it; move them to the step`s env: block',
    ).toEqual([]);
  });
});

describe('the tag parse refuses a version it cannot vouch for', () => {
  const script = runBlocks(read(join(workflowDir, 'publish.yml'))).find(
    b => b.name === 'Parse tag',
  ).script;

  let dir;
  let scriptPath;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'parse-tag-'));
    scriptPath = join(dir, 'parse-tag.sh');
    writeFileSync(scriptPath, script);
  });

  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  // The real script, run by the same interpreter GitHub gives it. Not skipped when bash
  // is missing: publishing needs bash anyway, so an absent bash is a finding about the
  // machine rather than a reason to stop checking (publish-root.test.js:57).
  const parse = ref => {
    const outputs = join(dir, 'outputs.txt');
    writeFileSync(outputs, '');
    const run = spawnSync('bash', [scriptPath], {
      encoding: 'utf-8',
      env: { ...process.env, GITHUB_REF: `refs/tags/${ref}`, GITHUB_OUTPUT: outputs },
    });
    expect(run.error, 'bash is required to run the publish workflow').toBeUndefined();
    return { ...run, outputs: readFileSync(outputs, 'utf8') };
  };

  it('accepts the shape every release has used', () => {
    const run = parse('pool-monitor@2.11.0');
    expect(run.status, run.stdout + run.stderr).toBe(0);
    expect(run.outputs).toContain('package=pool-monitor');
    expect(run.outputs).toContain('version=2.11.0');
    expect(run.outputs).toContain('dist_repo=wilsto/pool-monitor-card');
  });

  it('accepts a pre-release suffix, which the four cards may still need', () => {
    expect(parse('air-quality@1.4.0-beta.2').status).toBe(0);
  });

  for (const bad of [
    'pool-monitor@latest',
    'pool-monitor@2.11',
    'pool-monitor@v2.11.0',
    'pool-monitor@',
    'pool-monitor@2.11.0 whatever',
    'pool-monitor@$(id)',
    'pool-monitor@2.11.0;id',
    'pool-monitor@`id`',
  ]) {
    it(`refuses ${bad}`, () => {
      const run = parse(bad);
      expect(run.status, `${bad} was accepted`).not.toBe(0);
      expect(run.stdout + run.stderr).toContain('is not X.Y.Z');
    });
  }

  it('still refuses a package it has no distribution repository for', () => {
    const run = parse('not-a-card@1.0.0');
    expect(run.status).not.toBe(0);
    expect(run.stdout + run.stderr).toContain('Unknown package');
  });
});
