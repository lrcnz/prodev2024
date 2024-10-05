import { useAtom, useSetAtom } from 'jotai';

import { useCallback, useMemo } from 'react';

import { userTokenAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';

export const useUserLogin = () => {
  const [client, setClient] = useAtom(w3sSDKAtom);
  const setUserToken = useSetAtom(userTokenAtom);

  const login = useCallback(
    (user: { userId: string; encryptionKey: string; userToken: string }) => {
      if (!client.sdk) throw new Error('W3S SDK not initialized');
      client.sdk.setAuthentication({
        userToken: user.userToken,
        encryptionKey: user.encryptionKey,
      });
      setUserToken(user);
      setClient({
        sdk: client.sdk,
        isAuth: true,
      });
    },
    [client, setUserToken, setClient]
  );

  const logout = useCallback(() => {
    if (!client.sdk) throw new Error('W3S SDK not initialized');
    setUserToken(null);
    client.sdk.setAuthentication({
      userToken: '',
      encryptionKey: '',
    });
  }, [setUserToken, client]);

  return useMemo(() => [login, logout] as const, [login, logout]);
};
