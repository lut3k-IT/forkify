module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': 'warn',
    'func-names': ['error', 'as-needed'],
  },
};
