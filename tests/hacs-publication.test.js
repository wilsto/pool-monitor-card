import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { CARDS } from '../../../scripts/generate-readmes.js';

// HACS decides whether a card is in the store, and it decides after the publish:
// `hacs/action` runs in the four distribution repositories and asks the GitHub
// API about a repository that is already online. Nothing here sees that verdict
// before it lands.
//
// Two of its checks do not depend on GitHub metadata at all. They depend on
// bytes this repository produces, so they can be checked here, before the tag.
// Both rules below are transcribed from the HACS source read on 2026-08-23:
//
//   custom_components/hacs/validate/images.py
//   custom_components/hacs/repositories/plugin.py   (update_filenames)
//
// What is deliberately NOT checked here, and why, is at the bottom of this file.

const ROOT = resolve(__dirname, '../../..');

/**
 * The four names HACS accepts when `hacs.json` does not declare `filename`,
 * derived from the repository name, tried in this order.
 *
 * Transcribed from `HacsPluginRepository.update_filenames`. `replaceAll`
 * rather than `replace` because Python's `str.replace` has no first-only mode
 * and the two would differ on a repository named `lovelace-lovelace-x`.
 */
function hacsFallbackNames(repositoryName) {
  return [
    `${repositoryName.replaceAll('lovelace-', '')}.js`,
    `${repositoryName}.js`,
    `${repositoryName}.umd.js`,
    `${repositoryName}-bundle.js`,
  ];
}

/**
 * The bundle name each card publishes, read from the publish script's own card
 * table. The table is not exported, so this reads the source: importing the
 * module for one constant would be worse, `flatten-to-dist.js` is destructive
 * and `publish-mirror.test.js` carries the story of what importing it once did.
 *
 * A parse that silently matched nothing would make every assertion below vacuous,
 * so the caller checks the count against the card list.
 */
function entryNamesFromFlatten() {
  const source = readFileSync(join(ROOT, 'scripts', 'flatten-to-dist.js'), 'utf-8');
  const table = source.slice(source.indexOf('const CARDS = {'));
  const entries = {};
  for (const [, key, body] of table.matchAll(/'([a-z-]+)':\s*\{([^}]*)\}/g)) {
    const entry = body.match(/entry:\s*'([^']+)'/);
    if (entry) entries[key] = entry[1];
  }
  return entries;
}

/**
 * The bundle name the release job uploads, per package, read from the workflow's
 * `case` block. This is the second of the two places #115 found that must agree
 * and that nothing compared.
 */
