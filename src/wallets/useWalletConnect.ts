// https://docs.walletconnect.com/quick-start/dapps/client

import { WalletId } from './constants'

type WalletData = {
    walletId: WalletId
    isAvailable: boolean
    account: string | null
    isAuthenticated: boolean
}

type WalletActions = {
    connect: (() => string) | null
    sign: ((msg: string) => Promise<string>) | null
}

type WalletHook = [WalletData, WalletActions]

function useWalletConnect(): WalletHook {
    const data: WalletData = {
        walletId: WalletId.WalletConnect,
        isAvailable: false,
        account: null,
        isAuthenticated: false,
    }
    const action: WalletActions = {
        connect: null,
        sign: null
    }
    return [data, action]
}

export default useWalletConnect
