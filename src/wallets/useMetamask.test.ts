import { renderHook, act } from '@testing-library/react'
import useMetamask, { generateLink } from './useMetamask'
import { EthMethods, WalletId } from './types'
import { getHost, isMobile } from './constants'

function render(provider?: any) {
    const {
        result: { current },
    } = renderHook(() => useMetamask(provider))

    return current
}

let uaGetter: jest.SpyInstance<string, []>
beforeEach(() => {
    window.ethereum = undefined
    uaGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    uaGetter.mockReturnValue('desktop')
})

test('should return wallet id', () => {
    const [{ walletId }] = render()
    expect(walletId).toBe(WalletId.Metamask)
})

test('should be not available by defaut', () => {
    const [{ isAvailable }, { connect, sign }] = render()
    expect(isAvailable).toBeFalsy()
    expect(connect).toBeNull()
    expect(sign).toBeNull()
})

test('should return availability', () => {
    const [{ isAvailable }] = render(initMetamask())
    expect(isAvailable).toBeTruthy()
})

async function testAuth() {
    const expectedAccountId = 'accountId'
    const provider = initMetamask({
        accountId: expectedAccountId,
    })
    const [, { connect }] = render(provider)
    let accountId
    await act(async () => {
        if (connect) accountId = await connect()
    })
    expect(accountId).toBe(expectedAccountId)
}

test('should authenicate web3 wallet', async () => {
    await testAuth()
})

test('should return null on connection fail', async () => {
    const provider = initMetamask({
        rejectSend: true,
    })
    const [, { connect }] = render(provider)
    let accountId
    await act(async () => {
        if (connect) accountId = await connect()
    })
    expect(accountId).toBeNull()
})

test('should sign message', () => {
    const message = 'message'
    const mockSignMessage = jest.fn(() => Promise.resolve(''))
    const provider = initMetamask({
        signMessage: mockSignMessage,
    })
    const [, { sign }] = render(provider)
    act(() => {
        if (sign) sign(message)
    })
    expect(mockSignMessage).toBeCalledWith(message)
})

fit('mobile device web2 browser on connect open deeplink', async () => {
    uaGetter.mockReturnValue('iPhone')
    window.open = jest.fn()
    const host = getHost()
    const expectedLink = generateLink(host)
    const [, { connect }] = render()
    act(() => {
        if (connect) connect()
    })
    expect(window.open).toBeCalledWith(expectedLink, '_blank')
})

fit('connect on mobile device web3 browser', async () => {
    uaGetter.mockReturnValue('iPhone')
    await testAuth()
})

interface IinitMetamask {
    accountId?: string
    rejectSend?: boolean
    signMessage?: (message: string) => Promise<string>
}
function initMetamask({
    accountId,
    rejectSend,
    signMessage,
}: IinitMetamask = {}) {
    window.ethereum = { isMetaMask: true }

    return mockProvider()

    function mockProvider() {
        return {
            send: async function mockSend(method: string, params: any[]) {
                if (rejectSend) throw new Error('ERRRORRORORORRORO')

                switch (method) {
                    case EthMethods.getAuthenticated:
                        return []
                    case EthMethods.authenticate:
                        return [accountId]
                    default:
                        return null
                }
            },
            getSigner: function mockGetSigner() {
                const mockSignMessage = Promise.resolve('string')
                return {
                    signMessage: signMessage || mockSignMessage,
                }
            },
        }
    }
}
