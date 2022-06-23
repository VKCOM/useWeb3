import { WalletId } from './constants'

function useMetamask() {
    const walletId = WalletId.metamask
    const isAvailable = window?.ethereum?.isMetamask || false

    return [walletId, isAvailable]
}

export default useMetamask
