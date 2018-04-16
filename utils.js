const constants = require('./constants')

function concatenateQuotes(args) {
    let inQuote
    const result = []

    for (let a of args) {
        if (inQuote) {
            let head = result.pop()
            head += ` ${a}`

            if (a.endsWith(constants.QUOTE_CHAR)) {
                head = head.replace(constants.QUOTE_CHAR, constants.EMPTY_CHAR)
                inQuote = false
            }

            result.push(head)
        } else {
            let head = a

            if (head.startsWith(constants.QUOTE_CHAR)) {
                inQuote = true
                head = head.replace(constants.QUOTE_CHAR, constants.EMPTY_CHAR)
            }

            result.push(head)
        }
    }

    return result
}

module.exports = { concatenateQuotes }
