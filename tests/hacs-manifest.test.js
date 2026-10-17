import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

// `hacs.json` used to live only in each distribution repository, written by
// hand, outside every check this repository runs. HACS refuses the whole
// manifest on a single unknown key, so a typo there would take a card out of the
// store with nothing here turning red (#115). The publish now writes it like
// `package.json` and `validate.yaml`, and this file checks what it writes.
//
// It runs the real flatten into a temporary directory rather than reading the
// generator's source: what ships is what the script writes, not what a parse of
// it suggests.

const ROOT = resolve(__dirname, '../../..');
const SCRIPT = join(ROOT, 'scripts', 'flatten-to-dist.js');

// `HACS_MANIFEST_JSON_SCHEMA` (custom_components/hacs/utils/validate.py):
// `name` is required, these keys are the only ones allowed, and
// `extra=vol.PREVENT_EXTRA` refuses anything else.
const ALLOWED = [
  'content_in_root',
  'country',
  'filename',
  'hacs',
  'hide_default_branch',
  'homeassistant',
  'name',
  'persistent_directory',
  'render_readme',
  'zip_release',
];

// The manifests the four distribution repositories carried on 2026-10-17, read
// with `gh api repos/wilsto/<repo>/contents/hacs.json`. Generating the file must
// not change what HACS shows anybody, so the first generated version has to be
// these, byte for byte. Two store names have moved since, each on the PO's
// decision of 2026-10-17: the air card to "Air Monitor Card" and the sensor card
// to "Sensor Monitor Card", so the four cards read as one family.
const PUBLISHED = {
  'pool-monitor-card': {
    name: 'Pool Monitor Card',
    content_in_root: false,
    filename: 'pool-monitor-card.js',
    render_readme: true,
  },
  'sensor-monitor-card': {
    name: 'Sensor Monitor Card',
    content_in_root: false,
    filename: 'sensor-monitor-card.js',
    render_readme: true,
  },
  'aquarium-monitor-card': {
    name: 'Aquarium Monitor Card',
    content_in_root: false,
    filename: 'aquarium-monitor-card.js',
    render_readme: true,
  },
  'air-quality-card': {
    name: 'Air Monitor Card',
    content_in_root: false,
    filename: 'air-quality-card.js',
    render_readme: true,
  },
};

let target;

beforeAll(() => {
  target = mkdtempSync(join(tmpdir(), 'hacs-manifest-'));
  const run = spawnSync(process.execPath, [SCRIPT, '--target', target], {
    cwd: ROOT,
    encoding: 'utf-8',
  });
  expect(run.status, run.stdout + run.stderr).toBe(0);
}, 60_000);

afterAll(() => {
  if (target) rmSync(target, { recursive: true, force: true });
});

describe.each(Object.keys(PUBLISHED))('%s hacs.json', repo => {
  const read = () => readFileSync(join(target, repo, 'hacs.json'), 'utf-8');

  it('is written by the publish', () => {
    expect(existsSync(join(target, repo, 'hacs.json'))).toBe(true);
  });

  it('passes the HACS manifest schema', () => {
    const manifest = JSON.parse(read());
    expect(typeof manifest.name).toBe('string');
    expect(manifest.name.length).toBeGreaterThan(0);
    expect(Object.keys(manifest).filter(k => !ALLOWED.includes(k))).toEqual([]);
  });

  it('names the bundle the publish ships', () => {
    const { filename } = JSON.parse(read());
    expect(existsSync(join(ROOT, 'scripts', 'dist-readmes', repo))).toBe(true);
    expect(filename).toBe(`${repo}.js`);
  });

  it('is byte for byte the manifest the repository already carried', () => {
    expect(read()).toBe(`${JSON.stringify(PUBLISHED[repo], null, 2)}\n`);
  });
});

// The store name is what a visitor types into the HACS search, so the install
// step of each page must tell them that same name, or they find another card.
// The air card left "Air Quality Card" for "Air Monitor Card" because three other
// cards in HACS share the old name, and the sensor card's store name
// "SensorMonitorCard" did not match the "Sensor Monitor Card" its page named.
describe.each(Object.keys(PUBLISHED))('%s README install step', repo => {
  it('searches HACS for the name hacs.json declares', () => {
    const readme = readFileSync(join(ROOT, 'scripts', 'dist-readmes', repo, 'README.md'), 'utf-8');
    expect(readme).toContain(`search for **${PUBLISHED[repo].name}**`);
  });
});
