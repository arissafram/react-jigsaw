module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
  rules: {
    semi: ['error', 'always'], // require semicolons
    quotes: ['error', 'single'], // require single quotes
    'no-console': 'warn', // warn on console.log
    'react/prop-types': 'off', // turn off prop-types for TS
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Enforce camelCase naming
    camelcase: ['error', { properties: 'always' }],

    // Disallow console.log and similar
    'no-console': 'error',

    // Disallow parameter reassignment, but allow for 'acc' property
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['acc'],
      },
    ],

    // Disallow ++ and -- except in for loop afterthoughts
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // Disallow assignment in return statements
    'no-return-assign': ['error', 'always'],

    // Disallow var, require let/const
    'no-var': 'error',

    // Prefer const for variables that are never reassigned
    'prefer-const': 'error',

    // Prefer spread operator over .apply()
    'prefer-spread': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
