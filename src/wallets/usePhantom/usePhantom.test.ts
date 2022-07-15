import { PublicKey } from '@solana/web3.js'
import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { strings } from '../constants'
import { WalletId } from '../types'

import { ConnectOpts, DisplayEncoding, PhantomProvider } from './types'
import usePhantom from './index'
import * as utils from './utils'

function render() {
    const {
        result: { current },
        result,
        rerender,
    } = renderHook(() => usePhantom())

    return { cur: current, result, rerender }
}

function setupSolana(isConnected = false, _publicKey: string | null = null) {
    const publicKey: PublicKey | null =
        _publicKey === null
            ? null
            : ({
                  toString(): string {
                      return _publicKey
                  },
              } as PublicKey)

    const solana: Partial<PhantomProvider> = {
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
    return solana
}

beforeEach(() => {
    jest.spyOn(utils, 'getProvider')
})

function mockSolana(mock: any) {
    // @ts-ignore
    utils.getProvider.mockImplementation(() => mock)
}

afterEach(() => {
    jest.restoreAllMocks()
})

test('should return a proper wallet id', () => {
    const [{ walletId }] = render().cur
    expect(walletId).toBe(WalletId.Phantom)
})

test('should reflect that phantom is available', () => {
    mockSolana(setupSolana())
    const [{ isAvailable }] = render().cur
    expect(isAvailable).toBe(true)
})

test('should reflect that phantom is not available', () => {
    const [{ isAvailable, account, isAuthenticated }] = render().cur
    expect(isAvailable).toBe(false)
    expect(account).toBeNull()
    expect(isAuthenticated).toBe(false)
})

test('should connect and save wallet', async () => {
    const expectedPublicKey = 'expectedPublicKey'
    const solanaMock = setupSolana(true, expectedPublicKey)
    mockSolana(solanaMock)
    const { result } = render()
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
})

test('should return null on connection fail', async () => {
    const expectedPublicKey = null
    const solanaMock = setupSolana(true, expectedPublicKey)
    mockSolana(solanaMock)
    const { result } = render()
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
    const [, { connect }] = render().cur
    await expect(connect()).rejects.toThrow(
        strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE
    )
})

test('should throw if trying to sign when not available', async () => {
    const [, { sign }] = render().cur
    await expect(sign('')).rejects.toThrow(
        strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE
    )
})

test('should sign a message', async () => {
    const solanaMock = setupSolana(true)
    const expectedSignedMsg = 'asdfasdf'
    solanaMock.signMessage = jest.fn(() => Promise.resolve(expectedSignedMsg))
    mockSolana(solanaMock)
    const { result } = render()
    const [, { sign }] = result.current

    let signedMessage
    await act(async () => {
        signedMessage = await sign('Test message')
    })
    expect(signedMessage).toBe(expectedSignedMsg)
    expect(solanaMock.signMessage).toBeCalledTimes(1)
})
