import {useMemo} from 'react';

import {WalletActions, WalletData, WalletHook, WalletId} from '../types';

import {getPhantom} from './utils';

// isAvailable
// https://docs.phantom.app/integrating/extension-and-in-app-browser-web-apps/detecting-the-provider

// TODO connect with deeplinks
// https://docs.phantom.app/integrating/deeplinks-ios-and-android

function usePhantom(): WalletHook {
  const isAvailable = getPhantom() !== undefined;

  const data: WalletData = {
    walletId: WalletId.Phantom,
    isAvailable,
    account: null,
    isAuthenticated: false,
  };

  const action: WalletActions = {
    // @ts-ignore TODO
    connect: () => {},
    // @ts-ignore TODO
    sign: () => {},
  };

  return [data, action];
}

export default usePhantom;
