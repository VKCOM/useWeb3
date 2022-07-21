# useWeb3

Set of hooks to work with web3 wallets
#tdd #fp

-   Metamask (EVM) ✅
-   WalletConnect (EVM) ✅
-   Phantom (Solana) ✅
    We recommend not to use Phantom deeplinks on the web app (due to bad UX)
    or generate dappEncryptionPublicKey on the server (for security reasons)
-   Near
-   Ton

Кошелёк Рекомендасьон:
(десктоп) - метамаск - валлетконнект - фантом
(мобайл) - валлентконнект - фантом - метамаск

### TODO

-   move test to **tests** folder
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
-   Phantom Account change
    https://docs.phantom.app/integrating/extension-and-in-app-browser-web-apps/establishing-a-connection#changing-accounts

#### Phantom mobile

web deeplink

https://phantom.app/ul/v1/connect?dapp_encryption_public_key=CLpGrbcMnDbgLLN8swhnsxDH45aaz5n9h2UdLJV6hq8b&app_url=https%3A%2F%2Fya.ru&cluster=mainnet-beta&redirect_link=https%3A%2F%2Fya.ru

https://ya.ru/?data=6jjJQ8235wpFimNQ3ojwSWvfYX8sN4CgMkR5Q7pJ9tFQgwCiGnd9MPzJf86nSkmBJVhJGhAjSnicL5jc5jy23tjGUcfexESVVVpKCwi4RqxcnGLv1jEnZyfchsSaHamM9ySD4JkwAFxBPwLLGVA3oam68qWT4CfAfm1J781b2Ye12L8XuKcgkAfoRUmwz13g7fPgPS5mviW21D4cqXBe2AAHvHErLZCbLALUH27Hh2zD6vrsMKkz3vy9N726vcAuSJghC1tLmsFeYJRzzsBWkxUnk51rkGKtq3aWef3EiLokRRCCX3bBEYGjNAzLmeTQLaD2iJUQ7t5mKqA2m4MGDViUiEU1F8c8r7mSaZKqYy7nGDdf8NMy6GmHt9aZXzGPkc3zCs11No5meDqVZRTGJMGz4iSBKjT8hYPTk&nonce=5HbPnSgBuESTMsgp58FF9EL18RfZAdWsC&phantom_encryption_public_key=6HLZPEZzgUVzZWVYGDWP2TeghNdAsWctMMx363e4TYfc

https://ya.ru/?data=xt8yYzMu5DGPFinbmoJV7vtxGor7PjLR3YJTErNNYzQVkSGVRt3koxMVKfFbxrDkdqEFT15Mb9acj3XgtvbardKtgF8JmT48RmZJvGaYoc1fBS7ofGtqvrjQnP65VdPVXVFEiv8sY4JLjrtXHHThAMdk4KoatMTdhAgaYdWUvJhNMaQ7MsrfvpqmUmcnzsUt3d6pWpDR58A8DnBP11YG4czP4ErmZ7mwBxenxuntjf3QeFLvP998UZKEKtBKhDgZ1qQur4ZLZvJY5Q1KjCUGBAwHwfwLV7MCjYTDi9S3GkPpXVDwzmaL3GrhKkJYdFjgNt3Dw7Dm6P6eVVDXF6X6HidzfYe6nC2LVhH3yfzrg8ncd4pqABNdBhh5qscM4JUc1mXPTENWsQM53BzXFdfipySKbGHQKobcCPX&nonce=MXcgZwhLU8poV2fKuGYj32KNyWPoTExRW&phantom_encryption_public_key=CnKjBpJggoACfwpScPXsb4kBLM3mjVenkyX2S2sC953U
