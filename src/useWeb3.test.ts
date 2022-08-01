import {
    default as useWeb3,
    sortByAvailable,
    byWalletId,
    getAuthenticated,
} from './useWeb3'
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
        chainId: null,
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

    const [hooksData] = current
    const walletIds = hooksData.map(([data]) => data.walletId)
    expect(walletIds).toContain(WalletId.Metamask)
    expect(walletIds).toContain(WalletId.Phantom)
    expect(walletIds).toContain(WalletId.WalletConnect)
})

test('return wallet by walletId', () => {
    const phantomWallet = { walletId: WalletId.Phantom }
    const wallets: any = [[{ walletId: WalletId.Metamask }], [phantomWallet]]
    expect(byWalletId(wallets, WalletId.Phantom)).toStrictEqual([phantomWallet])
})

test('returns authenticated wallets', () => {
    const phantomWallet = { walletId: WalletId.Phantom, account: null }
    const metamaskWallet = { walletId: WalletId.Metamask, account: 1 }
    const walletConnectWallet = { walletId: WalletId.WalletConnect, account: 2 }
    const wallets: any = [
        [metamaskWallet],
        [phantomWallet],
        [walletConnectWallet],
    ]
    expect(getAuthenticated(wallets)).toStrictEqual([
        [metamaskWallet],
        [walletConnectWallet],
    ])
})
