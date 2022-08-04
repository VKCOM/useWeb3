"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticated = exports.byWalletId = exports.sortByAvailable = void 0;
var useMetamask_1 = __importDefault(require("./wallets/useMetamask"));
var usePhantom_1 = __importDefault(require("./wallets/usePhantom"));
var useWalletConnect_1 = __importDefault(require("./wallets/useWalletConnect"));
function useWeb3() {
    var data = [(0, useMetamask_1.default)(), (0, useWalletConnect_1.default)({}), (0, usePhantom_1.default)()];
    var actions = { sortByAvailable: sortByAvailable, byWalletId: byWalletId, getAuthenticated: getAuthenticated };
    return [data, actions];
}
exports.default = useWeb3;
function sortByAvailable(hookData) {
    return hookData.sort(function byAvailable(hookA, hookB) {
        var hookDataA = hookA[0];
        var hookDataB = hookB[0];
        return Number(hookDataB.isAvailable) - Number(hookDataA.isAvailable);
    });
}
exports.sortByAvailable = sortByAvailable;
function byWalletId(data, walletId) {
    return data.find(function findByWalletId(_a) {
        var data = _a[0];
        return data.walletId === walletId;
    });
}
exports.byWalletId = byWalletId;
function getAuthenticated(hookData) {
    return hookData.filter(function byAuthenticated(_a) {
        var account = _a[0].account;
        return account !== null;
    });
}
exports.getAuthenticated = getAuthenticated;
