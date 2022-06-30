

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
