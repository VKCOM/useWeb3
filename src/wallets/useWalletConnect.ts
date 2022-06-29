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

function useWalletConnect(): WalletHook {
    const data: WalletData = {
        walletId: WalletId.WalletConnect,
        isAvailable: true,
        account: null,
        isAuthenticated: false,
    }
    const action: WalletActions = {
        connect: connect((account: string) => {}),
        sign: null,
    }
    return [data, action]
}

function sign() {
    // https://docs.walletconnect.com/quick-start/dapps/client#sign-message-eth_sign
}

function connect(setAccount: (account: string) => void) {
    return async function handleConnect() {
        const connector = new WalletConnect({
            bridge: 'https://bridge.walletconnect.org', // Required
            qrcodeModal: QRCodeModal,
        })
        if (!connector.connected) {
            // create new session
            connector.createSession()
        }
        return 'account'
    }
}

export default useWalletConnect
