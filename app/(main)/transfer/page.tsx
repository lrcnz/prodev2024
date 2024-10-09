'use client';

import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';

import { InnerHeader } from '@/components/InnerHeader';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { Button } from '@/ui-components/Button';
import { InputGroup } from '@/ui-components/InputGroup';
import { useTransfer } from '@/hooks/useTransfer';
import { Loading } from '@/ui-components/Loading';
import { parseUnits } from 'viem';
import { useRouter } from 'next/navigation';

const TransferPage = () => {
  const [transferAmount, setTransferAmount] = useState('0');
  const { savingsBalance, currentBalance } = useWalletBalance();
  const formatBalance = useFormatBalance();
  const [fromAccount, setFromAccount] = useState<'savings' | 'spending'>('savings');

  const { transferToSavings,transferToSpending,loading} = useTransfer(false)  
  const router = useRouter();

  const maximum = formatBalance(fromAccount === 'savings' ? savingsBalance : currentBalance, { decimals: 6 }) || '0';
  const handleMaximise = () => {
    setTransferAmount(maximum);
  };
  const handleExchange = () => {
    setFromAccount(fromAccount === 'savings' ? 'spending' : 'savings');
  };
  console.log('fromAccount', fromAccount);

  const handleTransfer = () => {
    if(!transferAmount) return;
    const amount = parseUnits(transferAmount, 6);
    if(fromAccount === 'savings') {
      transferToSpending(() => {
        router.push('/transfer/success');
      }, amount)
    }
    if(fromAccount === 'spending') {
      transferToSavings(() => {
        router.push('/transfer/success');
      }, amount)
    }
  };

  return (
    <>
      <Loading open={loading} />
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
            <InputGroup className="h-12 text-xl w-full font-normal" value={fromAccount === 'savings' ? 'Savings Account' : 'Spending Card' } inputReadonly={true} />
          </div>
          <button className="self-center mt-2" onClick={handleExchange}>
            <ArrowDownUp size={30} />
          </button>
          <div className="relative -top-4">
            <label className="mb-2 text-sm text-gray-400">To</label>
            <InputGroup className="h-12 text-xl w-full font-normal" value={fromAccount === 'savings' ?  'Spending Card' : 'Savings Account' } inputReadonly={true} />
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
