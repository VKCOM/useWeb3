import _isMobile from 'ismobilejs';
export var WalletId;
(function (WalletId) {
    WalletId[WalletId["Metamask"] = 0] = "Metamask";
    WalletId[WalletId["Phantom"] = 1] = "Phantom";
})(WalletId || (WalletId = {}));
export var EthMethods = {
    getAuthenticated: 'eth_accounts',
    authenticate: 'eth_requestAccounts',
};
export function eth() {
    return window === null || window === void 0 ? void 0 : window.ethereum;
}
export function isEth() {
    return !!eth();
}
export function isMobile() {
    return _isMobile(window === null || window === void 0 ? void 0 : window.navigator).any;
}
