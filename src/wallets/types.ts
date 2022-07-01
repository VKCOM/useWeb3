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
  walletId: WalletId;
  isAvailable: boolean;
  account: string | null;
  isAuthenticated: boolean;
};

export type WalletActions = {
  connect: () => Promise<string | null>;
  sign: (msg: string) => Promise<string>;
};
export type WalletHook = [WalletData, WalletActions];
