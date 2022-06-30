import {renderHook, act} from '@testing-library/react';

import {WalletId} from '../types';

import usePhantom from './usePhantom';

import SpyInstance = jest.SpyInstance;

function render() {
  const {
    result: {current},
  } = renderHook(() => usePhantom());

  return current;
}

function setupWindow() {
  const phantom = {};

  Object.assign(phantom, {
    connect: jest.fn(
      function connect() {
        // @ts-ignore
        return this;
      }.bind(phantom),
    ),
  });
  return {phantom};
}

let windowSpy: SpyInstance;
beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

function applyMockToWindow(mocked: any) {
  const originalWindow = {...global};
  windowSpy.mockImplementation(() => ({
    ...originalWindow, // In case you need other window properties to be in place
    ...mocked,
  }));
}

test('should return a proper wallet id', () => {
  const [{walletId}] = render();
  expect(walletId).toBe(WalletId.Phantom);
});

test('should signalize that provider is not available', () => {
  const [{isAvailable}] = render();
  expect(isAvailable).toBeFalsy();
});

test('should signalize that provider is available', () => {
  const mock = setupWindow();
  applyMockToWindow(mock);
  const [{isAvailable}] = render();
  expect(isAvailable).toBeFalsy();
});
/*
test('should be not available by defaut', () => {
  const [{isAvailable}] = render();
  expect(isAvailable).toBeFalsy();
  expect(connect).toBeNull();
  expect(sign).toBeNull();
});

test('should return wallet id', () => {
  const [walletId] = render();
  expect(walletId).toBe(WalletId.Metamask);
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
}*/
