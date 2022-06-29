import { renderHook, act } from '@testing-library/react'
import useWalletConnect from './useWalletConnect'
import { WalletId, EthMethods } from './constants'
import QRCodeModal from '@walletconnect/qrcode-modal'

function render(provider?: any) {
    const {
        result: { current },
    } = renderHook(() => useWalletConnect())

    return current
}

beforeEach(() => {
    jest.clearAllMocks()
    window['connected'] = undefined
})

test('should return wallet id', () => {
    const [{ walletId }] = render()
    expect(walletId).toBe(WalletId.WalletConnect)
})

test('should be available', () => {
    const [{ isAvailable }] = render()
    expect(isAvailable).toBeTruthy()
})

test('call QR modal on connect', () => {
    const [, { connect }] = render()
    act(() => {
        connect()
    })
    expect(QRCodeModal.open).toBeCalled()
})

test('should not call QR modal for already connected user', () => {
    window['connected'] = true
    const [, { connect }] = render()
    act(() => {
        connect()
    })
    expect(QRCodeModal.open).not.toBeCalled()
})

// it('should authenicate web3 wallet', async () => {
//     const expectedAccountId = 'accountId'
//     const provider = initMetamask({
//         accountId: expectedAccountId,
//     })
//     const [, , connect] = render(provider)
//     let accountId
//     await act(async () => {
//         if (connect) accountId = await connect()
//     })
//     expect(accountId).toBe(expectedAccountId)
// })

// it('should return null on connection fail', async () => {
//     const provider = initMetamask({
//         rejectSend: true,
//     })
//     const [, , connect] = render(provider)
//     let accountId
//     await act(async () => {
//         if (connect) accountId = await connect()
//     })
//     expect(accountId).toBeNull()
// })

// it('should sign message', () => {
//     const message = 'message'
//     const mockSignMessage = jest.fn(() => Promise.resolve(''))
//     const provider = initMetamask({
//         signMessage: mockSignMessage,
//     })
//     const [, , , sign] = render(provider)
//     act(() => {
//         if (sign) sign(message)
//     })
//     expect(mockSignMessage).toBeCalledWith(message)
// })

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
