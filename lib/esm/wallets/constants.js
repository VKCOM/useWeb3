export function eth() {
    return window === null || window === void 0 ? void 0 : window.ethereum;
}
export function isEth() {
    return !!eth();
}
