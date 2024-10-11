'use client';
import { useQuery } from '@tanstack/react-query';

import { useAtomValue } from 'jotai';

import { fetchWallet } from '@/lib/queries';
import { userTokenAtom } from '@/state/userToken';

export const useCurrentWallet = (queryEnabled = false) => {
  const currentUser = useAtomValue(userTokenAtom);

  return useQuery({
    queryKey: ['wallet', currentUser?.userToken, currentUser?.userId],
    queryFn: async ({ queryKey }) => {
      const [, userToken, userId] = queryKey;
      if (!userToken || !userId) throw new Error('User not logged in');
      const result = await fetchWallet({ userToken, userId });
      return result?.find((wallet) => wallet.blockchain === 'ETH-SEPOLIA');
    },
    enabled: queryEnabled && !!(currentUser?.userToken && currentUser?.userId),
  });
};

export const useArbWallet = (queryEnabled = false) => {
  const currentUser = useAtomValue(userTokenAtom);

  return useQuery({
    queryKey: ['wallet-arb', currentUser?.userToken, currentUser?.userId],
    queryFn: async ({ queryKey }) => {
      const [, userToken, userId] = queryKey;
      if (!userToken || !userId) throw new Error('User not logged in');
      const result = await fetchWallet({ userToken, userId });
      return result?.find((wallet) => wallet.blockchain === 'ARB-SEPOLIA');
    },
    enabled: queryEnabled && !!(currentUser?.userToken && currentUser?.userId),
  });
};
