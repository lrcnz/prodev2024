import { useMutation } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { useCallback, useMemo } from 'react';

import { userIdAtom, userTokenAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';

const loginFn = async (data: { email: string; password: string }) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
};

const signupFn = async (data: { email: string; password: string }) => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const useUserLogin = () => {
  const [client, setClient] = useAtom(w3sSDKAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setUserToken = useSetAtom(userTokenAtom);

  const login = useCallback(
    (user: { userId: string; encryptionKey: string; userToken: string; email: string; password: string }) => {
      if (!client.sdk) throw new Error('W3S SDK not initialized');
      client.sdk.setAuthentication({
        userToken: user.userToken,
        encryptionKey: user.encryptionKey,
      });
      setUserToken({
        userId: user.userId,
        encryptionKey: user.encryptionKey,
        userToken: user.userToken,
      });
      setUserId({
        userId: user.userId,
        email: user.email,
        password: user.password,
      });
      setClient({
        sdk: client.sdk,
        isAuth: true,
      });
    },
    [client.sdk, setUserToken, setUserId, setClient]
  );

  const logout = useCallback(() => {
    if (!client.sdk) throw new Error('W3S SDK not initialized');
    setUserId(null);
    setUserToken(null);
    client.sdk.setAuthentication({
      userToken: '',
      encryptionKey: '',
    });
  }, [client.sdk, setUserId, setUserToken]);

  const onSuccess = useCallback(
    (res: any, variables: any) => {
      if (res.result) {
        login({
          userId: res.result.userId,
          userToken: res.result.userToken,
          encryptionKey: res.result.encryptionKey,
          email: variables.email,
          password: variables.password,
        });
      }
    },
    [login]
  );

  const signupMutation = useMutation({
    mutationFn: signupFn,
    onSuccess,
  });

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess,
  });

  return useMemo(
    () => ({ login, logout, signupMutation, loginMutation, loginMutateAsync: loginMutation.mutateAsync }) as const,
    [login, loginMutation, logout, signupMutation]
  );
};
