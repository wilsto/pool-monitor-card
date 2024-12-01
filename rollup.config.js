import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const BUILD_TIMESTAMP = new Date().toISOString().replace(/[:.T]/g, '-').substring(0, 16);

export default {
  input: 'src/pool_monitor_card.js',
  output: {
    file: 'dist/pool-monitor-card.js',
    format: 'iife',
    sourcemap: true,
    name: 'PoolMonitorCard',
  },
  plugins: [
    replace({
      __BUILD_TIMESTAMP__: JSON.stringify(BUILD_TIMESTAMP),
      preventAssignment: true,
    }),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Safari versions',
                'last 2 iOS versions',
                'last 1 Android version',
                'last 1 ChromeAndroid version',
              ],
            },
            modules: false,
          },
        ],
      ],
      exclude: 'node_modules/**',
    }),
    terser({
      format: {
        comments: false,
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
        properties: false,
      },
      compress: {
        defaults: false,
        drop_console: false,
      },
    }),
  ],
};
