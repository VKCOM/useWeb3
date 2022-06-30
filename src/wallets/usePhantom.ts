import { WalletHook } from './types';

// isAvailable
// https://docs.phantom.app/integrating/extension-and-in-app-browser-web-apps/detecting-the-provider

// TODO connect with deeplinks
// https://docs.phantom.app/integrating/deeplinks-ios-and-android

function usePhantom(): WalletHook {
  return [{}, {}];
}

export default usePhantom;
