import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    // '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    // '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    // 'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
    // 'assets/(.*)': [
    //   '<rootDir>/images/$1',
    //   '<rootDir>/photos/$1',
    //   '<rootDir>/recipes/$1',
    // ],
    '@svc/(.*)': '<rootDir>/svc/$1',
    '@module/(.*)': '<rootDir>/modules/$1',
    '@dto/(.*)': '<rootDir>/dto/$1',
    '@entities/(.*)': '<rootDir>/entities/$1',
  },
};

export default config;
