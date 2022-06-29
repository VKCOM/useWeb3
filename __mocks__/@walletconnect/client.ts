type QRCodeModal = {
    open: () => void
}

interface IWalletConnect {
    qrcodeModal: QRCodeModal
}

type Params = { accounts: string[]; chainId: string }
type Payload = { params: Params[] }
type SubscribeCallback = (error: Error | null, payload: Payload) => void

function WalletConnect({ qrcodeModal }: IWalletConnect) {
    return {
        createSession: () => qrcodeModal.open(),
        connected: window['connected'],
        on: function subscribe(event: string, callback: SubscribeCallback) {
            switch (event) {
                case 'connect':
                    const accountId = window['accountId']
                    const error = window['error']
                    return callback(error, {
                        params: [{ accounts: [accountId], chainId: '1' }],
                    })
            }
        },
    }
}

export default WalletConnect
