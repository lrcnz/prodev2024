import { useAtom, useAtomValue } from 'jotai';

import { useState } from 'react';
import { parseUnits, type Address } from 'viem';
import { usePublicClient } from 'wagmi';

import { useContractExecution } from '@/hooks/useContractExecution';
import { useCurrentWallet } from '@/hooks/useWallet';
import { ERC20_ABI } from '@/lib/abis/erc20';
import { USDC_ADDRESS, USTB_ADDRESS } from '@/lib/contracts';
import {
  depositGrowthContract,
  depositSavingsContract,
  getGrowthAmountEstimate,
  withdrawGrowthContract,
  withdrawSavingsContract,
} from '@/lib/execution';
import { delay } from '@/lib/utils';
import { planAtom } from '@/state/plan';
import { w3sSDKAtom } from '@/state/w3s';

import { Toast } from '@/ui-components/Toast';

export const useTransfer = (showSuccess = true) => {
  const [plan, setPlan] = useAtom(planAtom);
  const { data: wallet } = useCurrentWallet();
  const client = useAtomValue(w3sSDKAtom);
  const [loading, setLoading] = useState(false);

  const execution = useContractExecution();
  const publicClient = usePublicClient();

  const getErc20Balance = (tokenAddress: string) => {
    if (!wallet?.address) throw new Error('No wallet address found');
    if (!publicClient) throw new Error('No public client found');
    return publicClient.readContract({
      address: tokenAddress as Address,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [wallet.address as any],
    });
  };

  const execute = async (callback: () => void, challengeId: string) => {
    if (!client.sdk) throw new Error('No client found');
    client.sdk.execute(challengeId, async (err, result) => {
      if (err) {
        setLoading(false);

        Toast.show({
          content: err.message || 'Unknown error',
          icon: 'fail',
        });

        return;
      }

      await delay(2000);
      setLoading(false);

      if (showSuccess) {
        Toast.show({
          content: 'Operation Successful',
          icon: 'success',
        });
      }

      callback();
    });
  };

  const transferToSavings = async (callback: () => void, amount?: bigint) => {
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');

    try {
      setLoading(true);
      const maxAmount = await getErc20Balance(USDC_ADDRESS);

      if (amount && amount > maxAmount) {
        Toast.show({
          content: 'Insufficient balance',
          icon: 'fail',
        });
        return;
      }

      if (!amount) {
        amount = maxAmount;
      }

      console.log('to savings', amount);

      const contracts: any[] = [];

      if (plan === 'savings') {
        contracts.push(...(await depositSavingsContract(publicClient, wallet.address, amount)));
      }

      if (plan === 'growth') {
        const { usdcAmount } = await getGrowthAmountEstimate(publicClient, wallet.address);

        contracts.push(...(await withdrawGrowthContract(publicClient, wallet.address)));
        contracts.push(...(await depositGrowthContract(publicClient, wallet.address, usdcAmount + amount)));
      }

      const res = await execution(contracts);

      execute(callback, res.data.challengeId);
    } catch (error) {
      setLoading(false);
      console.error(error);
      Toast.show({
        content: 'Unknown error',
        icon: 'fail',
      });
    }
  };

  const transferToSpending = async (callback: () => void, amount?: bigint) => {
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');

    try {
      setLoading(true);
      let maxAmount = BigInt(0);
      if (plan === 'savings') {
        maxAmount = await getErc20Balance(USTB_ADDRESS);
      }
      if (plan === 'growth') {
        const { usdcAmount } = await getGrowthAmountEstimate(publicClient, wallet.address);
        maxAmount = usdcAmount;
      }

      if (amount && amount > maxAmount) {
        Toast.show({
          content: 'Insufficient balance',
          icon: 'fail',
        });
        setLoading(false);
        return;
      }

      if (!amount) {
        amount = maxAmount;
      }

      const contracts: any[] = [];

      if (plan === 'savings') {
        contracts.push(...(await withdrawSavingsContract(publicClient, wallet.address, amount)));
      }

      if (plan === 'growth') {
        const { usdcAmount } = await getGrowthAmountEstimate(publicClient, wallet.address);
        console.log('total', usdcAmount);
        console.log('to growth', usdcAmount - amount);
        contracts.push(...(await withdrawGrowthContract(publicClient, wallet.address)));
        if (usdcAmount > amount) {
          contracts.push(...(await depositGrowthContract(publicClient, wallet.address, usdcAmount - amount)));
        }
      }

      const res = await execution(contracts);

      execute(callback, res.data.challengeId);
    } catch (error) {
      setLoading(false);
      console.error(error);
      Toast.show({
        content: 'Unknown error',
        icon: 'fail',
      });
    }
  };

  const switchPlan = async (callback: () => void) => {
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');

    try {
      setLoading(true);
      const contracts: any[] = [];

      if (plan === 'savings') {
        const amount = await getErc20Balance(USTB_ADDRESS);
        console.log('to growth', amount);
        if (amount) {
          contracts.push(...(await withdrawSavingsContract(publicClient, wallet.address, amount)));
          contracts.push(...(await depositGrowthContract(publicClient, wallet.address, amount)));
        }
      }

      if (plan === 'growth') {
        const { usdcAmount } = await getGrowthAmountEstimate(publicClient, wallet.address);
        console.log('to savings', usdcAmount);
        if (usdcAmount) {
          contracts.push(...(await withdrawGrowthContract(publicClient, wallet.address)));
          contracts.push(...(await depositSavingsContract(publicClient, wallet.address, usdcAmount)));
        }
      }

      if (contracts.length === 0) {
        Toast.show({
          content: 'Operation Successful',
          icon: 'success',
        });
        callback();
        setLoading(false);
      } else {
        const res = await execution(contracts);

        execute(callback, res.data.challengeId);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Toast.show({
        content: 'Unknown error',
        icon: 'fail',
      });
    }
  };

  return {
    transferToSavings,
    transferToSpending,
    switchPlan,
    loading,
  };
};
