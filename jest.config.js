const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
    preset: 'jest-preset-typescript',
    rootDir: root,
    displayName: 'root-tests',
    //testMatch: ['<rootDir>/src/**/*.test.ts'],
    testEnvironment: 'node',
    clearMocks: true,
    //preset: 'ts-node',
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
        '@test/(.*)': '<rootDir>/test/$1',
    }
}