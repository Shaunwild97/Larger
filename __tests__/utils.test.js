const utils = require('../utils')

describe('concatenateQuotes scenarios', () => {
    test('quotes at end', () => {
        const input = 'arg1 "arg arg arg"'.split(" ")

        const expectedOutput = ['arg1', 'arg arg arg']

        expect(utils.concatenateQuotes(input)).toEqual(expectedOutput)
    })

    test('quotes at start', () => {
        const input = '"arg1 arg" arg arg'.split(" ")

        const expectedOutput = ['arg1 arg', 'arg', 'arg']

        expect(utils.concatenateQuotes(input)).toEqual(expectedOutput)
    })

    test('quotes in middle', () => {
        const input = 'arg1 "arg arg" arg'.split(" ")

        const expectedOutput = ['arg1', 'arg arg', 'arg']

        expect(utils.concatenateQuotes(input)).toEqual(expectedOutput)
    })

    test('multiple quotes', () => {
        const input = '"arg1 arg" "arg arg"'.split(" ")

        const expectedOutput = ['arg1 arg', 'arg arg']

        expect(utils.concatenateQuotes(input)).toEqual(expectedOutput)
    })

    test('no quotes', () => {
        const input = 'arg1 arg arg arg'.split(" ")

        const expectedOutput = ['arg1', 'arg', 'arg', 'arg']

        expect(utils.concatenateQuotes(input)).toEqual(expectedOutput)
    })
})

