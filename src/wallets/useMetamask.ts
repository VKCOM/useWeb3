import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { WalletId, isEth, eth, EthMethods } from './constants'

type IAccount = string | undefined | null

function useMetamask(_provider: any) {
    const walletId = WalletId.Metamask
    const isAvailable = isMetamaskAvailable()
    const [account, setAccount] = useState<IAccount>()
    const provider = _provider || getProvider()

    useEffect(() => {
        if (provider) {
            // request authenticated wallet
            getAccount(provider).then((accountId) => setAccount(accountId))
        }

        // TODO support ethereum events
        // window.ethereum.on('accountsChanged', async () => {
        // Do something
        // });
    }, [provider])

    // TODO support network change
    // maybe refactor {walletId, isAvailable, network} to status Object
    // [data, actions]
    // data - {walletId, isAvailable, network, account}
    // actions - {connect, sign}
    // const data = {
    //     walletId,
    //     isAvailable,
    //     account,
    //     isAuthenticated: account !== null,
    //   };
    //   const actions = {
    //     connect: connect(provider, setAccount),
    //     sign: sign(provider),
    //   };
    //   return [data, actions];

    return [
        walletId,
        isAvailable,
        connect(provider, setAccount),
        sign(provider),
        account,
    ] as const
}

async function getAccount(provider: ethers.providers.Web3Provider) {
    try {
        const accounts: string[] = await provider.send(
            EthMethods.getAuthenticated,
            []
        )
        return accounts.shift()
    } catch (err) {
        return null
    }
}

function connect(
    provider: ethers.providers.Web3Provider | null,
    setAccount?: React.Dispatch<React.SetStateAction<IAccount>>
) {
    if (provider) {
        return async function requestAccounts(): Promise<IAccount> {
            try {
                const [accountId] = await provider.send(
                    EthMethods.authenticate,
                    []
                )

                if (setAccount) setAccount(accountId)
                return accountId
            } catch (err) {
                return null
            }
        }
    }

    return null
}

function getProvider() {
    const _eth = eth()
    if (isEth() && _eth) {
        return new ethers.providers.Web3Provider(_eth)
    }
    return null
}

function isMetamaskAvailable() {
    return eth()?.isMetaMask || false
}

function sign(provider: ethers.providers.Web3Provider | null) {
    if (provider) {
        const signer = provider.getSigner()
        return function signMessage(message: string) {
            signer.signMessage(message)
        }
    }

    return null
}

export default useMetamask
