const larger = require('../larger')

test('markdown example works', () => {
    jest.resetModules()
    const content = '?kick user "bad behaviour"'
    const prefix = '?'

    const { command, args } = larger(content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(command).toBe('kick')
    expect(userToKick).toBe('user')
    expect(reason).toBe('bad behaviour')
})

test('handler works with passthrough', () => {
    const kick = jest.fn()

    larger.handler({
        kick
    })

    const content = '?kick user "long reason"'
    const prefix = '?'

    const { command, args } = larger('passthrough', content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(kick).toHaveBeenCalledWith('passthrough', 'user', 'long reason')
})

test('handler works without passthrough', () => {
    const kick = jest.fn()

    larger.handler({
        kick
    })

    const content = '?kick user "long reason"'
    const prefix = '?'

    const { command, args } = larger(content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(kick).toHaveBeenCalledWith('user', 'long reason')
})


test('handler works with 1 argument and passthrough', () => {
    const say = jest.fn((string) => { })

    larger.handler({
        say
    })

    const content = '?say long message spaces'
    const prefix = '?'

    const { command, args } = larger('passthrough', content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(say).toHaveBeenCalledWith('passthrough', 'long message spaces')
})

test('handler works with 1 argument no passthrough', () => {
    const say = jest.fn((string) => { })

    larger.handler({
        say
    })

    const content = '?say long message spaces'
    const prefix = '?'

    const { command, args } = larger(content, prefix)

    const userToKick = args[0]
    const reason = args[1]

    expect(say).toHaveBeenCalledWith('long message spaces')
})

describe('fallbacks', () => {
    test('called when no passthrough', () => {
        const fallback = jest.fn()

        larger.handler({
            fallback
        })

        const content = '?kick test'
        const prefix = '?'

        const { command, args } = larger(content, prefix)

        const userToKick = args[0]
        const reason = args[1]

        expect(fallback).toHaveBeenCalledWith('test')
    })

    test('called when is passthrough', () => {
        const fallback = jest.fn()

        larger.handler({
            fallback
        })

        const content = '?kick test'
        const prefix = '?'

        const { command, args } = larger('passthrough', content, prefix)

        const userToKick = args[0]
        const reason = args[1]

        expect(fallback).toHaveBeenCalledWith('passthrough', 'test')
    })
})
