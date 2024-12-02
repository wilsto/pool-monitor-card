import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['dist/**/*', 'test-results/**/*', 'node_modules/**/*', 'tests/**/*', 'scripts/**/*'],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js'], // Only lint source files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        customElements: 'readonly',
        HTMLElement: 'readonly',
        ResizeObserver: 'readonly',
        IntersectionObserver: 'readonly',
        WebKitCSSMatrix: 'readonly',
        DOMMatrix: 'readonly',
        SVGElement: 'readonly',
        LitElement: 'readonly',
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Import rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',

      // Warning level rules
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
      'no-useless-escape': 'warn',
      'no-prototype-builtins': 'warn',
      'no-func-assign': 'warn',
      'getter-return': 'warn',
      'no-fallthrough': 'warn',
      'no-misleading-character-class': 'warn',
      'no-redeclare': 'warn',

      // Disabled rules
      'no-console': 'off',
      'no-control-regex': 'off',
      quotes: 'off',
      semi: 'off',
      indent: 'off',
      'comma-dangle': 'off',

      // Special cases
      'no-cond-assign': ['error', 'except-parens'], // Allow assignments in conditions if parenthesized
      'no-undef': 'error', // Keep strict undefined variable checking
    },
  },
  prettier,
];
