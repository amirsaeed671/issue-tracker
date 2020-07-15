const path = require('path')

module.exports = {
  displayName: 'server',
  roots: [path.join(__dirname, '../src')],
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.js'],
  moduleDirectories: [
    'node_modules',
    __dirname,
    path.join(__dirname, '../src'),
  ],
  coverageDirectory: path.join(__dirname, '../coverage'),
  collectCoverageFrom: ['**/src/**/*.js'],
  coveragePathIgnorePatterns: ['.*/__tests__/.*'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
