import useMetamask from './wallets/useMetamask';
import usePhantom from './wallets/usePhantom/usePhantom';
import useWalletConnect from './wallets/useWalletConnect';
export default function useWeb3() {
    var data = [useMetamask(), useWalletConnect({}), usePhantom()];
    var actions = { sortByAvailable: sortByAvailable };
    return [data, actions];
}
export function sortByAvailable(hookData) {
    return hookData.sort(function byAvailable(hookA, hookB) {
        var hookDataA = hookA[0];
        var hookDataB = hookB[0];
        return Number(hookDataB.isAvailable) - Number(hookDataA.isAvailable);
    });
}
