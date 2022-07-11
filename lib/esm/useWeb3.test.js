import { default as useWeb3, sortByAvailable } from './useWeb3';
import { renderHook } from '@testing-library/react';
import { WalletId } from './wallets/types';
test('sort hooks data by isAvailable method', function () {
    var actions = {
        connect: null,
        sign: null,
    };
    var getData = function (walletId, isAvailable) {
        if (isAvailable === void 0) { isAvailable = false; }
        return ({
            walletId: walletId,
            account: null,
            isAvailable: isAvailable,
            isAuthenticated: false,
        });
    };
    var data = [
        [getData(WalletId.Metamask), actions],
        [getData(WalletId.WalletConnect), actions],
        [getData(WalletId.Phantom, true), actions],
    ];
    var sorted = sortByAvailable(data);
    expect(sorted[0][0].walletId).toBe(WalletId.Phantom);
    expect(sorted[1][0].walletId).toBe(WalletId.Metamask);
    expect(sorted[2][0].walletId).toBe(WalletId.WalletConnect);
});
test('returns web3 wallets data', function () {
    var current = renderHook(useWeb3).result.current;
    var hooksData = current[0];
    var walletIds = hooksData.map(function (_a) {
        var data = _a[0];
        return data.walletId;
    });
    expect(walletIds).toContain(WalletId.Metamask);
    expect(walletIds).toContain(WalletId.Phantom);
    expect(walletIds).toContain(WalletId.WalletConnect);
});
