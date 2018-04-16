const utils = require('./utils')
const constants = require('./constants.json')

function parseMessage(message, prefix) {
    if(!prefix) {
        throw new Error('You must specify a prefix')
    }

    if(!message) {
        throw new Error('You must specify a message')
    }

    const splitMessage = message.split(constants.SPACE_CHAR)
    
    let command = splitMessage.shift()
    command = command.replace(prefix, constants.EMPTY_CHAR)

    const args = utils.concatenateQuotes(splitMessage)

    return {
        command,
        args
    }
}

module.exports = parseMessage
