'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAtomValue } from 'jotai';

import { fetchWallet } from '@/lib/queries';
import { userTokenAtom } from '@/state/userToken';

export const useCurrentWallet = (queryEnabled = false) => {
  const currentUser = useAtomValue(userTokenAtom);

  return useQuery({
    queryKey: ['wallet', currentUser?.userToken, currentUser?.userId],
    queryFn: ({ queryKey }) => {
      const [, userToken, userId] = queryKey;
      if (!userToken || !userId) throw new Error('User not logged in');
      return fetchWallet({ userToken, userId });
    },
    enabled: queryEnabled && !!(currentUser?.userToken && currentUser?.userId),
  });
};
