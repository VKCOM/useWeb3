"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = exports.getHost = exports.isMobile = exports.isEth = exports.eth = void 0;
var ismobilejs_1 = __importDefault(require("ismobilejs"));
function eth() {
    return window === null || window === void 0 ? void 0 : window.ethereum;
}
exports.eth = eth;
function isEth() {
    return !!eth();
}
exports.isEth = isEth;
function isMobile() {
    return (0, ismobilejs_1.default)(window.navigator).any;
}
exports.isMobile = isMobile;
function getHost() {
    var host = location.host, pathname = location.pathname, hash = location.hash, search = location.search;
    return host.concat(pathname, search, hash);
}
exports.getHost = getHost;
exports.strings = {
    EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE: 'Trying to connect to a wallet when provider is not available',
    EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE: 'Trying to sign a message when provider is not available',
};
