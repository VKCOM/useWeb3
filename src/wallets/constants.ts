import _isMobile from 'ismobilejs'

export function eth() {
    return window?.ethereum
}

export function isEth() {
    return !!eth()
}

export function isMobile() {
    return _isMobile(window.navigator).any
}

export function getHost() {
    const { host, pathname, hash, search } = location
    return host.concat(pathname, search, hash)
}

export const strings = {
    EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE:
        'Trying to connect to a wallet when provider is not available',
    EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE:
        'Trying to sign a message when provider is not available',
}
