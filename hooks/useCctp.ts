import { useAtomValue } from 'jotai';

import { useState } from 'react';
import { arbitrumSepolia } from 'viem/chains';
import { usePublicClient } from 'wagmi';

import { useArbContractExecution } from './useArbContractExecution';

import { useContractExecution } from '@/hooks/useContractExecution';
import { useArbWallet, useCurrentWallet } from '@/hooks/useWallet';
import { receiveContract, sendContracts } from '@/lib/cctp';
import { delay } from '@/lib/utils';
import { w3sSDKAtom } from '@/state/w3s';

import { Toast } from '@/ui-components/Toast';

const Page = () => {
  const { data: wallet } = useCurrentWallet();
  const client = useAtomValue(w3sSDKAtom);
  const [loading, setLoading] = useState(false);

  const execution = useContractExecution();
  const arbExecution = useArbContractExecution();
  const publicClient = usePublicClient();
  const arbPublicClient = usePublicClient({
    chainId: arbitrumSepolia.id,
  });

  const execute = async (callback: (err: any, res: any) => void, challengeId: string) => {
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

      callback(err, result);
    });
  };

  const submitCctp = async (callback: (id: string, err: any, res: any) => void, amount: bigint) => {
    if (!wallet?.address) return;
    if (!publicClient) return;

    try {
      setLoading(true);
      const contracts = await sendContracts('ARB_SEPOLIA', wallet.address, amount);
      const res = await arbExecution(contracts);
      const chllengeId = res.data.challengeId;
      execute((err, res) => callback(chllengeId, err, res), chllengeId);
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };

  const receiveCctp = async (callback: (err: any, res: any) => void, message: string, attestation: string) => {
    if (!wallet?.address) return;
    if (!arbPublicClient) return;
    try {
      setLoading(true);
      const contracts = await receiveContract('ETH_SEPOLIA', message, attestation);
      const res = await execution(contracts);

      execute(callback, res.data.challengeId);
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    submitCctp,
    receiveCctp,
    loading,
  };
};

export default Page;
