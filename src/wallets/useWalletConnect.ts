import { useState, useEffect } from 'react'
// https://docs.walletconnect.com/quick-start/dapps/client
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

import { WalletId } from './constants'

type WalletData = {
    walletId: WalletId
    isAvailable: boolean
    account: string | null
    isAuthenticated: boolean
}

type WalletActions = {
    connect: () => Promise<string>
    sign: ((msg: string) => Promise<string>) | null
}

type WalletHook = [WalletData, WalletActions]

type Params = { accounts: string[]; chainId: string }
type Payload = { params: Params[] }

function useWalletConnect(
    _setAccount?: React.Dispatch<React.SetStateAction<string | null>>
): WalletHook {
    const [account, setAccount] = useState<string | null>(null)

    const data: WalletData = {
        walletId: WalletId.WalletConnect,
        isAvailable: true,
        account,
        isAuthenticated: false,
    }
    const action: WalletActions = {
        connect: connect(_setAccount || setAccount, (network) => {}),
        sign: null,
    }

    return [data, action]
}

function sign() {
    // https://docs.walletconnect.com/quick-start/dapps/client#sign-message-eth_sign
}

function connect(
    setAccount: (account: string) => void,
    setNetwork: (network: string) => void
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

        return new Promise<string>((resolve, reject) => {
            connector.on(
                'connect',
                function handleConnect(error, payload: Payload) {
                    if (error) {
                        reject(error)
                    }

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
