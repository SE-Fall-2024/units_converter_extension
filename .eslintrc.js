module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: ['code/**/*.js'],
      rules: {
        semi: 'error',
        'prefer-const': 'error',
        'no-console': 'error',
        eqeqeq: 'error',
        quotes: ['error', 'single'],
      },
    },
  ],
};
