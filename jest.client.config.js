module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'client/tsconfig.json' }],
    "^.+\\.svg$": "<rootDir>/client/svgTransform.js"
  },
  testMatch: ['<rootDir>/client/__tests__/**/*.(ts|tsx)', '**/?(*.)+(spec|test).(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$/': '<rootDir>/client/__mocks__/fileMock.js',
  },
  "resolver": undefined,
  setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts']
};