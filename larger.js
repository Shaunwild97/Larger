const parser = require('./parser')
const constants = require('./constants.json')

let commandHandler

function doParsePassthrough(passthrough, message, prefix) {
    let {command, args} = parser.parseMessage(message, prefix)

    if(commandHandler) {
        const handler = commandHandler[command]

        if(handler) {            
            if(handler.length == 1) {
                args = [args.join(' ')]
            }

            args.unshift(passthrough)

            handler(...args)
        }
    }

    return {command, args}
}

function doParse(message, prefix) {
    let {command, args} = parser.parseMessage(message, prefix)

    if(commandHandler) {
        const handler = commandHandler[command]

        if(handler) {
            if(handler.length == 1) {
                args = [args.join(' ')]
            }

            handler(...args)
        }
    }

    return {command, args}
}

function larger(passthroughOrMessage, messageOrPrefix, prefixOrNull) {
    if(prefixOrNull){
        return doParsePassthrough(passthroughOrMessage, messageOrPrefix, prefixOrNull)
    } else {
        return doParse(passthroughOrMessage, messageOrPrefix)
    }
}

function handler(handler) {
    commandHandler = handler
}

larger.handler = handler

module.exports = larger
