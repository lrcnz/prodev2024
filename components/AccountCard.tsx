import { useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CardIcon from '@/assets/icons/Card';
import PigIcon from '@/assets/icons/Pig';
import SavingAccountBg from '@/assets/saving_account_bg.png';
import SavingChartBg from '@/assets/saving_chart.png';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { cn } from '@/lib/utils';
import { kycAtom } from '@/state/kyc';
import { Button } from '@/ui-components/Button';

export const AccountCard = ({ balance, className }: { balance?: bigint | number | string; className?: string }) => {
  const { data: wallet } = useCurrentWallet();
  const formatBalance = useFormatBalance();
  const kyc = useAtomValue(kycAtom);
  const { currentBalance, savingsBalance } = useWalletBalance(false);

  return (
    <div className={cn('', className)}>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient1 min-h-16 relative z-10')}>
        <div className="flex justify-between">
          <div className="flex">
            <PigIcon className="mt-0.5 mr-2" />
            <div className="text-sm font-semibold">Savings account</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground translate-y-[1px]">Balance</div>
            <div className="text-sm">{formatBalance(savingsBalance, { decimals: 6, postfix: ' USDC' })}</div>
          </div>
        </div>
        <div className="mb-8 h-[132px] flex justify-center flex-col">
          {wallet?.address ? (
            <div className="absolute mt-4 mx-3 z-10">
              <Image src={SavingChartBg} alt="saving account" />
            </div>
          ) : (
            <div className="absolute mx-10 z-10">
              <Image src={SavingAccountBg} alt="saving account" />
            </div>
          )}
          {!wallet?.address && (
            <div className="flex flex-col items-center relative z-[11]">
              <Button className="bg-foreground rounded-full h-12 w-12 p-2.5 hover:bg-foreground/90">
                <Link href="/welcome">
                  <Plus />
                </Link>
              </Button>
              Sign up / Log in
            </div>
          )}
        </div>
      </div>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient2 h-16 relative z-30', '-mt-8 max-h-10 overflow-hidden')}>
        <div className="flex justify-between items-center">
          <div className="flex">
            <CardIcon className="mt-0.5 mr-2" />
            <div className="text-sm font-semibold">Spending Card</div>
          </div>
          <div className="flex items-center gap-2">
            {!wallet?.address ? (
              '--'
            ) : kyc ? (
              <>
                <div className="text-xs text-muted-foreground translate-y-[1px]">Balance</div>
                <div className="text-sm">{formatBalance(currentBalance, { decimals: 6, postfix: ' USDC' })}</div>
              </>
            ) : (
              <div>
                <Button className="h-6 py-0.5 text-xs rounded-lg bg-foreground hover:bg-foreground/80" asChild>
                  <Link href="/kyc">Verify</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
