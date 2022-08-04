"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletId = exports.EthEvents = exports.EthMethods = void 0;
var EthMethods;
(function (EthMethods) {
    EthMethods["getAuthenticated"] = "eth_accounts";
    EthMethods["authenticate"] = "eth_requestAccounts";
})(EthMethods = exports.EthMethods || (exports.EthMethods = {}));
var EthEvents;
(function (EthEvents) {
    EthEvents["networkChange"] = "network";
})(EthEvents = exports.EthEvents || (exports.EthEvents = {}));
var WalletId;
(function (WalletId) {
    WalletId[WalletId["Metamask"] = 0] = "Metamask";
    WalletId[WalletId["Phantom"] = 1] = "Phantom";
    WalletId[WalletId["WalletConnect"] = 2] = "WalletConnect";
})(WalletId = exports.WalletId || (exports.WalletId = {}));
