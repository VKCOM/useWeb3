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

// TODO connect with deeplinks

// https://docs.phantom.app/integrating/deeplinks-ios-and-android
// https://phantom.app/ul/v1/connect?app_url=https%3A%2F%2Fvk.com&redirect_link=https%3A%2F%2Fya.ru&dapp_encryption_public_key=HyKsaJuGq3LBPkbNA2Pe2mb113YwRehrXMWJC1fH3can

// WORKING!
// https://phantom.app/ul/browse/https%3A%2F%2Fmagiceden.io%2Fitem-details%2FED8Psf2Zk2HyVGAimSQpFHVDFRGDAkPjQhkfAqbN5h7d?ref=https%3A%2F%2Fmagiceden.io

function usePhantom(_provider?: PhantomProvider): PureWalletHook {
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
        _provider
    )
    const [account, setAccount] = useState<string | null>(null)

    useEffect(() => {
        if (!provider) {
            setProvider(getProvider())
        }
    }, [])

    const isAvailable = provider !== undefined

    const data: WalletData = {
        walletId: WalletId.Phantom,
        isAvailable,
        account,
        chainId: null,
        isAuthenticated: account !== null,
    }

    const actions: PureWalletActions = {
        connect: connect(false, provider, setAccount),
        sign: sign(provider),
    }

    return [data, actions]
}

interface Params {
    app_url: string
    redirect_link: string
    cluster?: PhantomCluster
}

function connect(
    isMobile: boolean,
    provider: PhantomProvider | undefined,
    set: React.Dispatch<React.SetStateAction<string | null>>
) {
    if (isMobile && !provider) {
        // return
    }

    return async function handleConnect(params?: Params) {
        if (!provider) {
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

function sign(provider: PhantomProvider | undefined) {
    return async function handleSign(msg: string) {
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
}

export function getDappEncryptionPublicKey() {
    return 'key'
}

export function generateLink(public_key: string, host: string) {
    // const params = new URLSearchParams({
    //     dapp_encryption_public_key:
    // })
    // return `https://phantom.app/ul/v1/connect?=9KZNkyGGHSbna3G9YZ4mrZaaZHp9a8zLtEoKfiK5pd4k&app_url=https%3A%2F%2Fya.ru&cluster=mainnet-beta&redirect_link=https%3A%2F%2Fya.ru`
}

export const getProvider = (): PhantomProvider | undefined => {
    return window.solana
}

export default usePhantom
