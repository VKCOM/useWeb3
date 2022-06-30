export enum WalletId {
    Metamask,
    Phantom,
    WalletConnect,
}

export type WalletData = {
    walletId: WalletId
    isAvailable: boolean
    account: string | null
    isAuthenticated: boolean
}

export type WalletActions = {
    connect: () => Promise<string>
    sign: (msg: string) => Promise<string>
}

export type WalletHook = [WalletData, WalletActions]

export type MessageParams = string[]
export type SignMessage = (messageParams: MessageParams) => Promise<string>