import {JsonRpcSigner, Web3Provider} from "@ethersproject/providers";

export enum WalletStatus {
    NOT_CONNECTED = "NOT_CONNECTED",
    CONNECTED = "CONNECTED"
}

export type AccountsList = Array<string>;

export interface WalletHookData {
    status: WalletStatus,
    provider?: Web3Provider,
    signer?: JsonRpcSigner,
    accounts?: AccountsList
}
