import { useEffect, useState } from 'react'

import 'fast-text-encoding'
import { getHost, isMobile, strings } from '../constants'
import {
    DeeplinkConnectData,
    PhantomActions,
    PureWalletHook,
    WalletData,
    WalletId,
} from '../types'

import { PhantomCluster, PhantomProvider } from './types'
import nacl from 'tweetnacl'
import bs58 from 'bs58'

// TODO connect with deeplinks

// https://docs.phantom.app/integrating/deeplinks-ios-and-android
// https://phantom.app/ul/v1/connect?app_url=https%3A%2F%2Fvk.com&redirect_link=https%3A%2F%2Fya.ru&dapp_encryption_public_key=HyKsaJuGq3LBPkbNA2Pe2mb113YwRehrXMWJC1fH3can

// WORKING!
// https://phantom.app/ul/browse/https%3A%2F%2Fmagiceden.io%2Fitem-details%2FED8Psf2Zk2HyVGAimSQpFHVDFRGDAkPjQhkfAqbN5h7d?ref=https%3A%2F%2Fmagiceden.io

function usePhantom(_provider?: PhantomProvider): PureWalletHook {
    const [keyPair] = useState(generateDappEncryption())
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

    const actions: PhantomActions = {
        connect: connect(provider, isMobile(), keyPair.publicKey, setAccount),
        sign: sign(provider),
        getDappEncryptionKeys: getDappEncryptionKeys(keyPair),
        handleDeepLinkConnect: handleDeepLinkConnect(
            keyPair.secretKey,
            setAccount
        ),
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
    isMobile: boolean,
    publicKey: Uint8Array,
    set: React.Dispatch<React.SetStateAction<string | null>>
) {
    if (isMobile && !provider) {
        // We recommend not to use Phantom deeplinks on web app (due to bad UX)
        // or generate dappEncryptionPublicKey on server (for security reasons)
        return async function openDeepLink() {
            const url = generateLink(bs58.encode(publicKey), getHost())
            window.open(url, '_blank')
            return url
        }
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

export function generateDappEncryption() {
    return nacl.box.keyPair()
}

export function generateLink(public_key: string, host: string) {
    const params = new URLSearchParams({
        dapp_encryption_public_key: public_key,
        redirect_url: host,
        app_url: host,
        // TODO support cluster
    })
    return `https://phantom.app/ul/v1/connect?${params.toString()}`
}

export const getProvider = (): PhantomProvider | undefined => {
    return window.solana
}

export function gatherDeeplinkData() {
    // TODO get deeplink data from URL params
}

function getDappEncryptionKeys(keyPair: nacl.BoxKeyPair) {
    return function get() {
        return keyPair
    }
}

function handleDeepLinkConnect(
    secret: Uint8Array,
    set: React.Dispatch<React.SetStateAction<string | null>>
) {
    return function handleResponse(response: DeeplinkConnectData) {
        const { phantom_encryption_public_key, nonce, data } = response
        // Open shared box
        const sharedSecretDapp = nacl.box.before(
            bs58.decode(phantom_encryption_public_key),
            secret
        )
        const openedBox = nacl.box.open.after(
            bs58.decode(data),
            bs58.decode(nonce),
            sharedSecretDapp
        )
        type Parsed = {
            public_key: string
            session: string
        }
        const parsed: Parsed | null = openedBox
            ? JSON.parse(Buffer.from(openedBox).toString('utf8'))
            : null

        if (parsed && parsed.public_key) {
            set(parsed.public_key)
            return bs58.decode(parsed.public_key)
        }

        return null
    }
}

export default usePhantom
