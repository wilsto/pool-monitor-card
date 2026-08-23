import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The bench cannot be driven from a worktree, and until this file existed that fact was
// written nowhere in the repository: not in bench/CLAUDE.md, which never says the word
// worktree, not in docs/orchestration.md. It only lived in one session's private memory.
//
// Two lines of bench/docker-compose.yaml are the whole mechanism. The bind mount is
// relative, so it resolves against the directory docker compose was invoked from, and the
// container name is fixed, so a container already started from the main checkout keeps
// serving the main checkout's config. A sync run from a worktree writes into that worktree
// and changes nothing on screen.
//
// What makes it the most expensive trap of its perimeter is that it raises no error at all.
// The card renders, it is simply the previous build. The same class of trap cost this
// repository four flattened card repos dropped at the root of the main checkout, and it is
// written twice for the publish chain (scripts/flatten-to-dist.js:40 and
// publish-mirror.test.js:53) and was written zero times for the bench.
//
// This test does not start the bench. It asserts the two facts the warning rests on, so that
// the day someone makes the mount absolute or the container name per-worktree, the warning
// is revisited instead of being repeated out of habit.

const root = resolve(__dirname, '../../..');
const read = p => readFileSync(resolve(root, p), 'utf8').replace(/\r\n/g, '\n');

describe('the bench still has the shape that makes a worktree dangerous', () => {
  const compose = read('bench/docker-compose.yaml');

  it('mounts its config with a relative path', () => {
    expect(compose).toMatch(/^\s*-\s*\.\/config:\/config\s*$/m);
  });

  it('pins a single container name for the whole machine', () => {
    expect(compose).toMatch(/^\s*container_name:\s*homeassistant-dev\s*$/m);
  });
});

describe('and both instruction files say so', () => {
  // The root file is the one that survives a context compaction, the bench file is the one
  // read by whoever is already looking at the bench. The trap is cheap enough to write twice
  // and expensive enough to deserve it.
  it('the root file, which is reinjected after a compaction', () => {
    expect(read('CLAUDE.md')).toMatch(/worktree/i);
  });

  it('the bench file, which is where someone looks when the card is wrong', () => {
    expect(read('bench/CLAUDE.md')).toMatch(/worktree/i);
  });
});
