import { PhantomProvider } from './types'

export const getProvider = (): PhantomProvider | undefined => {
    return window.solana
}
