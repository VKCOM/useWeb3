import { WalletId } from './constants'

function useMetamask() {
    const walletId = WalletId.metamask

    return [walletId]
}

export default useMetamask
