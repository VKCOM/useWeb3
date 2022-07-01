import {useEffect, useState} from 'react';

import 'fast-text-encoding';
import strings from '../strings';
import {WalletActions, WalletData, WalletHook, WalletId} from '../types';

import {PhantomProvider} from './types';
import {getProvider} from './utils';

// isAvailable
// https://docs.phantom.app/integrating/extension-and-in-app-browser-web-apps/detecting-the-provider

// TODO connect with deeplinks
// https://docs.phantom.app/integrating/deeplinks-ios-and-android

function usePhantom(): WalletHook {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);
  const [account, setAccount] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const _provider = getProvider();
    setProvider(_provider);
  }, []);

  const isAvailable = provider !== undefined;

  const data: WalletData = {
    walletId: WalletId.Phantom,
    isAvailable,
    account,
    isAuthenticated,
  };

  const actions: WalletActions = {
    // @ts-ignore TODO
    connect: async () => {
      if (provider === undefined) {
        throw new Error(strings.EXC_MSG_TRYING_TO_CONNECT_WHEN_PROVIDER_NOT_AVAILABLE);
      }
      const connectionResp = await provider.connect();
      const account = connectionResp.publicKey?.toString() || null;
      setAccount(account);
      setIsAuthenticated(account !== null);
      return account;
    },
    // @ts-ignore TODO
    sign: async (msg) => {
      if (provider === undefined) {
        throw new Error(strings.EXC_MSG_TRYING_TO_SIGN_WHEN_PROVIDER_NOT_AVAILABLE);
      }
      const encodedMessage = new TextEncoder().encode(msg);
      const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
      // TODO: maybe signature formatting is required
      return signedMessage;
    },
  };

  return [data, actions];
}

export default usePhantom;
