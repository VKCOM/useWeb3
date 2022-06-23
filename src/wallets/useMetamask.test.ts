import { renderHook, act } from '@testing-library/react'
import useMetamask from './useMetamask'
import { WalletId } from './constants'

test('should return wallet id', () => {
    const {
        result: {
            current: [walletId],
        },
    } = renderHook(() => useMetamask())
    expect(walletId).toBe(WalletId.metamask)
})
