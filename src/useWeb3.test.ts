import { default as useWeb3, sortByAvailable } from './useWeb3'
import { renderHook } from '@testing-library/react'
import { HookData, WalletId } from './wallets/types'

test('sort hooks data by isAvailable method', () => {
    const actions = {
        connect: null,
        sign: null,
    }
    const getData = (walletId: WalletId, isAvailable = false) => ({
        walletId,
        account: null,
        isAvailable,
        isAuthenticated: false,
    })
    const data: HookData[] = [
        [getData(WalletId.Metamask), actions],
        [getData(WalletId.WalletConnect), actions],
        [getData(WalletId.Phantom, true), actions],
    ]
    const sorted = sortByAvailable(data)
    expect(sorted[0][0].walletId).toBe(WalletId.Phantom)
    expect(sorted[1][0].walletId).toBe(WalletId.Metamask)
    expect(sorted[2][0].walletId).toBe(WalletId.WalletConnect)
})

test('returns web3 wallets data', () => {
    const {
        result: { current },
    } = renderHook(useWeb3)
})
