'use client';

import { useAtomValue } from 'jotai';

import { useState } from 'react';
import { type Address } from 'viem';
import { usePublicClient } from 'wagmi';

import { useContractExecution } from '@/hooks/useContractExecution';
import { useCurrentWallet } from '@/hooks/useWallet';
import { ERC20_ABI } from '@/lib/abis/erc20';
import { SHORT_MARKET_ABI } from '@/lib/abis/short-market';
import { MOCK_SHORT_MARKET, UNI_WETH_ADDRESS } from '@/lib/contracts';
import { delay } from '@/lib/utils';
import { w3sSDKAtom } from '@/state/w3s';
import { Button } from '@/ui-components/Button';

import { Toast } from '@/ui-components/Toast';

const Page = () => {
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

      Toast.show({
        content: 'Operation Successful',
        icon: 'success',
      });

      callback();
    });
  };

  const closePosition = async () => {
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');

    try {
      setLoading(true);
      let contracts: any[] = [];

      contracts = contracts.concat([
        {
          address: MOCK_SHORT_MARKET,
          abi: SHORT_MARKET_ABI,
          functionName: 'closePosition',
          args: [UNI_WETH_ADDRESS, wallet.address],
        },
      ]);

      const res = await execution(contracts);

      execute(() => {}, res.data.challengeId);
    } catch (error) {
      setLoading(false);
      console.error(error);
      Toast.show({
        content: 'Unknown error',
        icon: 'fail',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="mt-auto p-4">
          <Button className="rounded-3xl h-12 w-full text-lg" onClick={closePosition}>
            Close Position
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
