module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/src/helpers/**',
    ],
    coverageReporters: ['lcov', 'text', 'html'],
    coverageDirectory: 'coverage',
  };
