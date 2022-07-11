export var EthMethods;
(function (EthMethods) {
    EthMethods["getAuthenticated"] = "eth_accounts";
    EthMethods["authenticate"] = "eth_requestAccounts";
})(EthMethods || (EthMethods = {}));
export var WalletId;
(function (WalletId) {
    WalletId[WalletId["Metamask"] = 0] = "Metamask";
    WalletId[WalletId["Phantom"] = 1] = "Phantom";
    WalletId[WalletId["WalletConnect"] = 2] = "WalletConnect";
})(WalletId || (WalletId = {}));
