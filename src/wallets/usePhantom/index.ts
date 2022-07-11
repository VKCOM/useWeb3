import { useEffect, useState } from 'react'

import 'fast-text-encoding'
import strings from '../strings'
import {
    PureWalletActions,
    PureWalletHook,
    WalletData,
    WalletId,
} from '../types'

import { PhantomProvider } from './types'
import { getProvider } from './utils'

// TODO connect with deeplinks
// https://docs.phantom.app/integrating/deeplinks-ios-and-android

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
        isAuthenticated: account !== null,
    }

    const connect = async () => {
        if (provider === undefined) {
            throw new Error(
                strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE
            )
        }
        const connectionResp = await provider.connect()
        const account = connectionResp.publicKey?.toString() || null
        setAccount(account)
        return account
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
        connect,
        sign,
    }

    return [data, actions]
}

export default usePhantom
