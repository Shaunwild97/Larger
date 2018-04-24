const constants = require('./constants.json')

function splitMessage(message) {
    const regex = /([^ "]+|(?:")(?:\\"|[^"])+(?:"))/g
    const args = message.match(regex)

    const result = args.map(a => {
        if(a.startsWith(constants.QUOTE_CHAR)) {
            return a.substring(1, a.length - 1).replace(/\\"/g, constants.QUOTE_CHAR)
        }

        return a
    })

    return result
}

function parseMessage(message, prefix) {
    if(!prefix) {
        throw new Error('You must specify a prefix')
    }

    if(!message) {
        throw new Error('You must specify a message')
    }

    let args = splitMessage(message)
    
    let command = args.shift()
    command = command.replace(prefix, constants.EMPTY_CHAR)

    return {
        command,
        args
    }
}

module.exports = {
    splitMessage,
    parseMessage
}
