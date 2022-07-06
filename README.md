# useWeb3

Set of hooks to work with web3 wallets
#tdd #fp

-   Metamask (EVM) ✅
-   WalletConnect (EVM) ✅
-   Phantom (Solana) ✅
-   Near
-   Ton

### TODO:

-   useWeb3 getAuthenticated action
-   deeplinks for mobile
-   useWeb3 byWalletId action
    const wallet = web3data.find(function byWalletId([data]) {
    return data.walletId === walletId
    })
-   support network/account change
-   support context (or redux/etc.)
-   minimal size for npm package
-   example
-   magick and gnosis wallets?
-   binance smart chain wallet?
