const larger = require('../larger')

test('markdown example works', () => {
    const content = '?kick user "bad behaviour"'
    const prefix = '?'
    
    const { command, args } = larger(content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(command).toBe('kick')
    expect(userToKick).toBe('user')
    expect(reason).toBe('bad behaviour')
})

describe('parseMessage', () => {
    test('simple command', () => {
        const input = '?help'
        const prefix = '?'

        const expectedOutput = {
            command: 'help',
            args: []
        }

        expect(larger(input, prefix)).toEqual(expectedOutput)
    })

    test('single argument', () => {
        const input = '?testcommand arg1'
        const prefix = '?'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1']
        }

        expect(larger(input, prefix)).toEqual(expectedOutput)
    })

    test('multiple arguments', () => {
        const input = '?testcommand arg1 arg2'
        const prefix = '?'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1', 'arg2']
        }

        expect(larger(input, prefix)).toEqual(expectedOutput)
    })

    test('quotes in argument', () => {
        const input = '!testcommand arg1 "quote arg"'
        const prefix = '!'

        const expectedOutput = {
            command: 'testcommand',
            args: ['arg1', 'quote arg']
        }

        expect(larger(input, prefix)).toEqual(expectedOutput)
    })
})

describe('error cases', () => {
    test('no prefix throws error', () => {
        expect(() => {
            larger('message')
        }).toThrow('You must specify a prefix')
    })

    test('no message throws error', () => {
        expect(() => {
            larger(null, '?')
        }).toThrow('You must specify a message')
    })
})
