export type IAccount = string | undefined | null

export enum EthMethods {
    getAuthenticated = 'eth_accounts',
    authenticate = 'eth_requestAccounts',
}

export enum WalletId {
    Metamask,
    Phantom,
    WalletConnect,
}

export type WalletData = {
    walletId: WalletId
    isAvailable: boolean
    account: IAccount
    isAuthenticated: boolean
}

export type WalletActions = {
    connect: (() => Promise<IAccount>) | null
    sign: ((msg: string) => Promise<string>) | null
}
export type WalletHook = [WalletData, WalletActions]