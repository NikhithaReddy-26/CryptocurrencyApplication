/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^.+\\.(svg|gif|css|png)$': 'jest-svg-transformer',
  },
}
