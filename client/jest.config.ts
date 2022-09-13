export default {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
        '^.+\\.svg$': 'jest-svg-transformer',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    setupFiles: ['<rootDir>/setupEnvVars.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-date-mock', '<rootDir>/src/setupTests.ts'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    moduleNameMapper: {
        '^@app(.*)$': '<rootDir>/src$1',
        '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    collectCoverage: true,
};
