import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { parseUnits } from 'viem';
import { usePublicClient } from 'wagmi';

import { useErc20Balance } from './useErc20Balance';
import { useCurrentWallet } from './useWallet';

import { getGrowthAmountEstimate } from '@/lib/execution';
import { growthBalanceAtom } from '@/state/balance';
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
  const [sig, refetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!wallet?.address || !publicClient) return;

    getGrowthAmountEstimate(publicClient, wallet.address)
      .then((res) => {
        setGrowthBalance(res.trade ? parseUnits(res.trade.outputAmount.toSignificant(), 6) : BigInt(0));
      })
      .catch((err) => {
        console.error(err);
        setGrowthBalance(BigInt(0));
      });
  }, [wallet, publicClient, ustbBalance, plan, sig, setGrowthBalance, ustbBalance]);

  const refetchBalance = useCallback(() => {
    refetch();
    refetchWallet();
    refetchUSDC();
    refetchUSTB();
  }, [refetchUSDC, refetchUSTB, refetchWallet]);

  return useMemo(() => {
    const savingsBalance = plan === 'savings' ? ustbBalance : growthBalance;
    return {
      totalBalance: (usdcBalance || BigInt(0)) + (growthBalance || BigInt(0)) + (ustbBalance || BigInt(0)),
      currentBalance: usdcBalance,
      savingsBalance,
      ustbBalance,
      refetch: refetchBalance,
      walletLoading: isLoading,
    };
  }, [plan, ustbBalance, usdcBalance, growthBalance, isLoading, refetchBalance]);
};
