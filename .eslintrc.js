module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    '@typescript-eslint/camelcase': 0,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    curly: [2, 'all'],
    'no-path-concat': 0,
    'no-shadow': 2,
    'no-trailing-spaces': 2,
    'no-undef': 0,
    'no-with': 2,
    'no-eval': 1,
    'no-floating-decimal': 2,
    'no-inline-comments': 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 'off'
  }
}
