export default {
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: ['default', 'html'],
    outputFile: {
      html: './test-results/html/index.html',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test-results/coverage',
      exclude: [
        'test-results/**',
        'coverage/**',
        '**/*.test.js',
        '**/*.spec.js',
        'rollup.config.js',
        'eslint.config.js',
        'vitest.config.js',
        'scripts/**',
        'tests/**',
      ],
    },
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
};
