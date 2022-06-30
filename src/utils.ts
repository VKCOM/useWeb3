import _isMobile from 'ismobilejs'

export function isMobile() {
    return _isMobile(window?.navigator).any
}

export function eth() {
    return window?.ethereum
}
export function isEth() {
    return !!eth()
}
