type QRCodeModal = {
    open: () => void
}

interface IWalletConnect {
    qrcodeModal: QRCodeModal
}

function WalletConnect({ qrcodeModal }: IWalletConnect) {
    return {
        createSession: () => qrcodeModal.open(),
        connected: window['connected'],
    }
}

export default WalletConnect
