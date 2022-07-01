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
    connect: (() => Promise<IAccount>) | null // TODO refactor, always return function
    sign: ((msg: string) => Promise<string>) | null // TODO refactor, always return function (throw error if no connection)
}
export type WalletHook = [WalletData, WalletActions]