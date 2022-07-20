import { renderHook, act } from '@testing-library/react'
import useMetamask, { generateLink } from './useMetamask'
import { EthEvents, EthMethods, WalletId } from './types'
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

test('mobile device web2 browser on connect open deeplink', async () => {
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

test('connect on mobile device web3 browser', async () => {
    uaGetter.mockReturnValue('iPhone')
    await testAuth()
})

// ethereum.on('chainChanged', (chainId) => {
// Handle the new chain.
// Correctly handling chain changes can be complicated.
// We recommend reloading the page unless you have good reason not to.
//   window.location.reload();
// });
//  provider.on("network", (newNetwork, oldNetwork) => {
// When a Provider makes its initial connection, it emits a "network"
// event with a null oldNetwork along with the newNetwork. So, if the
// oldNetwork exists, it represents a changing network
// if (oldNetwork) {
// window.location.reload();
// }
// });

test('handle network change', () => {
    const expectedChainId = 'newChain'
    const provider = initMetamask()
    const { result } = renderHook(() => useMetamask(provider))
    expect(result.current[0].chainId).toBeNull()
    act(() => {
        provider.setChainId(expectedChainId)
    })
    expect(result.current[0].chainId).toBe(expectedChainId)
})

// ethereum.on('accountsChanged', function (accounts) {
// Time to reload your interface with accounts[0]!
// });
// Once you've connected to a user, you can always re-check the current account by checking ethereum.selectedAddress
// test('update account on account changed event', () => {})

test('initMetamask pub/sub', () => {
    const chainId = 'id'
    const provider = initMetamask()
    const handler = jest.fn()
    provider.on(EthEvents.networkChange, handler)
    provider.setChainId(chainId)
    expect(handler).toBeCalledWith(chainId)
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
    const events = {}
    window.ethereum = { isMetaMask: true }

    return mockProvider()

    function mockProvider() {
        return {
            on: function handleEvent(eventName: string, callback: any) {
                if (!events[eventName]) {
                    events[eventName] = new Array()
                }
                events[eventName].push(callback)
            },
            setChainId: function updateChain(chainId: string) {
                const onNetworkChange = events[EthEvents.networkChange]
                if (onNetworkChange) {
                    onNetworkChange.forEach(function trigger(handler: any) {
                        handler(chainId)
                    })
                }
            },
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
