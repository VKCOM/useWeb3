"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEth = exports.eth = void 0;
function eth() {
    return window === null || window === void 0 ? void 0 : window.ethereum;
}
exports.eth = eth;
function isEth() {
    return !!eth();
}
exports.isEth = isEth;
