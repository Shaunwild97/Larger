const parser = require('./parser')
const constants = require('./constants.json')

function larger(message, prefix) {
    return parser.parseMessage(message, prefix)
}

module.exports = larger
