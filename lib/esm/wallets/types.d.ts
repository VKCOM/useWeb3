export declare type IAccount = string | null | undefined;
export declare enum EthMethods {
    getAuthenticated = "eth_accounts",
    authenticate = "eth_requestAccounts"
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
};
export declare type WalletActions = {
    connect: (() => Promise<IAccount>) | null;
    sign: ((msg: string) => Promise<string>) | null;
};
export declare type PureWalletActions = {
    connect: () => Promise<IAccount>;
    sign: (msg: string) => Promise<string>;
};
export declare type WalletHook = [WalletData, WalletActions];
export declare type PureWalletHook = [WalletData, PureWalletActions];
export declare type HookData = WalletHook | PureWalletHook;
