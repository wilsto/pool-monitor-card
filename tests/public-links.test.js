import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

// A reader who follows a link from a published card lands wherever we sent
// them. `wilsto/monitor-cards` is private, so that destination is a 404 for
// everyone except the owner, and nothing on our side reports it: the release
// is created successfully, HACS downloads the asset, and only a human clicking
// the link finds out.
//
// That is exactly how it went unnoticed. Every release note between
// 2026-08-16 and 2026-08-24 carried `Released from [monitor-cards](…private…)`
// as its entire content, because the hand-kept changelog had fallen five
// versions behind and the fallback branch ran every time. It was reported by
// arketec, a fork author, not by any check we own:
//
//   > FYI, your repo results in a 404 page when I try and open it
//   > (does not affect HACS download tho)
//
// So this file draws one line: nothing that reaches a public repository may
// point at a private one. It cannot check that a link resolves, only that we
// are not knowingly shipping the one we already know is closed.
const root = resolve(import.meta.dirname, '../../..');

const PRIVATE_REPO = 'github.com/wilsto/monitor-cards';

/** Every file under a directory, recursively, as absolute paths. */
const walk = dir => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
};

describe('nothing published points at the private monorepo', () => {
  it('no page copied into a distribution repository links to it', () => {
    const pages = walk(resolve(root, 'scripts/dist-readmes'));
    const offenders = pages.filter(f => readFileSync(f, 'utf8').includes(PRIVATE_REPO));
    expect(
      offenders.map(f => f.slice(root.length + 1)),
      'these pages are copied into public repositories and would 404',
    ).toEqual([]);
  });

  it('the publish workflow does not write it into a release note', () => {
    const workflow = readFileSync(resolve(root, '.github/workflows/publish.yml'), 'utf8');
    expect(
      workflow.includes(PRIVATE_REPO),
      'a release note built from this workflow would carry a link nobody can open',
    ).toBe(false);
  });

  it('the release note falls back to something, never to nothing', () => {
    // The dead link was at least visible. An empty note would be worse: the
    // release would look like it shipped no changes at all. Whatever replaces
    // the changelog has to produce a heading, so a reader can tell the note is
    // the note and not a rendering accident.
    const workflow = readFileSync(resolve(root, '.github/workflows/publish.yml'), 'utf8');
    const fallback = workflow.slice(workflow.indexOf('if [ ! -s release-notes.md ]'));
    expect(fallback).toContain('## What changed');
  });
});
