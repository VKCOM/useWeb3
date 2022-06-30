/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
  ],
  'rules': {
    "prettier/prettier": ["error", {
      "printWidth": 100,
      'endOfLine': 'auto',
    }],
    'indent': [
      'error',
      2,
      { "SwitchCase": 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    "react-hooks/rules-of-hooks": "error",
    '@typescript-eslint/ban-ts-comment': 0,
    'no-useless-catch': 0,
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object'],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before'
          },
          {
            'pattern': '{.,..,../..,../../..,../../../..,../../../../..}/{constants,style,globalStyles}{,/}*',
            'group': 'internal',
            'position': 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ],
  },
  'settings': {
    'import/ignore': [
      'node_modules/react-native/index\\.js$'
    ],
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
