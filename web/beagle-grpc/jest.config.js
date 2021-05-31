module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "<rootDir>/src/lib/generated-proto",
    "<rootDir>/src/lib/models"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  testEnvironment: "node"
};