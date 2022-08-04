export declare type IAccount = string | null | undefined;
export declare type ChainId = string | null;
export declare enum EthMethods {
    getAuthenticated = "eth_accounts",
    authenticate = "eth_requestAccounts"
}
export declare enum EthEvents {
    networkChange = "network"
}
export declare enum WalletId {
    Metamask = 0,
    Phantom = 1,
    WalletConnect = 2
}
export declare type WalletData = {
    walletId: WalletId;
    isAvailable: boolean;
    account: IAccount;
    isAuthenticated: boolean;
    chainId: ChainId;
};
export declare type WalletActions = {
    connect: (() => Promise<IAccount>) | null;
    sign: ((msg: string) => Promise<string>) | null;
};
export declare type PureWalletActions = {
    connect: () => Promise<IAccount>;
    sign: (msg: string) => Promise<string>;
};
export declare type DeeplinkConnectData = {
    phantom_encryption_public_key: string;
    data: string;
    nonce: string;
};
export interface PhantomActions extends PureWalletActions {
    getDappEncryptionKeys?: () => nacl.BoxKeyPair;
    handleDeepLinkConnect?: (response: DeeplinkConnectData) => Uint8Array | null;
}
export declare type WalletHook = [WalletData, WalletActions];
export declare type PureWalletHook = [WalletData, PhantomActions];
export declare type HookData = WalletHook | PureWalletHook;
