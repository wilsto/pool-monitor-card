import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The README documented ten of the twenty-three options a sensor accepts, and
// none of the ones shipped this week. Users were asking in issues for things
// that already existed.
//
// This is the sixth hand-maintained list in this repository, after the language
// menu, the CSS classes, SUPPORTED_LANGUAGES, the editor colours and the preset
// count. Every one of them ended up lying, so this one gets a test rather than
// good intentions.

const root = resolve(__dirname, '../../..');
// Line endings are normalised because git checks these files out with CRLF on
// Windows. Slicing a table on a bare blank line then matched nothing, the slice
// ran to the end of the file and swallowed the next table. It passed in CI,
// which checks out LF, and failed only on a Windows working copy.
const read = p => readFileSync(resolve(root, p), 'utf8').replace(/\r\n/g, '\n');

const types = read('packages/core/src/ha/types.ts');
const readme = read('scripts/dist-readmes/pool-monitor-card/README.md');

const keysOf = name => {
  const start = types.indexOf(`interface ${name}`);
  const block = types.slice(start, types.indexOf('\n}', start));
  return [...block.matchAll(/^ {2}(\w+)\??:/gm)].map(m => m[1]);
};

// Set by the card itself, never written by a user.
const INTERNAL = ['title', 'override_value', 'override', 'invalid', 'nameDefinedByUser'];

describe('every option a user can write is documented', () => {
  it('for a sensor', () => {
    const undocumented = keysOf('SensorUserConfig')
      .filter(k => !INTERNAL.includes(k))
      .filter(k => !readme.includes(`\`${k}\``));
    expect(undocumented).toEqual([]);
  });

  it('for the card', () => {
    // `sensors`, `display` and `colors` are documented as groups, not as keys
    const undocumented = keysOf('CardConfig')
      .filter(k => !['display', 'colors'].includes(k))
      .filter(k => !readme.includes(`\`${k}\``));
    expect(undocumented).toEqual([]);
  });

  it('and the sensor table covers them all, not just the prose', () => {
    const table = readme.slice(readme.indexOf('| Option | Type | Description |'));
    const documented = keysOf('SensorUserConfig').filter(k => !INTERNAL.includes(k));
    const missing = documented.filter(k => !table.includes(`\`${k}\``));
    expect(missing).toEqual([]);
  });
});

describe('the documentation says what the card actually reads', () => {
  it('puts the language under display, where the config has it', () => {
    expect(readme).toContain('`display.language`');
    expect(readme).not.toMatch(/^\| `language` \|/m);
  });

  // `status_entity` and `battery_entity` legitimately appear in both tables:
  // they exist at both levels and mean different things. So duplicates are
  // checked inside each table, not across the file. `display.show_icons` was
  // listed twice in the card table.
  it('lists no option twice inside the same table', () => {
    const tableAt = header => {
      const start = readme.indexOf(header);
      const rest = readme.slice(start);
      const end = rest.indexOf('\n\n');
      return rest.slice(0, end === -1 ? undefined : end);
    };
    for (const header of [
      '| Option | Type | Default | Description |',
      '| Option | Type | Description |',
    ]) {
      const rows = [...tableAt(header).matchAll(/^\| (`[^`]+`) \|/gm)].map(m => m[1]);
      const seen = new Set();
      const twice = rows.filter(r => (seen.has(r) ? true : (seen.add(r), false)));
      expect(twice, header).toEqual([]);
    }
  });
});
