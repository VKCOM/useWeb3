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

test('should be not available by defaut', () => {
    const {
        result: {
            current: [, isAvailable],
        },
    } = renderHook(() => useMetamask())
    expect(isAvailable).toBeFalsy()
})

test('should return availability', () => {
    window.ethereum = { isMetamask: true }
    const {
        result: {
            current: [, isAvailable],
        },
    } = renderHook(() => useMetamask())
    expect(isAvailable).toBeTruthy()
})
