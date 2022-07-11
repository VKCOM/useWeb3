"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var useWeb3_1 = __importStar(require("./useWeb3"));
var react_1 = require("@testing-library/react");
var types_1 = require("./wallets/types");
test('sort hooks data by isAvailable method', function () {
    var actions = {
        connect: null,
        sign: null,
    };
    var getData = function (walletId, isAvailable) {
        if (isAvailable === void 0) { isAvailable = false; }
        return ({
            walletId: walletId,
            account: null,
            isAvailable: isAvailable,
            isAuthenticated: false,
        });
    };
    var data = [
        [getData(types_1.WalletId.Metamask), actions],
        [getData(types_1.WalletId.WalletConnect), actions],
        [getData(types_1.WalletId.Phantom, true), actions],
    ];
    var sorted = (0, useWeb3_1.sortByAvailable)(data);
    expect(sorted[0][0].walletId).toBe(types_1.WalletId.Phantom);
    expect(sorted[1][0].walletId).toBe(types_1.WalletId.Metamask);
    expect(sorted[2][0].walletId).toBe(types_1.WalletId.WalletConnect);
});
test('returns web3 wallets data', function () {
    var current = (0, react_1.renderHook)(useWeb3_1.default).result.current;
    var hooksData = current[0];
    var walletIds = hooksData.map(function (_a) {
        var data = _a[0];
        return data.walletId;
    });
    expect(walletIds).toContain(types_1.WalletId.Metamask);
    expect(walletIds).toContain(types_1.WalletId.Phantom);
    expect(walletIds).toContain(types_1.WalletId.WalletConnect);
});
