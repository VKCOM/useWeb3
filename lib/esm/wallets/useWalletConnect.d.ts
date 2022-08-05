/// <reference types="react" />
import { WalletHook } from './types';
export declare type MessageParams = string[];
export declare type SignMessage = (messageParams: MessageParams) => Promise<string>;
interface IMock {
    setAccount?: React.Dispatch<React.SetStateAction<string | null>>;
    signer?: SignMessage;
    account?: string;
}
export declare const signerFallbackFunction: SignMessage;
declare function useWalletConnect({ setAccount: _setAccount, signer: _signer, account: _account, }: IMock): WalletHook;
export default useWalletConnect;
