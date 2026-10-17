import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, existsSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import yaml from 'js-yaml';

// Three of the four public repositories had no issue template, and the fourth
// carried one copied from Garbage Collection Card, asking for "Garbage
// Collection Card version". So every report started without the card version,
// the Home Assistant version or the YAML, and the first reply was a question
// back. Most reports were also questions the README answers (#77).
//
// The publish now writes GitHub issue forms into each repository: a bug form
// whose required fields are what the first reply always asked for, a feature
// form, and a chooser that sends a question to the README's Troubleshooting
// section before a blank issue can be opened. `.github/ISSUE_TEMPLATE/` is
// owned by the publish, so the stale Markdown templates go with the next one.
//
// It runs the real flatten into a temporary directory, as hacs-manifest does.

const ROOT = resolve(__dirname, '../../..');
const SCRIPT = join(ROOT, 'scripts', 'flatten-to-dist.js');
const REPOS = [
  'pool-monitor-card',
  'sensor-monitor-card',
  'aquarium-monitor-card',
  'air-quality-card',
];

let target;

beforeAll(() => {
  target = mkdtempSync(join(tmpdir(), 'issue-forms-'));
  const stale = join(target, 'pool-monitor-card', '.github', 'ISSUE_TEMPLATE');
  mkdirSync(stale, { recursive: true });
  writeFileSync(join(stale, 'bug_report.md'), '- Garbage Collection Card version: [e.g. 1.15.1]\n');
  const run = spawnSync(process.execPath, [SCRIPT, '--target', target], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  expect(run.status, run.stdout + run.stderr).toBe(0);
}, 60_000);

afterAll(() => {
  if (target) rmSync(target, { recursive: true, force: true });
});

const form = (repo, file) =>
  yaml.load(readFileSync(join(target, repo, '.github', 'ISSUE_TEMPLATE', file), 'utf-8'));

const requiredIds = f => f.body.filter(b => b.validations?.required).map(b => b.id);

describe.each(REPOS)('%s issue forms', repo => {
  it('sends questions to the Troubleshooting section before a blank issue', () => {
    const config = form(repo, 'config.yml');
    expect(config.blank_issues_enabled).toBe(false);
    expect(config.contact_links.map(l => l.url)).toContain(
      `https://github.com/wilsto/${repo}#troubleshooting`,
    );
  });

  it('asks a bug report for what the first reply always asked', () => {
    const bug = form(repo, 'bug.yml');
    expect(bug.name).toBeTruthy();
    expect(bug.description).toBeTruthy();
    expect(requiredIds(bug)).toEqual(
      expect.arrayContaining(['card_version', 'ha_version', 'config', 'what_happened']),
    );
  });

  it('has a feature form', () => {
    const feature = form(repo, 'feature.yml');
    expect(feature.name).toBeTruthy();
    expect(requiredIds(feature)).toContain('need');
  });

  it('names this card, never another', () => {
    const text = ['bug.yml', 'feature.yml', 'config.yml']
      .map(f => readFileSync(join(target, repo, '.github', 'ISSUE_TEMPLATE', f), 'utf-8'))
      .join('\n');
    expect(text).not.toMatch(/Garbage Collection/);
  });
});

describe('the publish owns .github/ISSUE_TEMPLATE', () => {
  it('removes a template it did not write', () => {
    expect(
      existsSync(join(target, 'pool-monitor-card', '.github', 'ISSUE_TEMPLATE', 'bug_report.md')),
    ).toBe(false);
  });
});
