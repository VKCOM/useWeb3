import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import {
    EthMethods,
    EthEvents,
    WalletActions,
    WalletData,
    WalletId,
    IAccount,
    ChainId,
} from './types'
import { eth, getHost, isEth, isMobile } from './constants'

function useMetamask(_provider?: any) {
    const walletId = WalletId.Metamask
    const isAvailable = isMetamaskAvailable()
    const [account, setAccount] = useState<IAccount>()
    const [chainId, setChainId] = useState<ChainId>(null)
    const provider = _provider || getProvider()

    useEffect(() => {
        if (provider) {
            // request authenticated wallet
            getAccount(provider).then((accountId) => setAccount(accountId))
            provider.on(EthEvents.networkChange, setChainId)
        }

        // TODO support ethereum events
        // window.ethereum.on('accountsChanged', async () => {
        // Do something
        // });
    }, [provider])

    // TODO support network change
    const data: WalletData = {
        walletId,
        isAvailable,
        account,
        chainId,
        isAuthenticated: account !== null,
    }
    const actions: WalletActions = {
        connect: connect(provider, setAccount),
        sign: sign(provider),
    }

    return [data, actions] as const
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
    } else if (isMobile()) {
        window.open(generateLink(getHost()), '_blank')
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
            return signer.signMessage(message)
        }
    }

    return null
}

export function generateLink(url: string) {
    return 'https://metamask.app.link/dapp/' + url
}

export default useMetamask
