import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { styles } from '../src/styles/styles.js';

// The README now tells users which classes they can target with card-mod.
// A documented class that no longer exists is worse than no documentation:
// the user writes the rule, nothing happens, and nothing says why. Three
// hand-maintained lists drifted this way already (languages, twice, and the
// sensor options table).
const root = resolve(__dirname, '../../..');

const documentedClasses = () => {
  const readme = readFileSync(
    resolve(root, 'scripts/dist-readmes/pool-monitor-card/README.md'),
    'utf8',
  );
  const styling = readme.slice(readme.indexOf('### Styling'));
  const table = styling.slice(styling.indexOf('| Class |'), styling.indexOf('> Marker positions'));
  return [...table.matchAll(/`\.([a-z-]+)`/g)].map(m => m[1]);
};

describe('every class the README offers actually exists', () => {
  it('documents at least the main ones', () => {
    expect(documentedClasses().length).toBeGreaterThan(5);
  });

  it('none is missing from the stylesheet', () => {
    const css = styles.cssText;
    // Whole-token match: `.entity-icon` must not be satisfied by
    // `.entity-icon-renamed`, which merely contains it as a substring.
    const present = c => new RegExp('\.' + c + '(?![\w-])').test(css);
    const absentes = documentedClasses().filter(c => !present(c));
    expect(absentes).toEqual([]);
  });
});
