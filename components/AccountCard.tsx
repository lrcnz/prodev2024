import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import SavingAccountBg from '@/assets/saving_account_bg.png';
import { useCurrentWallet } from '@/hooks/useWallet';
import { cn } from '@/lib/utils';
import { Button } from '@/ui-components/Button';

export const AccountCard = ({ balance, className }: { balance?: bigint | number | string; className?: string }) => {
  const [expended, setExpended] = useState<'saving' | 'current' | 'spending'>();
  const { data: wallet } = useCurrentWallet();
  return (
    <div className={cn('', className)}>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient1 min-h-16 relative z-10')}>
        <div className="flex justify-between">
          <div className="text-sm font-semibold">Savings account</div>
          <div className="text-sm">
            <div className="text-muted-foreground">Balance</div>
            <div>{balance}</div>
          </div>
        </div>
        <div className="mb-8 h-[160px] flex justify-center flex-col">
          <div className="absolute mx-10 z-10">
            <Image src={SavingAccountBg} alt="saving account" />
          </div>
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
          <div className="text-sm font-semibold">Current account</div>
          <div className="text-sm">
            <div className="text-muted-foreground">Balance</div>
            <div>{balance}</div>
          </div>
        </div>
      </div>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient3 h-16 relative z-30', '-mt-8 max-h-10 overflow-hidden')}>
        <div className="flex justify-between">
          <div className="text-sm font-semibold">Spending account</div>
          <div className="text-sm">
            <div className="text-muted-foreground">Balance</div>
            <div>{balance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
