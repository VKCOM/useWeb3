export function eth() {
    return window?.ethereum
}

export function isEth() {
    return !!eth()
}