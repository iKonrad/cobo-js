const baseRules = require('eslint-config-airbnb-base/rules/style');
const [_, ...restricted] = baseRules.rules['no-restricted-syntax'];

const PATHS = require('./webpack/common/paths');

module.exports = {
  extends: 'airbnb',
  parser: 'eslint-plugin-typescript/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    jsx: true,
  },
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: [
    'babel',
    'import',
    'typescript',
    'jsx-a11y',
    'compat',
    'jest',
  ],
  rules: {
    // General
    'arrow-parens': ['error', 'as-needed'],
    'function-paren-newline': ["error", "consistent"],
    'object-curly-newline': ["error", { consistent: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'linebreak-style': 0,
    'global-require': 0,
    'no-restricted-syntax': [2,
      ...restricted.filter(
        r => !['ForOfStatement'].includes(r.selector)
      ),
    ],

    // React
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/forbid-prop-types': [1, { forbid: ['any']} ],
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/no-multi-comp': 0,
    'react/jsx-closing-bracket-location': [1, 'after-props'],
    'react/prop-types': 0,

    // Typescript
    "no-unused-vars": 0,
    "typescript/no-unused-vars": 0,
    "no-underscore-dangle": 0,

    // Import
    'import/no-unresolved': [2, { commonjs: true }],

    // Compat
    'compat/compat': 2,

    // JSX-a11y
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "a" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          'node_modules',
          PATHS.client,
          PATHS.src,
          PATHS.root,
        ],
        extensions: [
          ".js",
          ".tsx",
          ".ts",
          ".jsx"
        ]
      },
    },
  },
  globals: {
    SERVER: false,
  },
};
