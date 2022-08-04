import { WalletActions, WalletData } from './types';
declare function useMetamask(_provider?: any): readonly [WalletData, WalletActions];
export declare function generateLink(url: string): string;
export default useMetamask;
