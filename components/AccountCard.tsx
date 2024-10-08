import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import SavingAccountBg from '@/assets/saving_account_bg.png';
import SavingChartBg from '@/assets/saving_chart.png';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { cn } from '@/lib/utils';
import { Button } from '@/ui-components/Button';

export const AccountCard = ({ balance, className }: { balance?: bigint | number | string; className?: string }) => {
  const [expended, setExpended] = useState<'saving' | 'current' | 'spending'>();

  const { data: wallet } = useCurrentWallet();
  const formatBalance = useFormatBalance();
  const { currentBalance, savingsBalance } = useWalletBalance(false);

  return (
    <div className={cn('', className)}>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient1 min-h-16 relative z-10')}>
        <div className="flex justify-between">
          <div className="text-sm font-semibold">Savings account</div>
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
              <Button className="rounded-full h-12 w-12 p-2.5">
                <Link href="/signup">
                  <Plus />
                </Link>
              </Button>
              Create Account
            </div>
          )}
        </div>
      </div>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient2 h-16 relative z-20', '-mt-8')}>
        <div className="flex justify-between">
          <div className="text-sm font-semibold">Current Account</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground translate-y-[0.5px]">Balance</div>
            <div className="text-sm">{formatBalance(currentBalance, { decimals: 6, postfix: ' USDC' })}</div>
          </div>
        </div>
      </div>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient3 h-16 relative z-30', '-mt-8 max-h-10 overflow-hidden')}>
        <div className="flex justify-between">
          <div className="text-sm font-semibold">Spending Card</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground translate-y-[1px]">Linked</div>
            <div className="text-sm">
              {formatBalance(currentBalance, { prefix: 'Spend up to ', decimals: 6, postfix: ' USDC' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
