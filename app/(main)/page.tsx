'use client';

import { useAtom } from 'jotai';

import { ArrowUp, ChartSpline, Eye, EyeOff, Upload } from 'lucide-react';

import Link from 'next/link';

import { useBalance } from 'wagmi';

import { AccountCard } from '@/components/AccountCard';
import { AppHeader } from '@/components/AppHeader';
import { ComingSoonItem } from '@/components/ComingSoonItem';
import { EarnCard } from '@/components/EarnCard';
import { useCurrentWallet } from '@/hooks/useWallet';
import { formatNumber } from '@/lib/utils';
import { showBalanceAtom } from '@/state/showBalance';
import { Button } from '@/ui-components/Button';

const HomePage = () => {
  const { data: wallet } = useCurrentWallet();
  const [showBalance, setShowBalance] = useAtom(showBalanceAtom);

  const { data: balance, isLoading } = useBalance({
    address: '0x242d7e45f80287Aa0d1353403f9753E25Cc4d920',
  });

  return (
    <div className="flex flex-col h-full">
      <AppHeader />
      <div className="flex flex-col p-4">
        <div>
          <div className="flex gap-2 text-muted-foreground items-center">
            <div className="text-base">Total balance</div>
            <div onClick={() => setShowBalance(!showBalance)} className="cursor-pointer">
              {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
            </div>
          </div>
          <div className="mt-2 flex items-center text-4xl font-medium">
            {formatNumber(balance?.value, {
              prefix: '$ ',
              decimals: balance?.decimals,
              mantissa: 2,
              showBalance,
            })}
          </div>
          <div className="mt-4 flex gap-8">
            <div className="flex flex-col items-center">
              <Button asChild className="rounded-full h-12 w-12 p-2.5">
                <Link href="/deposit">
                  <Upload />
                </Link>
              </Button>
              Deposit
            </div>
            <div className="flex flex-col items-center">
              <Button asChild className="rounded-full h-12 w-12 p-2.5">
                <Link href="/activites">
                  <ChartSpline />
                </Link>
              </Button>
              Activities
            </div>
            <div className="flex flex-col items-center">
              <Button asChild className="rounded-full h-12 w-12 p-2.5">
                <Link href="/ustb">
                  <ArrowUp />
                </Link>
              </Button>
              USDC-USTB
            </div>
          </div>
        </div>
        <div className="mt-10">
          <AccountCard />
        </div>
        <div>
          <div className="mt-10 text-xl font-medium">Earn</div>
          <div className="space-y-2 mt-4">
            <EarnCard type="savings" />
            <EarnCard type="growth" />
            <EarnCard type="flexible" />
          </div>
        </div>
        <div>
          <div className="mt-10 text-xl font-medium">Coming Soon</div>
          <div className="flex justify-between mt-4">
            <ComingSoonItem variant="remittence" />
            <ComingSoonItem variant="payment" />
            <ComingSoonItem variant="loan" />
            <ComingSoonItem variant="stake" />
          </div>
        </div>
        <div className="flex justify-center items-center mt-40">
          <div className="text-muted-foreground">© 2004-2024 Tardis.com. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
