'use client';
import { useAtomValue } from 'jotai';

import { useEffect } from 'react';

import { useUser } from '@/hooks/useUser';
import { useUserLogin } from '@/hooks/useUserLogin';
import { useCurrentWallet } from '@/hooks/useWallet';
import { fetchUserChallenge } from '@/lib/queries';
import { Updater } from '@/state/updater';
import { userTokenAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const userToken = useAtomValue(userTokenAtom);
  const [login] = useUserLogin();
  const { refetch: refetchWallet } = useCurrentWallet(true);
  const { refetch: refetchUser } = useUser(false);
  const client = useAtomValue(w3sSDKAtom);

  useEffect(() => {
    if (userToken) {
      login(userToken);
    }
  }, [login, userToken]);

  useEffect(() => {
    if (client.isAuth && client.sdk) {
      refetchUser().then((res) => {
        if (res.data && (res.data?.securityQuestionStatus !== 'ENABLED' || res.data?.pinStatus !== 'ENABLED')) {
          fetchUserChallenge({ userId: res.data.id }).then((res) => {
            if (res.challengeId) {
              client.sdk!.execute(res.challengeId, (err, res) => {
                console.log(err, res);
                if (err) {
                  console.error(err);
                  return;
                }
                refetchWallet();
              });
            }
          });
        }
      });
    }
  }, [client.isAuth, client.sdk, refetchUser, refetchWallet]);

  return (
    <>
      <Updater />
      {children}
    </>
  );
}
