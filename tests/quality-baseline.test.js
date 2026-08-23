import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

// A baseline freezes the violations that already exist so that only new ones
// fail. Nothing is frozen today, `npm run typecheck` and `npm run lint` are both
// at zero, and this file changes nothing while that holds: with no baseline on
// disk it runs no tool and asserts nothing about either gate.
//
// It exists for the day a major upgrade of tsc or eslint produces a hundred
// violations at once. Without it the choice that day is between fixing all of
// them in one commit and turning the rule off, and the second one is what
// actually happens.
//
// The lint half of the mechanism is not written here. ESLint 9.39 ships it:
// dropping an `eslint-suppressions.json` at the root is enough, `npm run lint`
// then passes on a suppressed violation, fails on a new one, and fails again
// once a suppression stops occurring. Measured on 2026-08-23, exit codes 0, 1
// and 2. What this file adds for lint is one guard on the flag that would turn
// that last part off.
//
// What keeps a baseline from becoming permanent is at the bottom of this file.

const ROOT = resolve(__dirname, '../../..');

/** Where a frozen violation list may sit, and which command reads it. */
const BASELINES = [
  { file: 'typecheck-baseline.txt', gate: 'npm run typecheck' },
  { file: 'eslint-suppressions.json', gate: 'npm run lint' },
];

/**
 * The one page that says why a baseline exists. A frozen list is a debt, and a
 * debt nobody can see is the failure mode of this whole technique, so the file
 * at the root is the visible part and this is what makes it mandatory.
 */
const DECLARATION = 'BASELINES.md';

const inForce = () => BASELINES.filter(b => existsSync(join(ROOT, b.file)));

describe('a baseline is never silent', () => {
  it('names, in one page, every baseline in force and the issue that removes it', () => {
    const present = inForce();
    if (present.length === 0) return;

    const page = join(ROOT, DECLARATION);
    expect(
      existsSync(page),
      `${present.map(b => b.file).join(', ')} freezes violations, so ${DECLARATION} has to say why`,
    ).toBe(true);

    const lines = readFileSync(page, 'utf-8').split('\n');
    for (const { file } of present) {
      const named = lines.filter(line => line.includes(file));
      expect(named, `${DECLARATION} never mentions ${file}`).not.toEqual([]);
      expect(
        named.some(line => /#\d+/.test(line)),
        `${DECLARATION} mentions ${file} without an issue that tracks removing it`,
      ).toBe(true);
    }
  });

  it('keeps no declaration once the last baseline is gone', () => {
    if (inForce().length > 0) return;
    expect(
      existsSync(join(ROOT, DECLARATION)),
      `${DECLARATION} declares baselines that no longer exist, delete it`,
    ).toBe(false);
  });

  // `--pass-on-unpruned-suppressions` is the one flag that lets an ESLint
  // suppression outlive the violation it was written for. Without it the lint
  // fails as soon as a suppressed violation stops occurring, which is what makes
  // the list shrink rather than sit there.
  it('never turns off the pruning ESLint does on its own', () => {
    const { scripts } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
    for (const name of ['lint', 'lint:fix']) {
      expect(scripts[name] ?? '', name).not.toContain('--pass-on-unpruned-suppressions');
    }
  });
});

const TYPECHECK_BASELINE = join(ROOT, 'typecheck-baseline.txt');

/**
 * One frozen error, as `count<TAB>file<TAB>code<TAB>message`.
 *
 * Line and column are deliberately absent: a baseline keyed on them would be
 * invalidated by any edit above the error, and a baseline that has to be
 * regenerated on every commit is one nobody reads. The count is what keeps a
 * second occurrence in an already-known file from slipping through.
 */
function readTypecheckBaseline() {
  const counts = new Map();
  for (const line of readFileSync(TYPECHECK_BASELINE, 'utf-8').split(/\r?\n/)) {
    if (line.trim() === '' || line.startsWith('#')) continue;
    const [count, ...key] = line.split('\t');
    counts.set(key.join('\t'), Number(count));
  }
  return counts;
}

function currentTypecheckErrors() {
  const tsc = createRequire(import.meta.url).resolve('typescript/bin/tsc');
  const run = spawnSync(process.execPath, [tsc, '--noEmit', '--pretty', 'false'], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  const counts = new Map();
  // `\r?\n`, not `\n`: tsc ends its lines with CRLF on Windows, and a trailing
  // carriage return makes the `$` below miss every error, which turns this whole
  // mechanism into a green that measures nothing.
  for (const line of run.stdout.split(/\r?\n/)) {
    const error = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+): (.*)$/);
    if (!error) continue;
    const key = [error[1].replaceAll('\\', '/'), error[2], error[3].trim()].join('\t');
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

describe.skipIf(!existsSync(TYPECHECK_BASELINE))('the frozen typecheck errors', () => {
  it('holds at least one error, or it is a file to delete', () => {
    expect(
      [...readTypecheckBaseline().keys()],
      'an empty baseline hides nothing and only costs a tsc run',
    ).not.toEqual([]);
  });

  it('fails on an error the baseline does not already hold', () => {
    const baseline = readTypecheckBaseline();
    const appeared = [...currentTypecheckErrors()]
      .filter(([key, count]) => count > (baseline.get(key) ?? 0))
      .map(([key]) => key);
    expect(appeared, 'these errors are new, the baseline does not excuse them').toEqual([]);
  });

  // The other half, and the half that keeps the file from being permanent: an
  // entry that no longer reproduces has to leave. The list can only shrink, and
  // when the last line goes the file goes with it. This is what ESLint does with
  // `--prune-suppressions`, transcribed for tsc, which has nothing of the kind.
  it('fails on an entry that no longer reproduces', () => {
    const current = currentTypecheckErrors();
    const gone = [...readTypecheckBaseline()]
      .filter(([key, count]) => count > (current.get(key) ?? 0))
      .map(([key]) => key);
    expect(gone, 'these are fixed, lower the count or remove the line').toEqual([]);
  });
});

// What stops a baseline from becoming permanent, and what does not.
//
// It can only shrink. A line that stops reproducing turns the suite red until
// someone removes it, so the file tracks the real debt rather than an old
// snapshot of it, and the day the last line goes the file has to go too, which
// then makes `BASELINES.md` mandatory to delete as well.
//
// It cannot be created quietly. A baseline with no `BASELINES.md` entry naming
// an issue is red from the first run, so the debt is on the backlog by
// construction rather than by somebody remembering.
//
// What none of this does is make anyone pay it. Nothing here checks that the
// issue is still open, that it moves, or that the count goes down over time; a
// baseline that is honestly declared and never shrinks stays green forever. The
// mechanism makes the debt named and visible, not paid. Anything stronger, an
// expiry date or a ceiling that ratchets down, would be a policy nobody has
// asked for, and #99 is the record of what invented policies become here.
