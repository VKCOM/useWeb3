export type IAccount = string | null | undefined

export type ChainId = string | null

export enum EthMethods {
    getAuthenticated = 'eth_accounts',
    authenticate = 'eth_requestAccounts',
}

export enum EthEvents {
    networkChange = 'network',
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
    chainId: ChainId
}

export type WalletActions = {
    connect: (() => Promise<IAccount>) | null // TODO refactor, always return function
    sign: ((msg: string) => Promise<string>) | null // TODO refactor, always return function (throw error if no connection)
}
export type PureWalletActions = {
    connect: () => Promise<IAccount>
    sign: (msg: string) => Promise<string>
}

export type WalletHook = [WalletData, WalletActions]
export type PureWalletHook = [WalletData, PureWalletActions] // TODO: Leave one of them
export type HookData = WalletHook | PureWalletHook // TODO refactor and remove
