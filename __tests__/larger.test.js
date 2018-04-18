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
