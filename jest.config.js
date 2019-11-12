module.exports = {
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/test/*.test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    NODE_ENV: 'test',
  },
};
