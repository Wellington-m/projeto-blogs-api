module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
    coverageReporters: ['lcov', 'text', 'html'],
    coverageDirectory: 'coverage',
  };
