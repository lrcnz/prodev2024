'use client';

import { useAtomValue } from 'jotai';
import { ArrowDownUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { formatUnits, parseUnits } from 'viem';

import { InnerHeader } from '@/components/InnerHeader';
import { useTransfer } from '@/hooks/useTransfer';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { planAtom } from '@/state/plan';
import { Button } from '@/ui-components/Button';
import { ErrorAlert } from '@/ui-components/ErrorAlert';
import { InputGroup } from '@/ui-components/InputGroup';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const TransferPage = () => {
  const [transferAmount, setTransferAmount] = useState('0');
  const plan = useAtomValue(planAtom);
  const { savingsBalance, currentBalance } = useWalletBalance();
  const [fromAccount, setFromAccount] = useState<'savings' | 'spending'>('savings');

  const { transferToSavings, transferToSpending, loading } = useTransfer(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const maximum = formatUnits((fromAccount === 'savings' ? savingsBalance : currentBalance) || BigInt(0), 6);
  const handleMaximise = () => {
    setTransferAmount(maximum);
  };
  const handleExchange = () => {
    setFromAccount(fromAccount === 'savings' ? 'spending' : 'savings');
  };

  const handleTransfer = () => {
    if (!transferAmount) return;
    if (plan === 'growth') {
      setErrorMsg(
        'Transfer from Growth plan is not well tested, please first switch to Savings plan then attemp Transfer'
      );
      return;
    }
    const amount = parseUnits(transferAmount, 6);
    if (fromAccount === 'savings') {
      if (!savingsBalance || amount > savingsBalance) {
        Toast.show({
          content: 'Insufficient balance',
          icon: 'fail',
        });
        return;
      }
      transferToSpending(() => {
        router.push('/transfer/success');
      }, amount);
    }
    if (fromAccount === 'spending') {
      if (!currentBalance || amount > currentBalance) {
        Toast.show({
          content: 'Insufficient balance',
          icon: 'fail',
        });
        return;
      }
      transferToSavings(() => {
        router.push('/transfer/success');
      }, amount);
    }
  };

  return (
    <>
      <Loading open={loading} />
      <ErrorAlert title="" message={errorMsg} open={!!errorMsg} onClose={() => setErrorMsg(null)} />
      <div className="flex flex-col h-full">
        <InnerHeader title="Transfer" />
        <div className="flex flex-col h-full p-4">
          <div>
            <label className="mb-2 text-sm text-gray-400">Transfer Amount</label>
            <InputGroup
              className="h-12 text-xl w-full font-medium"
              value={transferAmount}
              onChange={(value) => setTransferAmount(value)}
              postfix={
                <button className="text-secondary" onClick={handleMaximise}>
                  MAX
                </button>
              }
            />
            <p className="mt-2 text-sm text-gray-400">
              Balance: <span className="font-semibold">{maximum}</span>
            </p>
          </div>
          <div className="mt-10">
            <label className="mb-2 text-sm text-gray-400">From</label>
            <InputGroup
              className="h-12 text-xl w-full font-normal"
              value={fromAccount === 'savings' ? 'Savings Account' : 'Spending Card'}
              inputReadonly={true}
            />
          </div>
          <div className="self-center mt-4" onClick={handleExchange}>
            <ArrowDownUp size={30} />
          </div>
          <div className="relative mt-1">
            <label className="mb-2 text-sm text-gray-400">To</label>
            <InputGroup
              className="h-12 text-xl w-full font-normal"
              value={fromAccount === 'savings' ? 'Spending Card' : 'Savings Account'}
              inputReadonly={true}
            />
          </div>
          <div className="flex items-center mt-4 flex-col-reverse">
            <Button className="text-lg w-full h-12 rounded-full" onClick={handleTransfer}>
              Transfer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPage;
