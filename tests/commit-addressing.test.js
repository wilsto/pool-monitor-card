import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  addressing,
  namesInProse,
  splitTrailers,
  readCommits,
  isShallow,
  complaint,
  rangeComplaint,
  unaddressedOver,
  NAME_TRAILER,
  ADDRESS_TRAILER,
} from '../../../scripts/commit-addressing.js';

// Thirteen people are waiting for a word, two of them for over a year on work that
// shipped (#136). The cause is not forgetfulness. Measured across those thirteen
// cases: the person's name reached a commit message seven times, the address of the
// thread they wrote in four times, both together three times. Commit 9173eca, the
// release commit of 2026-08-15, names @coraxt and @apsmith12 in its body on the very
// day their request shipped; their two addresses exist nowhere in this repository.
// A name is not an address.
//
// So this file refuses a commit that names someone from outside without saying where
// to answer them. It is the only guard in this repository that can say no: `npm test`
// runs inside publish.yml before the step that pushes to the distribution
// repositories, with no `continue-on-error` anywhere, so a red test cancels the
// publication. Branch protection is unavailable on a private repository without a
// subscription (403, checked 2026-08-23), so nothing here can stop a merge.
//
// Three things it deliberately does not do:
//
//   It does not require having answered. The answer cites the version, which does not
//   exist yet when the commit is written; a guard on "did you answer" would be a
//   deadlock, not a gate. It requires only that the person be reachable.
//
//   It does not accept `Closes:`. GitHub's closing keywords include close/closes/fix/
//   fixes/resolve/resolves, and a commit here carrying one against a public issue URL
//   closes that public issue. Closing a public thread is a PO decision. `Link:` has no
//   such meaning, and the kernel uses it for exactly this case.
//
//   It does not judge history. The rule starts at ANCHOR below, the tip of `main` on
//   the evening it was written. Twenty-four commits before that point name someone
//   without a trailer, and a rule applied backwards would block every publication for
//   ever. `node scripts/commit-addressing.js --audit` lists them.
//
//   It does not demand the trailer inside the offending commit. The debt is owed by
//   the range: a later commit carrying the pair settles it. The first run of this
//   guard in CI is what forced that correction, on a real case (b33cd6e, already on
//   main, naming @rpirsc13 in prose). A commit on main cannot be amended, so the
//   stricter reading would have been a trap rather than a gate, and the looser one
//   serves the person waiting just as well: `git log --grep` finds them either way.
//
// The false positive rate was measured before this file was written, over the 162
// non-merge commits of the whole history (276 with merges). Twenty-four commits are
// flagged, carrying 22 distinct handles, and all 22 are real people. Nothing that is
// not a person was flagged: `noreply@anthropic.com`, `pool-monitor@2.11.0`,
// `@rollup/plugin-terser`, `@typescript-eslint/no-unused-vars`, `@customElement`,
// `@property`, `@state` and the literal `@handle` used when writing about this
// convention are all excluded, by shape rather than by a list where it can be.

const root = resolve(__dirname, '../../..');

// The tip of `main` when this guard landed: merge of #142, 2026-08-23. An anchor
// commit rather than a date, because a date is read in whichever timezone the runner
// happens to have and a rebase can move it, while an ancestor either is reachable or
// is not.
const ANCHOR = '195bbb3f319007ca7b12ef641191756977ecee37';

