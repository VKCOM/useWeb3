import { WalletData, HookData } from './wallets/types'

export default function useWeb3() {
    const data: HookData[] = []
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
