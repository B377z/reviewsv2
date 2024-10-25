// eslint.config.js
import reactPlugin from 'eslint-plugin-react'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-config-prettier'
import babelParser from '@babel/eslint-parser'

export default [
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
      },
      parser: babelParser, // Use Babel parser
      parserOptions: {
        requireConfigFile: false, // No need for a Babel config file
        babelOptions: {
          presets: ['@babel/preset-react'], // Enable React preset
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...prettierPlugin.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
