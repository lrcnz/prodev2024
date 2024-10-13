'use client';
import { useAtom, useAtomValue } from 'jotai';

import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { parseUnits } from 'viem';

import { usePublicClient } from 'wagmi';

import { useUser } from '@/hooks/useUser';
import { useUserLogin } from '@/hooks/useUserLogin';
import { useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { getGrowthAmountEstimate } from '@/lib/execution';
import { fetchUserChallenge } from '@/lib/queries';
import { growthBalanceAtom, positionBalanceAtom } from '@/state/balance';
import { Updater } from '@/state/updater';
import { userIdAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';
import { Loading } from '@/ui-components/Loading';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { walletLoading, ustbBalance } = useWalletBalance(true);
  const userId = useAtomValue(userIdAtom);
  const { loginMutateAsync, loginMutation } = useUserLogin();
  const { data: wallet, refetch: refetchWallet } = useCurrentWallet(true);
  const { refetch: refetchUser } = useUser(false);
  const client = useAtomValue(w3sSDKAtom);
  const [, setGrowthBalance] = useAtom(growthBalanceAtom);
  const [, setPositionBalance] = useAtom(positionBalanceAtom);
  const isLoading = walletLoading || loginMutation?.isPending;
  const [debouncedLoading, setDebouncedLoading] = useState(false);
  const publicClient = usePublicClient();

  useDebounce(
    () => {
      setDebouncedLoading(isLoading);
    },
    50,
    [isLoading]
  );

  useEffect(() => {
    if (!wallet?.address || !publicClient) return;

    getGrowthAmountEstimate(publicClient, wallet.address)
      .then((res) => {
        setGrowthBalance(res.usdcAmount);
        setPositionBalance(res.positionBalance);
      })
      .catch((err) => {
        console.error(err);
        setGrowthBalance(BigInt(0));
        setPositionBalance(BigInt(0));
      });
  }, [wallet, publicClient, ustbBalance, setGrowthBalance, setPositionBalance]);

  useEffect(() => {
    if (!userId?.email || !userId?.password || client.isAuth) return;
    loginMutateAsync({ email: userId?.email, password: userId?.password });
  }, [client.isAuth, userId?.email, userId?.password, loginMutateAsync]);

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
      <Loading open={walletLoading || loginMutation.isPending || debouncedLoading} />
      <Updater />
      {children}
    </>
  );
}
