var config = require('./jest.config')
config.testRegex = "integration/.+\\.(test|spec)\\.(ts|tsx|js)$"
module.exports = config
