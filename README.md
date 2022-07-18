# useWeb3

Set of hooks to work with web3 wallets
#tdd #fp

-   Metamask (EVM) ✅
-   WalletConnect (EVM) ✅
-   Phantom (Solana) ✅
-   Near
-   Ton

Кошелёк Рекомендасьон:
(десктоп) - метамаск - валлетконнект - фантом
(мобайл) - валлентконнект - фантом - метамаск

### TODO

-   support network/account change
-   deeplinks for mobile (phantom)
-   support context (or redux/etc.)
-   add the _chain ID_ of the network the current wallet is connected to
-   add metadata about the network the current wallet is connected to and switching networks
-   minimal size for npm package
-   example
-   magick and gnosis wallets?
-   binance smart chain wallet?

#### BACKLOG

-   get balance
-   get networks with balance
-   ethereum.\_metamask.isUnlocked()
    This method returns a Promise that resolves to a boolean indicating if MetaMask is unlocked by the user. MetaMask must be unlocked in order to perform any operation involving user accounts. Note that this method does not indicate if the user has exposed any accounts to the caller.
