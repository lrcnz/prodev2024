'use client';

import { useAtom } from 'jotai';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';

import { InnerHeader } from '@/components/InnerHeader';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { showBalanceAtom } from '@/state/showBalance';

const ActivitiesPage = () => {
  const [showBalance, setShowBalance] = useAtom(showBalanceAtom);
  const formatBalance = useFormatBalance();
  const { totalBalance } = useWalletBalance();

  return (
    <>
      <div className="flex flex-col h-full">
        <InnerHeader title="Activities" />
        <div className="flex flex-col p-4">
          <div className="bg-gray-100 rounded-md p-3">
            <div className="flex gap-2 text-muted-foreground items-center">
              <div className="text-base">Total balance</div>
              <div onClick={() => setShowBalance(!showBalance)} className="cursor-pointer">
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </div>
            </div>
            <div className="mt-2 flex items-center text-4xl font-medium">
              {formatBalance(totalBalance, { decimals: 6, postfix: ' USDC' })}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold border-b leading-8">Transcation History</h2>
            <ul>
              <li className="border-b">
                <div className="flex justify-between p-4 pr-3">
                  <div>
                    <label>Transfer 1</label>
                    <p className="text-gray-400">Add to xxxdxxx</p>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2">$20</label>
                    <ChevronRight size={30} color="#CCCCCC" strokeWidth={1} />
                  </div>
                </div>
              </li>
              <li className="border-b">
                <div className="flex justify-between p-4 pr-3">
                  <div>
                    <label>Transfer 2</label>
                    <p className="text-gray-400">Add to xxxdxxx</p>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2">$20</label>
                    <ChevronRight size={30} color="#CCCCCC" strokeWidth={1} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivitiesPage;
