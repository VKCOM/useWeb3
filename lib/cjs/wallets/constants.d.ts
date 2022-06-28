export declare enum WalletId {
    Metamask = 0,
    Phantom = 1
}
export declare const EthMethods: {
    getAuthenticated: string;
    authenticate: string;
};
export declare function eth(): {
    isMetaMask?: boolean | undefined;
} | undefined;
export declare function isEth(): boolean;
export declare function isMobile(): boolean;
