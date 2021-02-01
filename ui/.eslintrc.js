module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 0,
    'no-shadow': 0,
    'max-len': 0,
    'no-unused-expressions': 0,
    'prefer-promise-reject-errors': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
