const parser = require('./parser')
const constants = require('./constants.json')

let commandHandler

function larger(passthrough, message, prefix) {
    const noPassthrough = (arguments.length < 3)

    //This made me cringe
    if(noPassthrough) {
        prefix = message
        message = passthrough
    }

    const {command, args} = parser.parseMessage(message, prefix)

    if(commandHandler) {
        const handler = commandHandler[command]

        if(!noPassthrough) {
            args.unshift(passthrough)
        }

        if(handler) {
            handler(...args)
        }
    }

    return {command, args}
}

function handler(handler) {
    commandHandler = handler
}

larger.handler = handler

module.exports = larger
