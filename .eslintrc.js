module.exports = {
    extends: ['kentcdodds', 'kentcdodds/jest'],
    rules: {
      'no-console': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'require-await': 'warn',
      'babel/new-cap': 'off',
      'babel/camelcase': 'off'
    }
  }