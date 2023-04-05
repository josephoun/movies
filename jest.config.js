module.exports = {
    testMatch: [
        "**/__tests__/*.test.js",
        "**/?(*.)+(spec|test).js?(x)"
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    verbose: true,
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    },
    testEnvironment: "jsdom"
}

