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
        'no-unused-vars': 'warn',
        eqeqeq: 'error',
        'no-use-before-define': 'error',
        quotes: ['error', 'single'],
      },
    },
  ],
};
