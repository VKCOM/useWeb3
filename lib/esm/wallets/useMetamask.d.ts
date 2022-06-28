import { WalletId } from './constants';
declare type IAccount = string | undefined | null;
declare function useMetamask(_provider: any): readonly [WalletId.Metamask, boolean, (() => Promise<IAccount>) | null, ((message: string) => void) | null, IAccount];
export default useMetamask;
