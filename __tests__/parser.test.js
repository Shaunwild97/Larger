const parser = require('../parser')

describe('splitMessage scenarios', () => {
    test('quotes at end', () => {
        const input = 'arg1 "arg arg arg"'

        const expectedOutput = ['arg1', 'arg arg arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })

    test('quotes at start', () => {
        const input = '"arg1 arg" arg arg'

        const expectedOutput = ['arg1 arg', 'arg', 'arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })

    test('quotes in middle', () => {
        const input = 'arg1 "arg arg" arg'

        const expectedOutput = ['arg1', 'arg arg', 'arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })

    test('multiple quotes', () => {
        const input = '"arg1 arg" "arg arg"'

        const expectedOutput = ['arg1 arg', 'arg arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })

    test('no quotes', () => {
        const input = 'arg1 arg arg arg'

        const expectedOutput = ['arg1', 'arg', 'arg', 'arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })

    test('escaped quotes inside', () => {
        const input = 'arg1 "arg \\"arg\\" arg" arg'

        const expectedOutput = ['arg1', 'arg "arg" arg', 'arg']

        expect(parser.splitMessage(input)).toEqual(expectedOutput)
    })
})

describe('parseMessage', () => {
    test('simple command', () => {
        const input = '?help'
        const prefix = '?'

        const expectedOutput = {
            command: 'help',
            args: []
        }

        expect(parser.parseMessage(input, prefix)).toEqual(expectedOutput)
    })

    test('single argument', () => {
        const input = '?testcommand arg1'
        const prefix = '?'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1']
        }

        expect(parser.parseMessage(input, prefix)).toEqual(expectedOutput)
    })

    test('multiple arguments', () => {
        const input = '?testcommand arg1 arg2'
        const prefix = '?'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1', 'arg2']
        }

        expect(parser.parseMessage(input, prefix)).toEqual(expectedOutput)
    })

    test('quotes in argument', () => {
        const input = '!testcommand arg1 "quote arg"'
        const prefix = '!'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1', 'quote arg']
        }

        expect(parser.parseMessage(input, prefix)).toEqual(expectedOutput)
    })
})

describe('error cases', () => {
    test('no prefix throws error', () => {
        expect(() => {
            parser.parseMessage('message')
        }).toThrow('You must specify a prefix')
    })

    test('no message throws error', () => {
        expect(() => {
            parser.parseMessage(null, '?')
        }).toThrow('You must specify a message')
    })
})
