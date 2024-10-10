'use client';
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { w3sSDKAtom } from './w3s';

export const Updater = () => {
  const setW3sSDK = useSetAtom(w3sSDKAtom);

  useEffect(() => {
    const sdk = new W3SSdk();

    sdk.setAppSettings({ appId: process.env.NEXT_PUBLIC_APP_ID! });

    setW3sSDK({
      sdk,
      isAuth: false,
    });
  }, [setW3sSDK]);

  return null;
};
