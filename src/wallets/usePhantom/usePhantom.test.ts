import { PublicKey } from '@solana/web3.js'
import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { getHost, strings } from '../constants'
import { WalletId } from '../types'
import { ConnectOpts, DisplayEncoding, PhantomProvider } from './types'
import usePhantom, { generateLink } from './index'

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

test('open deeplink when connect on mobile device', () => {
    const expectedEncryptionKeys = {
        publicKey: 'public dapp key',
    }
    window['keyPair'] = expectedEncryptionKeys
    uaGetter.mockReturnValue('iPhone')
    window.open = jest.fn()
    const host = getHost()
    const expectedLink = generateLink(expectedEncryptionKeys.publicKey, host)
    const [, { connect }] = render()
    act(() => {
        if (connect) connect()
    })
    expect(window.open).toBeCalledWith(expectedLink, '_blank')
})

// test('should store dapp encryption key on deeplink connect', () => {
//     const expectedEncryptionKeys = {
//         public: '',
//         secret: '',
//     }
//     uaGetter.mockReturnValue('iPhone') // TODO refactor: setMobile()
//     const [, { connect, getDappEncryptionKeys }] = render()
//     act(() => {
//         if (connect) connect()
//     })
//     expect(getDappEncryptionKeys).toEqual(expectedEncryptionKeys)
// })

// test('handle deeplink redirect', () => {
//     const expectedPublicKey = '9aQ9N4VMkJqFh7iYVtrcHp43czJmqeh4cF54fvtiVu8h'
//     const mySecretKey = bs58.decode(
//         'HRKLiWmPaFzsRh417svsWbMEDLwZ3g8p6gNUTHvB2FuK'
//     )

//     // Response data from Phantom deeplink
//     const deepLinkData = `6jjJQ8235wpFimNQ3ojwSWvfYX8sN4CgMkR5Q7pJ9tFQgwCiGnd9MPzJf86nSkmBJVhJGhAjSnicL5jc5jy23tjGUcfexESVVVpKCwi4RqxcnGLv1jEnZyfchsSaHamM9ySD4JkwAFxBPwLLGVA3oam68qWT4CfAfm1J781b2Ye12L8XuKcgkAfoRUmwz13g7fPgPS5mviW21D4cqXBe2AAHvHErLZCbLALUH27Hh2zD6vrsMKkz3vy9N726vcAuSJghC1tLmsFeYJRzzsBWkxUnk51rkGKtq3aWef3EiLokRRCCX3bBEYGjNAzLmeTQLaD2iJUQ7t5mKqA2m4MGDViUiEU1F8c8r7mSaZKqYy7nGDdf8NMy6GmHt9aZXzGPkc3zCs11No5meDqVZRTGJMGz4iSBKjT8hYPTk`
//     const box = bs58.decode(deepLinkData)
//     const nonce = bs58.decode(`5HbPnSgBuESTMsgp58FF9EL18RfZAdWsC`)
//     const phantom_encryption_public_key = `6HLZPEZzgUVzZWVYGDWP2TeghNdAsWctMMx363e4TYfc`

//     // Open shared box
//     const sharedSecretDapp = nacl.box.before(
//         bs58.decode(phantom_encryption_public_key),
//         mySecretKey
//     )
//     const openedBox = nacl.box.open.after(box, nonce, sharedSecretDapp)
//     const parsed = JSON.parse(
//         openedBox ? Buffer.from(openedBox).toString('utf8') : ''
//     )
//     // {
//     //     public_key: '9aQ9N4VMkJqFh7iYVtrcHp43czJmqeh4cF54fvtiVu8h',
//     //     session: '2czzJ91m5n6DNXsryqUSN8TsxU9YUwk46myfhGiwZojcwpQhDuHyeXQwRbDiDciQqH19ojcjtnJqqeg9cPRRo97ZsNwqeVudvTn29u6hCxRA6mc3NsWi4nfXAyrhJzNGJdFiM4hbFiHu6Pk7md5UnD9qeNnjjAzadUgzXCjM5pQgWM3jmBcx3oFPXmKBqo5tLn6fB8z6NZqbAYNA69X5hd8AJ8'
//     //   }

//     const key = getDappEncryptionPublicKey()
//     const { result } = renderHook(() => usePhantom())
//     let [, { handleDeepLinkConnect }] = result.current

//     let handlerResult
//     act(() => {
//         handlerResult = handleDeepLinkConnect({
//             phantom_encryption_public_key,
//             data: box,
//             nonce,
//         })
//     })

//     expect(handlerResult).toBe(expectedPublicKey)
//     // hook should connect
//     expect(result.current[0].account).toBe(expectedPublicKey)
// })

function setupSolana(isConnected = false, _publicKey: string | null = null) {
    // TODO refactor, too complex
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
