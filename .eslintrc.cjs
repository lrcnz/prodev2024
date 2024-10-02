// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    // aligns closing brackets for tags
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/self-closing-comp': ['warn', { html: true, component: true }],
    // prettier overrides
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        endOfLine: 'lf',
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    // allows ignoring ts checks
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': ['warn', { 'newlines-between': 'always-and-inside-groups', alphabetize: { order: 'asc' } }],
  },
};

module.exports = config;
