import { PublicKey } from '@solana/web3.js'
import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { getHost, strings } from '../constants'
import { WalletId } from '../types'

import { ConnectOpts, DisplayEncoding, PhantomProvider } from './types'
import usePhantom, { generateLink, getDappEncryptionPublicKey } from './index'

function render(provider?: PhantomProvider) {
    const {
        result: { current },
    } = renderHook(() => usePhantom(provider))

    return current
}

let uaGetter: jest.SpyInstance<string, []>
beforeEach(() => {
    uaGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    uaGetter.mockReturnValue('desktop')
})

test('should return a proper wallet id', () => {
    const [{ walletId }] = render()
    expect(walletId).toBe(WalletId.Phantom)
})

test('should reflect that phantom is available', () => {
    const [{ isAvailable }] = render(setupSolana())
    expect(isAvailable).toBe(true)
})

test('should reflect that phantom is not available', () => {
    const [{ isAvailable, account, isAuthenticated }] = render()
    expect(isAvailable).toBe(false)
    expect(account).toBeNull()
    expect(isAuthenticated).toBe(false)
})

test('should connect and save wallet', async () => {
    await testConnect()
})

test('should return null on connection fail', async () => {
    const expectedPublicKey = null
    const solanaMock = setupSolana(true, expectedPublicKey)
    const { result } = renderHook(() => usePhantom(solanaMock))
    const [, { connect }] = result.current
    let connectResp
    await act(async () => {
        connectResp = await connect()
    })
    expect(solanaMock.connect).toBeCalledTimes(1)
    expect(connectResp).toBe(expectedPublicKey)
    const [{ account, isAuthenticated }] = result.current
    expect(account).toBe(expectedPublicKey)
    expect(isAuthenticated).toBe(false)
})

test('should throw if trying to connect when not available', async () => {
    const [, { connect }] = render()
    await expect(connect()).rejects.toThrow(
        strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE
    )
})

test('should throw if trying to sign when not available', async () => {
    const [, { sign }] = render()
    await expect(sign('')).rejects.toThrow(
        strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE
    )
})

test('should sign a message', async () => {
    const solanaMock = setupSolana(true)
    const expectedSignedMsg = 'asdfasdf'
    solanaMock.signMessage = jest.fn(() => Promise.resolve(expectedSignedMsg))
    const [, { sign }] = render(solanaMock)

    let signedMessage
    await act(async () => {
        signedMessage = await sign('Test message')
    })
    expect(signedMessage).toBe(expectedSignedMsg)
    expect(solanaMock.signMessage).toBeCalledTimes(1)
})

test('connect on mobile device web3 browser', async () => {
    uaGetter.mockReturnValue('iPhone')
    await testConnect()
})

// test('open deeplink when connect on mobile device', () => {
//     uaGetter.mockReturnValue('iPhone')
//     window.open = jest.fn()
//     const host = getHost()
//     const key = getDappEncryptionPublicKey()
//     const expectedLink = generateLink(key, host)
//     const [, { connect }] = render()
//     act(() => {
//         if (connect) connect()
//     })
//     expect(window.open).toBeCalledWith(expectedLink, '_blank')
// })

test('handle deeplink redirect', () => {})

function setupSolana(isConnected = false, _publicKey: string | null = null) {
    const publicKey: PublicKey | null =
        _publicKey === null
            ? null
            : ({
                  toString(): string {
                      return _publicKey
                  },
              } as PublicKey)

    const solana: any = {
        connect: jest.fn(
            (
                opts: Partial<ConnectOpts> | undefined
            ): Promise<{ publicKey: PublicKey }> => {
                // @ts-ignore
                return Promise.resolve({ publicKey: publicKey })
            }
        ),
        disconnect(): Promise<void> {
            return Promise.resolve(undefined)
        },
        isConnected: isConnected,
        publicKey: publicKey,
        signMessage(
            message: Uint8Array | string,
            display: DisplayEncoding | undefined
        ): Promise<any> {
            return Promise.resolve(undefined)
        },
    }
    return solana as PhantomProvider
}

// Test connect method
async function testConnect() {
    const expectedPublicKey = 'expectedPublicKey'
    const solanaMock = setupSolana(true, expectedPublicKey)
    const { result } = renderHook(() => usePhantom(solanaMock))
    const [, { connect }] = result.current

    let connectResp
    await act(async () => {
        connectResp = await connect()
    })

    expect(solanaMock.connect).toBeCalledTimes(1)
    expect(connectResp).toBe(expectedPublicKey)
    const [{ account, isAuthenticated }] = result.current
    expect(account).toBe(expectedPublicKey)
    expect(isAuthenticated).toBe(true)
}
