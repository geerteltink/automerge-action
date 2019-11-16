module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/merge.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
