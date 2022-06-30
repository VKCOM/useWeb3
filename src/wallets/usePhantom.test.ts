import {renderHook, act} from '@testing-library/react';

import {WalletId} from './types';
import usePhantom from './usePhantom';

import SpyInstance = jest.SpyInstance;

function setupWindow() {
  const window = {};

  Object.assign(window, {
    phantom: {

    },
  });
}

function render() {
  const {
    result: {current},
  } = renderHook(() => usePhantom());

  return current;
}

let windowSpy: SpyInstance;
beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

test('should return wallet id', () => {
  const [walletId] = render();
  expect(walletId).toBe(WalletId.Metamask);
});

test('should be not available by defaut', () => {
  const [, isAvailable, connect, sign] = render();
  expect(isAvailable).toBeFalsy();
  expect(connect).toBeNull();
  expect(sign).toBeNull();
});

test('should return availability', () => {
  const [, isAvailable] = render(initMetamask());
  expect(isAvailable).toBeTruthy();
});

it('should authenicate web3 wallet', async () => {
  const expectedAccountId = 'accountId';
  const provider = initMetamask({
    accountId: expectedAccountId,
  });
  const [, , connect] = render(provider);
  let accountId;
  await act(async () => {
    if (connect) accountId = await connect();
  });
  expect(accountId).toBe(expectedAccountId);
});

it('should return null on connection fail', async () => {
  const provider = initMetamask({
    rejectSend: true,
  });
  const [, , connect] = render(provider);
  let accountId;
  await act(async () => {
    if (connect) accountId = await connect();
  });
  expect(accountId).toBeNull();
});

it('should sign message', () => {
  const message = 'message';
  const mockSignMessage = jest.fn(() => Promise.resolve(''));
  const provider = initMetamask({
    signMessage: mockSignMessage,
  });
  const [, , , sign] = render(provider);
  act(() => {
    if (sign) sign(message);
  });
  expect(mockSignMessage).toBeCalledWith(message);
});

interface IinitMetamask {
  accountId?: string;
  rejectSend?: boolean;
  signMessage?: (message: string) => Promise<string>;
}
function initMetamask({accountId, rejectSend, signMessage}: IinitMetamask = {}) {
  window.ethereum = {isMetaMask: true};

  return mockProvider();

  function mockProvider() {
    return {
      send: async function mockSend(method: string, params: any[]) {
        if (rejectSend) throw new Error('ERRRORRORORORRORO');

        switch (method) {
          case EthMethods.getAuthenticated:
            return [];
          case EthMethods.authenticate:
            return [accountId];
          default:
            return null;
        }
      },
      getSigner: function mockGetSigner() {
        const mockSignMessage = Promise.resolve('string');
        return {
          signMessage: signMessage || mockSignMessage,
        };
      },
    };
  }
}
