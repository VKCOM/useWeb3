import { renderHook, act } from '@testing-library/react'
import useMetamask from './useMetamask'
import { WalletId, EthMethods } from './constants'

function render(provider?: any) {
    const {
        result: { current },
    } = renderHook(() => useMetamask(provider))

    return current
}

beforeEach(() => {
    jest.resetModules()
    window.ethereum = undefined
})

test('should return wallet id', () => {
    const [walletId] = render()
    expect(walletId).toBe(WalletId.metamask)
})

test('should be not available by defaut', () => {
    const [, isAvailable] = render()
    expect(isAvailable).toBeFalsy()
})

test('should return availability', () => {
    const [, isAvailable] = render(initMetamask())
    expect(isAvailable).toBeTruthy()
})

it('should authenicate web3 wallet', async () => {
    const expectedAccountId = 'accountId'
    const provider = initMetamask({
        accountId: expectedAccountId,
    })
    const [, , connect] = render(provider)
    const accountId = await connect()
    expect(accountId).toBe(expectedAccountId)
})

it('should return null on connection fail', async () => {
    const provider = initMetamask({
        rejectSend: true,
    })
    const [, , connect] = render(provider)
    let accountId
    await act(async () => (accountId = await connect()))
    expect(accountId).toBeNull()
})

interface IinitMetamask {
    accountId?: string
    rejectSend?: boolean
}
function initMetamask({ accountId, rejectSend }: IinitMetamask = {}) {
    window.ethereum = { isMetamask: true }

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
        }
    }
}
