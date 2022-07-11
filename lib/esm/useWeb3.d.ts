import { HookData } from './wallets/types';
export default function useWeb3(): readonly [(readonly [import("./wallets/types").WalletData, import("./wallets/types").WalletActions])[], {
    sortByAvailable: typeof sortByAvailable;
}];
export declare function sortByAvailable(hookData: HookData[]): HookData[];
