import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { useAtom, useAtomValue } from 'jotai';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';
import { parseUnits } from 'viem';
import { usePublicClient } from 'wagmi';

import GrowthImg from '@/assets/earn/growth.png';
import SavingsImg from '@/assets/earn/savings.png';
import { useContractExecution } from '@/hooks/useContractExecution';
import { useCurrentWallet } from '@/hooks/useWallet';
import { depositSavingsContract, withdrawSavingsContract } from '@/lib/execution';
import { delay } from '@/lib/utils';
import { planAtom, switchPlanModalOpenedAtom } from '@/state/plan';
import { w3sSDKAtom } from '@/state/w3s';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/ui-components/AlertDialog';

import { AlertDialogFooter, AlertDialogHeader } from '@/ui-components/AlertDialog';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

export const SwitchPlanModal = () => {
  const [plan, setPlan] = useAtom(planAtom);
  const [opened, setModal] = useAtom(switchPlanModalOpenedAtom);
  const { data: wallet } = useCurrentWallet();
  const client = useAtomValue(w3sSDKAtom);
  const [loading, setLoading] = useState(false);

  const execution = useContractExecution();
  const publicClient = usePublicClient();

  const growth = (
    <div className="rounded-2xl bg-[#F7F9C6] flex flex-col px-4 py-6 justify-center items-center gap-1.5">
      <div>
        <Image className="h-8 w-8" alt="savings" src={SavingsImg} />
      </div>
      <div className="text-sm">Growth</div>
      <div className="text-sm font-semibold">7.73% APY</div>
    </div>
  );

  const savings = (
    <div className="rounded-2xl bg-[#E4F2F1] flex flex-col px-4 py-6 justify-center items-center gap-1.5">
      <div>
        <Image className="h-8 w-8" alt="growth" src={GrowthImg} />
      </div>
      <div className="text-sm">Savings</div>
      <div className="text-sm font-semibold">5.13% APY</div>
    </div>
  );

  const saving = async () => {
    if (!client.sdk) throw new Error('No client found');
    if (!publicClient) throw new Error('No public client found');
    if (!wallet?.address) throw new Error('No wallet address found');
    try {
      setLoading(true);
      const withdrawContracts = await withdrawSavingsContract(publicClient, wallet.address);
      const depositContracts = await depositSavingsContract(publicClient, wallet.address);
      const res = await execution(withdrawContracts.concat(depositContracts as any));

      client.sdk.execute(res.data.challengeId, async (err, result) => {
        if (err) {
          setLoading(false);

          Toast.show({
            content: 'Transaction failed',
            icon: 'error',
          });

          return;
        }

        await delay(2000);
        setLoading(false);

        Toast.show({
          content: 'Operation Successful',
          icon: 'success',
        });
        setPlan(plan === 'growth' ? 'savings' : 'growth');
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        content: 'unknown error',
        icon: 'error',
      });
    }
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = async () => {
    await saving();

    setModal(false);
  };

  return (
    <>
      <Loading open={loading} />
      <AlertDialog open={opened}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <VisuallyHidden>
              <AlertDialogTitle>Switch Plan</AlertDialogTitle>
              <AlertDialogDescription>Confirm your new Earn plan</AlertDialogDescription>
            </VisuallyHidden>
          </AlertDialogHeader>
          <div className="flex justify-center items-center gap-8">
            {plan === 'growth' ? growth : savings}
            <div>
              <ArrowRight />
            </div>
            {plan === 'savings' ? growth : savings}
          </div>
          <div className="mt-3 text-center text-muted-foreground">Confirm your new Earn plan</div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
