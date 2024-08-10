/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect"
    }
  },
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_+$' }],
    'no-restricted-imports': [
      "error", {
        "paths": [
          {
            name: "@mui/material",
            message: "Please import from @mui/material/{{name}} instead."
          }
        ]
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
