"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMobile = exports.isEth = exports.eth = exports.EthMethods = exports.WalletId = void 0;
var ismobilejs_1 = __importDefault(require("ismobilejs"));
var WalletId;
(function (WalletId) {
    WalletId[WalletId["Metamask"] = 0] = "Metamask";
    WalletId[WalletId["Phantom"] = 1] = "Phantom";
})(WalletId = exports.WalletId || (exports.WalletId = {}));
exports.EthMethods = {
    getAuthenticated: 'eth_accounts',
    authenticate: 'eth_requestAccounts',
};
function eth() {
    return window === null || window === void 0 ? void 0 : window.ethereum;
}
exports.eth = eth;
function isEth() {
    return !!eth();
}
exports.isEth = isEth;
function isMobile() {
    return (0, ismobilejs_1.default)(window === null || window === void 0 ? void 0 : window.navigator).any;
}
exports.isMobile = isMobile;
