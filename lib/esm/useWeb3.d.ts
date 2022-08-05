import { HookData, WalletId } from './wallets/types';
export default function useWeb3(): readonly [(readonly [import("./wallets/types").WalletData, import("./wallets/types").WalletActions])[], {
    sortByAvailable: typeof sortByAvailable;
    byWalletId: typeof byWalletId;
    getAuthenticated: typeof getAuthenticated;
}];
export declare function sortByAvailable(hookData: HookData[]): HookData[];
export declare function byWalletId(data: HookData[], walletId: WalletId): HookData | undefined;
export declare function getAuthenticated(hookData: HookData[]): HookData[];
