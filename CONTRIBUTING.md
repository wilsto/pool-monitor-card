# Contributing to pool-monitor-card

Thank you for wanting to help. Please read the first section before opening a
pull request — it will save you a lot of work.

## This repository is generated

Everything here except this file and `LICENSE` is produced automatically from a
private monorepo where the four monitor cards share a common core. **Any commit
made here is overwritten on the next release.**

That is our doing, not yours, and it was written down nowhere until now. At
least one contributor wrote a substantial feature against a repository that
could never merge it.

Overwritten on every release: `src/`, `tests/`, `dist/`, `package.json`,
`rollup.config.js`, `vitest.config.js`, `.github/workflows/`, `README.md`,
`docs/`, `resources/`.

## How to contribute anyway

**A pull request opened here is still read.** It cannot be merged, but it can be
ported into the core by hand, and you are credited by name in the README
acknowledgments. That is how several features and translations arrived. Say in
the description what problem you are solving — the intent matters more than the
diff, since the diff has to be re-applied elsewhere.

**Reporting a bug or asking for a feature**: open an issue here. That is the
right place and always has been.

### Translations

The most common contribution, and the simplest. A translation is one file that
declares its own language name and the card's strings:

```ts
export default {
  language: 'Français', // your language, as its speakers write it
  state: {
    /* ... */
  },
  sensor: {
    /* ... */
  },
  time: {
    /* ... */
  },
  time_plural: {
    /* ... */
  },
};
```

Copy `src/locales/en.ts`, translate the values, keep every key and every
`{placeholder}`. The menu entry appears on its own — the language list is
derived from the files, so there is no second place to edit.

Open a pull request with just that file. It ports in minutes.

## What we will not ask of you

No CLA, no commit convention, no squash ritual. Your name in the
acknowledgments is the deal.