function entryNamesFromPublishWorkflow() {
  const source = readFileSync(join(ROOT, '.github', 'workflows', 'publish.yml'), 'utf-8');
  const entries = {};
  let current = null;
  for (const line of source.split('\n')) {
    const opens = line.match(/^\s{10,}([a-z-]+)\)\s*$/);
    if (opens) current = opens[1];
    const filename = line.match(/filename=([^"\s]+)/);
    if (filename && current) entries[current] = filename[1];
    if (line.trim() === ';;') current = null;
  }
  return entries;
}

describe('the bundle name resolves the way HACS resolves it', () => {
  const fromFlatten = entryNamesFromFlatten();
  const fromWorkflow = entryNamesFromPublishWorkflow();

  it('reads a name for every card out of both places', () => {
    const packages = CARDS.map(c => c.package).sort();
    expect(Object.keys(fromFlatten).sort(), 'scripts/flatten-to-dist.js').toEqual(packages);
    expect(Object.keys(fromWorkflow).sort(), '.github/workflows/publish.yml').toEqual(packages);
  });

  for (const card of CARDS) {
    const repositoryName = card.repo.split('/')[1];

    // The name lives in three places that must agree: `entry` here, `filename=`
    // in the release job, and `filename` in the distribution repository's own
    // `hacs.json`. Only the first two are reachable from this repository.
    it(`${card.package}: the publish job uploads the bundle the flatten produces`, () => {
      expect(fromWorkflow[card.package]).toBe(fromFlatten[card.package]);
    });

    // The third place is out of reach, so this is what stands in for it: as long
    // as the name is one HACS would have found on its own, losing or mistyping
    // `filename` in the public `hacs.json` costs nothing. A name outside this
    // list makes the card depend on a key no test here can see.
    it(`${card.package}: the bundle name is one HACS finds without hacs.json`, () => {
      expect(hacsFallbackNames(repositoryName)).toContain(fromFlatten[card.package]);
    });

    // HACS looks for the name among the release assets first, then at the
    // repository root, then under `dist/`. The publish uploads
    // `packages/<pkg>/dist/<filename>`, so what rollup was told to write has to
    // be that same name. `dist/` is gitignored, so the build output cannot be
    // the witness here; the config that produces it is, and it is versioned.
    it(`${card.package}: rollup writes the bundle under that name`, () => {
      const config = readFileSync(
        join(ROOT, 'packages', card.package, 'rollup.config.js'),
        'utf-8',
      );
      expect(config).toContain(`file: 'dist/${fromFlatten[card.package]}'`);
    });
  }
});

// `images.py`, category `plugin`: the README must hold at least one line with
// `<img` or `![` that is not a badge. The three ignored fragments are the ones
// HACS ignores, verbatim. Failure message: "The repository does not have images
// in the Readme file", and the card leaves the store.
//
// These pages are generated by `scripts/generate-readmes.js`, so a change to the
// generator is what would take the images away, and nothing would say so.
const HACS_IGNORED = ['-shield', 'img.shields.io', 'buymeacoffee.com'];

function hacsImageLines(readme) {
  return readme
    .split('\n')
    .filter(line => line.includes('<img') || line.includes('!['))
    .filter(line => !HACS_IGNORED.some(ignored => line.includes(ignored)));
}

/** Image targets on a line, markdown and html, whatever their host. */
function imageTargets(line) {
  return [
    ...[...line.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(m => m[1]),
    ...[...line.matchAll(/<img[^>]*\bsrc=["']([^"']+)["']/g)].map(m => m[1]),
  ];
}

describe('every generated home page keeps a real image', () => {
  for (const card of CARDS) {
    const dir = join(ROOT, 'scripts', 'dist-readmes', card.repo.split('/')[1]);
    const readme = join(dir, 'README.md');

    it(`${card.package}: passes the HACS images check`, () => {
      expect(existsSync(readme), readme).toBe(true);
      expect(hacsImageLines(readFileSync(readme, 'utf-8'))).not.toEqual([]);
    });

    // Stricter than HACS on purpose. `my.home-assistant.io/badges/…` is a badge
    // that HACS counts as an image, so the check above can pass on a page that
    // shows nothing. What the rule is for is a page that shows the card, and a
    // shipped image can also be checked for existing, which HACS never does.
    it(`${card.package}: ships an image the page points at`, () => {
      const shipped = hacsImageLines(readFileSync(readme, 'utf-8'))
        .flatMap(imageTargets)
        .filter(target => !/^(?:[a-z]+:)?\/\//i.test(target) && !target.startsWith('/'));
      expect(shipped, 'no repository-relative image on the page').not.toEqual([]);
      for (const target of shipped) {
        const file = join(dir, decodeURIComponent(target));
        expect(existsSync(file), file).toBe(true);
      }
    });
  }
});

// The third HACS check that depends on our content, the `hacs.json` schema, is
// NOT here, and the reason is the point rather than an omission.
//
// `HACS_MANIFEST_JSON_SCHEMA` (custom_components/hacs/utils/validate.py) requires
// `name` and allows exactly `content_in_root`, `country`, `filename`, `hacs`,
// `hide_default_branch`, `homeassistant`, `persistent_directory`, `render_readme`
// and `zip_release`, with `extra=vol.PREVENT_EXTRA`: one unknown key, `fileName`
// for a typo, and the whole manifest is refused.
//
// That file does not exist in this repository. It belongs to each distribution
// repository, `flatten-to-dist.js` never writes it and deliberately never clears
// it, and the publish would overwrite it if it did. A copy checked in here would
// validate something other than what ships, which is worse than no check.
//
// Making it checkable is a change of ownership, not a change of test: the
// publish already generates `package.json`, `rollup.config.js` and
// `validate.yaml`, and generating `hacs.json` too would put the manifest under
// the same guard as the rest. That is a decision for the PO, and it is open.
