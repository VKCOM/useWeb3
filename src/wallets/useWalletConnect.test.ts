import { renderHook, act } from '@testing-library/react'
import useWalletConnect from './useWalletConnect'
import QRCodeModal from '@walletconnect/qrcode-modal'
import {WalletId} from "./types";

function render({ setAcountMock: setAccountMock, signer, account }: any = {}) {
    const {
        result: { current },
    } = renderHook(() =>
        useWalletConnect({ setAccount: setAccountMock, signer, account })
    )

    return current
}

beforeEach(() => {
    jest.clearAllMocks()
    window['connected'] = undefined
    window['error'] = undefined
})

test('return wallet id', () => {
    const [{ walletId }] = render()
    expect(walletId).toBe(WalletId.WalletConnect)
})

test('be available', () => {
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

test('not call QR modal for already connected user', () => {
    window['connected'] = true
    const [, { connect }] = render()
    act(() => {
        connect()
    })
    expect(QRCodeModal.open).not.toBeCalled()
})

// TODO refactor
it('authenicate web3 wallet', async () => {
    const expectedAccountId = 'accountId'
    window['accountId'] = expectedAccountId
    const setAcountMock = jest.fn()
    const [, { connect }] = render({ setAcountMock })
    let accountId
    await act(async () => {
        accountId = await connect()
    })
    expect(accountId).toBe(expectedAccountId)
    expect(setAcountMock).toBeCalledWith(expectedAccountId)
})

it('fail on web3 auth properly', () => {
    const error = 'errr'
    window['error'] = error
    const [, { connect }] = render()
    act(() => {
        expect(connect()).rejects.toEqual(error)
    })
})

it('should sign message', () => {
    const mockSignMessage = jest.fn()
    const message = 'message'
    const account = 'accountId'
    const [, { sign }] = render({ signer: mockSignMessage, account })
    act(() => {
        if (sign) sign(message)
    })
    expect(mockSignMessage).toBeCalledWith([account, message])
})
