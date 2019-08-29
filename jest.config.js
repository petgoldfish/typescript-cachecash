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
            "branches": 60,
            "functions": 40,
            "lines": 55,
            "statements": 55
        }
    },
    "collectCoverageFrom": [
        "src/*.{js,ts}"
    ]
};
