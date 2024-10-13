import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { usePublicClient } from 'wagmi';

import { useErc20Balance } from './useErc20Balance';
import { useCurrentWallet } from './useWallet';

import { getGrowthAmountEstimate } from '@/lib/execution';
import { growthBalanceAtom, positionBalanceAtom } from '@/state/balance';
import { planAtom } from '@/state/plan';

export const useWalletBalance = (enabled: boolean = false) => {
  const { data: wallet, isLoading, refetch: refetchWallet } = useCurrentWallet();
  const publicClient = usePublicClient();
  const plan = useAtomValue(planAtom);
  const { data: usdcBalance, refetch: refetchUSDC } = useErc20Balance('USDC', wallet?.address, {
    enabled,
  });
  const { data: ustbBalance, refetch: refetchUSTB } = useErc20Balance('USTB', wallet?.address, {
    enabled,
  });
  const [growthBalance, setGrowthBalance] = useAtom(growthBalanceAtom);
  const [positionBalance, setPositionBalance] = useAtom(positionBalanceAtom);
  const [sig, refetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!wallet?.address || !publicClient) return;

    getGrowthAmountEstimate(publicClient, wallet.address)
      .then((res) => {
        console.log('growth balance', res);
        setGrowthBalance(res.usdcAmount);
        setPositionBalance(res.positionBalance);
      })
      .catch((err) => {
        console.error(err);
        setGrowthBalance(BigInt(0));
        setPositionBalance(BigInt(0));
      });
  }, [wallet, publicClient, ustbBalance, plan, sig, setGrowthBalance, setPositionBalance]);

  const refetchBalance = useCallback(() => {
    refetch();
    refetchWallet();
    refetchUSDC();
    refetchUSTB();
  }, [refetchUSDC, refetchUSTB, refetchWallet]);

  return useMemo(() => {
    const savingsBalance = (ustbBalance || BigInt('0')) + (growthBalance || BigInt('0'));
    return {
      totalBalance: (usdcBalance || BigInt(0)) + (growthBalance || BigInt(0)) + (ustbBalance || BigInt(0)),
      currentBalance: usdcBalance,
      savingsBalance,
      positionBalance,
      ustbBalance,
      refetch: refetchBalance,
      walletLoading: isLoading,
    };
  }, [ustbBalance, growthBalance, usdcBalance, positionBalance, refetchBalance, isLoading]);
};
