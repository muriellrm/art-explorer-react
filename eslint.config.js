import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', '.eslint.config.js']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-refresh/only-export-components': 'off',
      'prettier/prettier': 'error',
    },
    ...js.configs.recommended,
    ...tseslint.configs.recommended,
    ...reactHooks.configs.recommended,
    ...reactRefresh.configs.vite,
    ...prettier.configs.recommended,
  },
])
