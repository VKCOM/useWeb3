import { HookData, WalletId } from './wallets/types'
import useMetamask from './wallets/useMetamask'
import usePhantom from './wallets/usePhantom'
import useWalletConnect from './wallets/useWalletConnect'

export default function useWeb3() {
    const data = [useMetamask(), useWalletConnect({}), usePhantom()]
    const actions = { sortByAvailable, byWalletId, getAuthenticated }

    return [data, actions] as const
}

export function sortByAvailable(hookData: HookData[]) {
    return hookData.sort(function byAvailable(hookA, hookB) {
        const [hookDataA] = hookA
        const [hookDataB] = hookB
        return Number(hookDataB.isAvailable) - Number(hookDataA.isAvailable)
    })
}

export function byWalletId(data: HookData[], walletId: WalletId) {
    return data.find(function findByWalletId([data]) {
        return data.walletId === walletId
    })
}

export function getAuthenticated(hookData: HookData[]) {
    return hookData.filter(function byAuthenticated([{ account }]) {
        return account !== null
    })
}
