import useMetamask from './wallets/useMetamask';
import usePhantom from './wallets/usePhantom';
import useWalletConnect from './wallets/useWalletConnect';
export default function useWeb3() {
    var data = [useMetamask(), useWalletConnect({}), usePhantom()];
    var actions = { sortByAvailable: sortByAvailable, byWalletId: byWalletId, getAuthenticated: getAuthenticated };
    return [data, actions];
}
export function sortByAvailable(hookData) {
    return hookData.sort(function byAvailable(hookA, hookB) {
        var hookDataA = hookA[0];
        var hookDataB = hookB[0];
        return Number(hookDataB.isAvailable) - Number(hookDataA.isAvailable);
    });
}
export function byWalletId(data, walletId) {
    return data.find(function findByWalletId(_a) {
        var data = _a[0];
        return data.walletId === walletId;
    });
}
export function getAuthenticated(hookData) {
    return hookData.filter(function byAuthenticated(_a) {
        var account = _a[0].account;
        return account !== null;
    });
}
