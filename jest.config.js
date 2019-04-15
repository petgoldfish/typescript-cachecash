module.exports = {
    "transform": {
        ".(ts|tsx)": "ts-jest"
    },
    "testEnvironment": "node",
    "testRegex": "test/.+\\.(test|spec)\\.(ts|tsx|js)$",
    "testPathIgnorePatterns": [
        "/node_modules/",
        "/dist/",
        "/browser/"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "coveragePathIgnorePatterns": [
        "/node_modules/",
        "/test/"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 40,
            "functions": 45,
            "lines": 45,
            "statements": 45
        }
    },
    "collectCoverageFrom": [
        "src/*.{js,ts}"
    ]
};

// "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
