import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { emptyDirSync, copySync, writeJSONSync } from 'fs-extra';

import pkg from './package.json';

const isProd = !process.env.ROLLUP_WATCH;
const isDev = !isProd;

emptyDirSync('./build');
copySync('./static', './build');
writeJSONSync('./build/manifest.json', {
  manifest_version: 3,
  name: pkg.title,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  homepage_url: pkg.repository,
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
  },
  permissions: [
    'tabs',
  ],
  host_permissions: [
    'https://*.wix.com/*',
    'https://wix.wixanswers.com/*',
  ],
  action: {
    default_popup: 'popup.html',
    default_icon: 'icons/16.png',
  },
  content_scripts: [
    {
      matches: [
        'https://*.wix.com/*',
        'https://wix.wixanswers.com/*',
      ],
      js: [
        'content.js',
      ],
    },
  ],
  // web_accessible_resources: []
});

const extensions = [
  '.js',
  '.ts',
];

const babelConfig = {
  presets: [
    '@babel/typescript',
  ],
  plugins: [
    [
      'const-enum',
      {
        transform: 'constObject',
      },
    ],
  ],
};

const bablePlugin = babel({
  babelHelpers: 'bundled',
  extensions,
  ...babelConfig,
});

export default [
  {
    input: './src/popup/main.ts',
    output: {
      file: './build/popup.js',
      format: 'es',
    },
    plugins: [
      nodeResolve({
        extensions,
        browser: true,
        dedupe: [
          'svelte',
        ],
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development',
        ),
      }),
      svelte({
        compilerOptions: {
          dev: isDev,
        },
        preprocess: sveltePreprocess({
          sourceMap: isDev,
          babel: babelConfig,
        }),
      }),
      css({
        output: 'popup.css',
      }),
      bablePlugin,
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: './src/content/index.ts',
    output: {
      file: './build/content.js',
      format: 'es',
    },
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      bablePlugin,
    ],
    watch: {
      clearScreen: false,
    },
  },
];
