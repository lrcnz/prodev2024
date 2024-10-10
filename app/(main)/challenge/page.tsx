'use client';

import { useAtom } from 'jotai';

import { useAtomValue } from 'jotai';
import { ArrowRight, CircleCheck } from 'lucide-react';

import { useState } from 'react';
import { arbitrumSepolia } from 'viem/chains';
import { usePublicClient } from 'wagmi';

import { useContractExecution } from '@/hooks/useContractExecution';
import { useCurrentWallet } from '@/hooks/useWallet';
import { receiveContract, sendContracts } from '@/lib/cctp';
import { delay } from '@/lib/utils';
import { planAtom } from '@/state/plan';
import { userTokenAtom } from '@/state/userToken';
import { w3sSDKAtom } from '@/state/w3s';
import { Button } from '@/ui-components/Button';

import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const Page = () => {
  const { data: wallet } = useCurrentWallet();
  const client = useAtomValue(w3sSDKAtom);
  const [loading, setLoading] = useState(false);

  const execution = useContractExecution();
  const publicClient = usePublicClient();
  const arbPublicClient = usePublicClient({
    chainId: arbitrumSepolia.id,
  });

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

  // const submit = async () => {
  //   if (!wallet?.address) return;
  //   if (!publicClient) return;
  //   const contracts = await sendContracts(publicClient, 'ETH_SEPOLIA', wallet.address);
  //   const res = await execution(contracts);

  //   execute(() => {
  //     console.log('success');
  //   }, res.data.challengeId);
  // };
  const submit = async () => {
    if (!wallet?.address) return;
    if (!arbPublicClient) return;
    const contracts = await receiveContract(arbPublicClient, 'ARB_SEPOLIA', wallet.address);
    const res = await execution(contracts);

    execute(() => {
      console.log('success');
    }, res.data.challengeId);
  };

  return (
    <>
      <Loading open={loading} />
      <div className="flex flex-col h-full">
        <div className="flex justify-center flex-col items-center flex-1">
          <div>
            <CircleCheck color="#ffffff" fill="#0073C3" size="96" />
          </div>
          <div className="text-2xl font-semibold mt-4">Created Successfully</div>
          <div className="mt-1 mx-8 text-center text-muted-foreground">
            Your saving account is now active and ready to use.
          </div>
          <div className="mt-4 p-4 ">
            <Button className="mt-4 rounded-full" onClick={submit}>
              Continue
              <ArrowRight size="16" className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
