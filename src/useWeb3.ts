import { HookData } from './wallets/types'
import useMetamask from './wallets/useMetamask'
import usePhantom from './wallets/usePhantom/usePhantom'
import useWalletConnect from './wallets/useWalletConnect'

export default function useWeb3() {
    const data = [useMetamask(), useWalletConnect({}), usePhantom()]
    const actions = { sortByAvailable }

    return [data, actions] as const
}

export function sortByAvailable(hookData: HookData[]) {
    return hookData.sort(function byAvailable(hookA, hookB) {
        const [hookDataA] = hookA
        const [hookDataB] = hookB
        return Number(hookDataB.isAvailable) - Number(hookDataA.isAvailable)
    })
}
