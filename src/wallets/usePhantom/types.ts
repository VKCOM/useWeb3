import { PublicKey, Transaction } from '@solana/web3.js'

export type DisplayEncoding = 'utf8' | 'hex'
export type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged'
export type PhantomRequestMethod =
    | 'connect'
    | 'disconnect'
    | 'signTransaction'
    | 'signAllTransactions'
    | 'signMessage'

export interface ConnectOpts {
    onlyIfTrusted: boolean
}

export interface PhantomProvider {
    publicKey: PublicKey | null
    isConnected: boolean | null
    signTransaction: (transaction: Transaction) => Promise<Transaction>
    signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
    signMessage: (
        message: Uint8Array | string,
        display?: DisplayEncoding
    ) => Promise<any>
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>
    disconnect: () => Promise<void>
    on: (event: PhantomEvent, handler: (args: any) => void) => void
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>
}

export type PhantomCluster = 'mainnet-beta' | 'testne' | 'devnet'
