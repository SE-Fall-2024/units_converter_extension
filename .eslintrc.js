module.exports = {
  overrides: [
    {
      files: ['code/**/*.js'],
      rules: {
        semi: 'error',
        'prefer-const': 'error',
        'no-console': 'error',
        'no-unused-vars': 'warn',
        eqeqeq: 'error',
        'no-use-before-define': 'error',
        'consistent-return': 'error',
        camelcase: 'error',
        quotes: ['error', 'single'],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        complexity: ['warn', 10],
      },
    },
  ],
};
