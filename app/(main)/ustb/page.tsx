'use client';

import { useAtomValue } from 'jotai';
import { X } from 'lucide-react';
import Link from 'next/link';

import { useState } from 'react';

import { useBalance, usePublicClient } from 'wagmi';

import { useContractExecution } from '@/hooks/useContractExecution';
import { useErc20Balance } from '@/hooks/useErc20Balance';
import { useCurrentWallet } from '@/hooks/useWallet';
import { depositSavingsContract, withdrawSavingsContract } from '@/lib/execution';
import { w3sSDKAtom } from '@/state/w3s';
import { Button } from '@/ui-components/Button';
import { Input } from '@/ui-components/Input';
import { Toast } from '@/ui-components/Toast';

const ActivitiesPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: wallet } = useCurrentWallet();
  const client = useAtomValue(w3sSDKAtom);

  const execution = useContractExecution();
  const publicClient = usePublicClient();

  const onDeposit = async () => {
    console.log('submit', amount);
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No address found');
    const contracts = await depositSavingsContract(publicClient, wallet?.address);
    console.log(contracts);
    const res = await execution(contracts);
    console.log(res);

    const current = Toast.show({
      content: 'loading',
      duration: 0,
      position: 'top',
    });
    client.sdk.execute(res.data.challengeId, (err, result) => {
      current.close();
      console.log(result);
      if (err) {
        Toast.show({
          content: err.message || 'Unknown error',
          icon: 'fail',
        });
      }

      Toast.show({
        content: 'Transaction sent',
        icon: 'success',
      });
    });
  };

  const onWithdraw = async () => {
    console.log('submit', amount);
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');
    const contracts = await withdrawSavingsContract(publicClient, wallet.address);
    console.log(contracts);
    const res = await execution(contracts);
    console.log(res);

    const current = Toast.show({
      content: 'loading',
      duration: 0,
      position: 'top',
    });
    client.sdk.execute(res.data.challengeId, (err, result) => {
      current.close();
      console.log(result);
      if (err) {
        Toast.show({
          content: err.message || 'Unknown error',
          icon: 'fail',
        });
      }

      Toast.show({
        content: 'Transaction sent',
        icon: 'success',
      });
    });
  };

  const { data: usdcBalance } = useErc20Balance('USDC', wallet?.address);
  const { data: ustbBalance } = useErc20Balance('USTB', wallet?.address);
  const { data: sepoliaETHBalance } = useBalance({
    address: wallet?.address as any,
    query: { enabled: !!wallet?.address },
  });

  return (
    <>
      <div className="flex flex-col h-full">
        <header className="h-14 flex justify-center items-center ">
          <div className="text-lg font-semibold relative w-full flex items-center justify-center">
            <div className="absolute left-4">
              <Link href="/">
                <X />
              </Link>
            </div>
          </div>
        </header>
        <div className="px-4 text-2xl font-medium">USTB</div>
        <div className="flex flex-col gap-12 p-4">
          <div>
            <Input placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>wallet address: {wallet?.address}</div>
          <div>sepoliaETHBalance balance: {sepoliaETHBalance?.value?.toString()}</div>
          <div>usdc balance: {usdcBalance?.toString()}</div>
          <div>ustb balance: {ustbBalance?.toString()}</div>
          <div>
            <Button className="w-full" onClick={onDeposit}>
              Deposit Amount
            </Button>
          </div>
          <div>
            <Button className="w-full" onClick={onWithdraw}>
              Withdraw All To USDC
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivitiesPage;
