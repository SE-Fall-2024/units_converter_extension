module.exports = {
  parserOptions: {
    ecmaVersion: 'latest', // or 'latest' for ES2021+
    sourceType: 'module', // if you're using ES modules
  },
  env: {
    es6: true, // Enables ES6 features
    node: true, // If you're running in a Node.js environment
    browser: true, // If you're targeting browser environments
  },
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