/** @returns {boolean} Whether the anchor exists in this checkout. */
function anchorIsHere() {
  try {
    execFileSync('git', ['cat-file', '-e', `${ANCHOR}^{commit}`], { cwd: root, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

describe('the reader tells a person from a token that looks like one', () => {
  it('finds a handle written in prose', () => {
    expect(namesInProse('fix: a thing\n\nAsked by @coraxt on the forum.')).toEqual(['coraxt']);
  });

  it('ignores an e-mail address', () => {
    expect(namesInProse('fix: a thing\n\nSent from noreply@anthropic.com today.')).toEqual([]);
  });

  it('ignores a package tag written name@version', () => {
    expect(namesInProse('chore: publish pool-monitor@2.11.0 and air-quality@0.8.1')).toEqual([]);
  });

  it('ignores a scoped npm package', () => {
    expect(namesInProse('chore: bump @rollup/plugin-terser and @typescript-eslint/parser')).toEqual(
      [],
    );
  });

  it('ignores the Lit decorators and the CSS at-rules', () => {
    expect(namesInProse('refactor: @customElement, @property and @state replace statics')).toEqual(
      [],
    );
    expect(namesInProse('fix: the @media query and the @keyframes block')).toEqual([]);
  });

  it('ignores what is quoted as code', () => {
    expect(namesInProse('docs: `@coraxt` is the example handle in the snippet')).toEqual([]);
    expect(namesInProse('docs: see\n\n```\nReported-by: @coraxt\n```\n')).toEqual([]);
  });

  it('finds several people at once, deduplicated and sorted', () => {
    const message = 'feat: a thing\n\nAsked by @Coraxt, then @apsmith12, then @coraxt again.';
    expect(namesInProse(message)).toEqual(['apsmith12', 'coraxt']);
  });

  it('reads a trailer by its key, not by its position', () => {
    const { trailers } = splitTrailers(
      'feat: a thing\n\nA sentence: with a colon in it.\n\nReported-by: @coraxt\nLink: https://example.org/1\n\nRefs #136\n',
    );
    expect(trailers.map(t => t.key)).toEqual([NAME_TRAILER, ADDRESS_TRAILER]);
  });

  // `Refs #136` closes this repository's bodies and carries no colon. Reading
  // trailers from the last paragraph, as git does, pushed the two lines above it back
  // into prose, and the name then read as an unaddressed mention of the very person
  // it was addressing. Found by the guard refusing its own addendum commit.
  it('is not fooled by a body that ends on Refs', () => {
    const message = `docs: an address\n\n${NAME_TRAILER}: @rpirsc13\n${ADDRESS_TRAILER}: https://github.com/wilsto/air-quality-card/pull/4\n\nRefs #136\n`;
    expect(namesInProse(message)).toEqual([]);
    expect(addressing(message).reported).toEqual(['rpirsc13']);
    expect(addressing(message).addresses).toHaveLength(1);
  });

  it('does not let a fenced example address anyone', () => {
    const message = `docs: the shape\n\n\`\`\`\n${NAME_TRAILER}: @coraxt\n${ADDRESS_TRAILER}: https://example.org/1\n\`\`\`\n`;
    expect(addressing(message).reported).toEqual([]);
    expect(namesInProse(message)).toEqual([]);
  });
});

describe('naming someone without an address is refused', () => {
  const named = 'feat: a thing\n\nExactly what @coraxt asked for.';

  it('refuses a name with no trailer at all', () => {
    expect(addressing(named).missing).toEqual(['coraxt']);
  });

  it('accepts the name once it carries a public address', () => {
    const message = `${named}\n\n${NAME_TRAILER}: @coraxt\n${ADDRESS_TRAILER}: https://community.home-assistant.io/t/572179/60\n`;
    const a = addressing(message);
    expect(a.missing).toEqual([]);
    expect(a.addressless).toBe(false);
  });

  it('refuses a name whose trailer carries no address', () => {
    const a = addressing(`${named}\n\n${NAME_TRAILER}: @coraxt\n`);
    expect(a.missing).toEqual([]);
    expect(a.addressless).toBe(true);
  });

  it('refuses an address pointing back at this private repository', () => {
    const message = `${named}\n\n${NAME_TRAILER}: @coraxt\n${ADDRESS_TRAILER}: https://github.com/wilsto/monitor-cards/issues/136\n`;
    expect(addressing(message).addressless).toBe(true);
  });

  it('accepts a forum thread, not only GitHub', () => {
    const message = `feat: a thing\n\nAsked by @Thomas22.\n\n${NAME_TRAILER}: @Thomas22\n${ADDRESS_TRAILER}: https://forum.hacf.fr/t/23899/80\n`;
    expect(addressing(message).addressless).toBe(false);
    expect(addressing(message).missing).toEqual([]);
  });

  it('does not accept Closes:, which would close the public thread', () => {
    const message = `${named}\n\n${NAME_TRAILER}: @coraxt\nCloses: https://github.com/wilsto/pool-monitor-card/issues/1\n`;
    expect(addressing(message).addressless).toBe(true);
  });

  it('says what to write when it refuses', () => {
    const text = complaint({ hash: 'deadbeefcafe', subject: 'feat: a thing', message: named });
    expect(text).toContain('@coraxt');
    expect(text).toContain(`${NAME_TRAILER}: @coraxt`);
    expect(text).toContain(`${ADDRESS_TRAILER}: https://`);
  });

  it('lets a commit that names nobody through', () => {
    const a = addressing('fix(core): the band boundary rounds the way the scale reads');
    expect(a.missing).toEqual([]);
    expect(a.addressless).toBe(false);
  });
});

describe('every commit since the guard landed carries the address it owes', () => {
  // A shallow checkout holds one commit, so `git log` would find nothing to complain
  // about and this file would pass while measuring nothing. That is the green test
  // that measures nothing, which has already happened here once
  // (quality-baseline.test.js, split on the wrong newline under Windows). It is worth
  // an error, not a shrug: both workflows set `fetch-depth: 0` for this reason.
  it('can see the history it claims to check', () => {
    expect(
      isShallow(root),
      'Shallow checkout: this guard would pass without reading anything. ' +
        'Run `git fetch --unshallow`, or set `fetch-depth: 0` on actions/checkout.',
    ).toBe(false);
    expect(
      anchorIsHere(),
      `Commit ${ANCHOR.slice(0, 8)} is missing from this checkout, so the range this ` +
        'guard reads is empty. Fetch the full history.',
    ).toBe(true);
  });

  it('names nobody it cannot answer', () => {
    expect(rangeComplaint(readCommits([`${ANCHOR}..HEAD`], root))).toBe('');
  });
});

describe('the debt is owed by the range, not by each commit', () => {
  // A correction the first CI run forced, on a real case: b33cd6e was already on main,
  // it names @rpirsc13 without a trailer, and a commit on main cannot be amended. A
  // guard demanding the trailer inside the offending commit would have refused every
  // publication for ever. That is a trap, not a gate. The address written in a later
  // commit serves the person just as well, because what matters is that
  // `git log --grep` finds them.
  const names = { hash: 'aaaaaaaa1', subject: 'feat: a thing', message: 'feat: a thing\n\n@coraxt asked.' };
  const addends = {
    hash: 'bbbbbbbb2',
    subject: 'docs: the address',
    message: `docs: the address\n\n${NAME_TRAILER}: @coraxt\n${ADDRESS_TRAILER}: https://community.home-assistant.io/t/572179/60\n`,
  };

  it('refuses a range where nobody wrote the address', () => {
    expect(rangeComplaint([names])).toContain('@coraxt');
    expect(rangeComplaint([names])).toContain('cannot be amended');
  });

  it('accepts the range once a later commit carries it', () => {
    expect(rangeComplaint([names, addends])).toBe('');
    expect(unaddressedOver([names, addends])).toEqual([]);
  });

  it('still refuses when the later commit names without addressing', () => {
    const nameOnly = { ...addends, message: `docs: the address\n\n${NAME_TRAILER}: @coraxt\n` };
    expect(unaddressedOver([names, nameOnly]).map(d => d.handle)).toEqual(['coraxt']);
  });

  it('says which commits named the person it cannot answer', () => {
    expect(rangeComplaint([names])).toContain('aaaaaaaa');
    expect(rangeComplaint([names])).toContain('feat: a thing');
  });

  it('owes nothing on a range that names nobody', () => {
    expect(rangeComplaint([{ hash: 'c', subject: 'fix: a band', message: 'fix: a band' }])).toBe('');
  });
});
