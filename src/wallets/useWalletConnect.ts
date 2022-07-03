import { useState } from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

import { WalletActions, WalletData, WalletHook, WalletId } from './types'

type Params = { accounts: string[]; chainId: string }
type Payload = { params: Params[] }

export type MessageParams = string[]
export type SignMessage = (messageParams: MessageParams) => Promise<string>

interface IMock {
    setAccount?: React.Dispatch<React.SetStateAction<string | null>>
    signer?: SignMessage
    account?: string
}

export const signerFallbackFunction: SignMessage = (msg) => {
    throw Error(
        'Signer is not available, please init a connection to wallet first.'
    )
}

function useWalletConnect({
    setAccount: _setAccount,
    signer: _signer,
    account: _account,
}: IMock): WalletHook {
    const [account, setAccount] = useState<string | null>(_account || null)
    // TODO replace with useState
    const setNetworkMock = (network: string) => {}
    const [signer, setSigner] = useState<SignMessage>(signerFallbackFunction)

    const data: WalletData = {
        walletId: WalletId.WalletConnect,
        isAvailable: true,
        account,
        isAuthenticated: false,
    }
    const action: WalletActions = {
        connect: connect(_setAccount || setAccount, setNetworkMock, setSigner),
        sign: sign(account, _signer || signer),
    }

    return [data, action]
}

function sign(account: string | null, signMessage: SignMessage) {
    return function handleSign(message: string) {
        if (account) {
            return signMessage([account, message])
        } else {
            return signerFallbackFunction([])
        }
    }
}

function connect(
    setAccount: (account: string) => void,
    setNetwork: (network: string) => void,
    setSigner: (signMessage: SignMessage) => void
) {
    return async function handleConnect() {
        const connector = new WalletConnect({
            bridge: 'https://bridge.walletconnect.org', // Required
            qrcodeModal: QRCodeModal,
        })
        if (!connector.connected) {
            // create new session
            connector.createSession()
        }

        // TODO
        // connector.on("session_update", (error, payload) => {
        //     if (error) {
        //       throw error;
        //     }

        //     // Get updated accounts and chainId
        //     const { accounts, chainId } = payload.params[0];
        //   });

        //   connector.on("disconnect", (error, payload) => {
        //     if (error) {
        //       throw error;
        //     }

        //     // Delete connector
        //   });

        return new Promise<string>((resolve, reject) => {
            connector.on(
                'connect',
                function handleConnect(error, payload: Payload) {
                    if (error) {
                        reject(error)
                    }

                    setSigner(connector.signMessage as unknown as SignMessage)

                    const { accounts, chainId } = payload.params[0]
                    const accountId = accounts[0]
                    setAccount(accountId)
                    setNetwork(chainId)
                    resolve(accountId)
                }
            )
        })
    }
}

export default useWalletConnect
