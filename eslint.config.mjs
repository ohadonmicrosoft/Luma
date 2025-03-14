import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Ignore patterns for all files
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.env*',
      '!**/.env.example',
      '**/infrastructure/**',
      '**/polyfills.js',
      '**/webpack*.js',
      '**/vendor-chunks/**',
    ],
  },
  
  // Base config for JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'warn',
    },
  },
  
  // Config files override (JS files that are part of the build/config system)
  {
    files: [
      '**/*.config.js',
      '**/next.config.js',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/next-i18next.config.js',
      '**/.eslintrc.js',
      '**/lint-fix.js',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  
  // Specific override for next.config.js and lint-fix.js
  {
    files: [
      '**/next.config.js',
      '**/lint-fix.js',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  
  // TypeScript files (using compatibility layer)
  ...compat.extends(
    'plugin:@typescript-eslint/recommended'
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      '**/*.config.js',
      '**/next.config.js',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/next-i18next.config.js',
      '**/.eslintrc.js',
      '**/lint-fix.js',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-extra-semi': 'warn',
    },
  },
];
