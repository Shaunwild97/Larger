const globals = require('./globals')

function concatenateQuotes(args) {
    let inQuote
    const result = []

    for (let a of args) {
        if (inQuote) {
            let head = result.pop()
            head += ` ${a}`

            if (a.endsWith(globals.QUOTE_CHAR)) {
                head = head.replace(globals.QUOTE_CHAR, globals.EMPTY_CHAR)
                inQuote = false
            }

            result.push(head)
        } else {
            let head = a

            if (head.startsWith(globals.QUOTE_CHAR)) {
                inQuote = true
                head = head.replace(globals.QUOTE_CHAR, globals.EMPTY_CHAR)
            }

            result.push(head)
        }
    }

    return result
}

module.exports = { concatenateQuotes }
