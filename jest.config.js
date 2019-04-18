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
            "functions": 50,
            "lines": 65,
            "statements": 65
        }
    },
    "collectCoverageFrom": [
        "src/*.{js,ts}"
    ]
};
