'use client';

import { useAtom } from 'jotai';

import { Eye, EyeOff } from 'lucide-react';

import ComingSoonIcon from '@/assets/icons/ComingSoon';
import StarIcon from '@/assets/icons/Star';
import { AccountCard } from '@/components/AccountCard';
import { AppHeader } from '@/components/AppHeader';
import { ComingSoonItem } from '@/components/ComingSoonItem';
import { EarnCardWrapper } from '@/components/EarnCardWrapper';
import { Shortcuts } from '@/components/Shortcuts';
import { SwitchPlanModal } from '@/components/SwitchPlanModal';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { showBalanceAtom } from '@/state/showBalance';

const HomePage = () => {
  const [showBalance, setShowBalance] = useAtom(showBalanceAtom);
  const formatBalance = useFormatBalance();
  const { totalBalance } = useWalletBalance();
  const { data: wallet } = useCurrentWallet();

  return (
    <>
      <SwitchPlanModal />
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
              {wallet?.address ? formatBalance(totalBalance, { decimals: 6, prefix: '$ ', mantissa: 2 }) : '--'}
            </div>
          </div>
          <div className="mt-6">
            <AccountCard />
          </div>
          <div>
            <div className="flex mt-6">
              <StarIcon className="mr-2" />
              <div className="text-xl font-medium">Earn</div>
            </div>
            <div className="space-y-2 mt-4">
              <EarnCardWrapper type="savings" />
              <EarnCardWrapper type="growth" />
            </div>
          </div>
          <div>
            <div className="flex mt-6">
              <ComingSoonIcon className="mt-0.5 mr-2" />
              <div className="text-xl font-medium">Coming Soon</div>
            </div>
            <div className="flex justify-between mt-4">
              <ComingSoonItem variant="remittence" />
              <ComingSoonItem variant="payment" />
              <ComingSoonItem variant="loan" />
              <ComingSoonItem variant="stake" />
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 mb-40">
            <div className="text-muted-foreground">© 2004-2024 Tardis.com. All rights reserved.</div>
          </div>
        </div>
      </div>
      <Shortcuts />
    </>
  );
};

export default HomePage;
