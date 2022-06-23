import _isMobile from 'ismobilejs'

export enum WalletId {
    metamask,
    phantom,
}

export const EthMethods = {
    getAuthenticated: 'eth_accounts',
    authenticate: 'eth_requestAccounts',
}

export function eth() {
    return window?.ethereum
}
export function isEth() {
    return !!eth()
}

export function isMobile() {
    return _isMobile(window?.navigator).any
}
