const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/',
    '<rootDir>/out/'
  ],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/out/**',
    '!**/tests/**',
    '!jest.config.js',
    '!jest.setup.js',
    '!jest.polyfills.js',
    '!playwright.config.ts',
    '!next.config.js',
    '!tailwind.config.ts',
    '!postcss.config.js',
  ],
  setupFiles: ['<rootDir>/jest.polyfills.js'],
};

module.exports = createJestConfig(customJestConfig);