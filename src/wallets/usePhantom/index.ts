import { useEffect, useState } from 'react'

import 'fast-text-encoding'
import { strings } from '../constants'
import {
    PureWalletActions,
    PureWalletHook,
    WalletData,
    WalletId,
} from '../types'

import { PhantomCluster, PhantomProvider } from './types'
import { getProvider } from './utils'

// TODO connect with deeplinks

// https://docs.phantom.app/integrating/deeplinks-ios-and-android
// https://phantom.app/ul/v1/connect?app_url=https%3A%2F%2Fvk.com&redirect_link=https%3A%2F%2Fya.ru&dapp_encryption_public_key=HyKsaJuGq3LBPkbNA2Pe2mb113YwRehrXMWJC1fH3can

// WORKING!
// https://phantom.app/ul/browse/https%3A%2F%2Fmagiceden.io%2Fitem-details%2FED8Psf2Zk2HyVGAimSQpFHVDFRGDAkPjQhkfAqbN5h7d?ref=https%3A%2F%2Fmagiceden.io

function usePhantom(): PureWalletHook {
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
        undefined
    )
    const [account, setAccount] = useState<string | null>(null)

    useEffect(() => {
        setProvider(getProvider())
    }, [])

    const isAvailable = provider !== undefined

    const data: WalletData = {
        walletId: WalletId.Phantom,
        isAvailable,
        account,
        chainId: null,
        isAuthenticated: account !== null,
    }

    const sign = async (msg: string) => {
        if (provider === undefined) {
            throw new Error(
                strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE
            )
        }
        const encodedMessage = new TextEncoder().encode(msg)
        const signedMessage = await provider.signMessage(encodedMessage, 'utf8')
        // TODO: maybe signature formatting is required
        return signedMessage
    }

    const actions: PureWalletActions = {
        connect: connect(provider, setAccount),
        sign,
    }

    return [data, actions]
}

interface Params {
    app_url: string
    redirect_link: string
    cluster?: PhantomCluster
}

function connect(
    provider: PhantomProvider | undefined,
    set: React.Dispatch<React.SetStateAction<string | null>>
) {
    return async function handleConnect(params?: Params) {
        if (provider === undefined) {
            throw new Error(
                strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE
            )
        }
        const connectionResp = await provider.connect()
        const account = connectionResp.publicKey?.toString() || null
        set(account)
        return account
    }
}

export default usePhantom
