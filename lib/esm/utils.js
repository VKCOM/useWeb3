import _isMobile from 'ismobilejs';
export function isMobile() {
    return _isMobile(window === null || window === void 0 ? void 0 : window.navigator).any;
}
