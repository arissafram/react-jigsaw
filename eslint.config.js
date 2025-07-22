import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      camelcase: ['error', { properties: 'always' }],
      'no-console': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['acc'],
        },
      ],
      'no-plusplus': [
        'error',
        { allowForLoopAfterthoughts: true },
      ],
      'no-return-assign': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettier,
];
