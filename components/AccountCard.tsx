import { useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const ApplePay = () => {
  return (
    <svg width="35" height="14" viewBox="0 0 35 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.23406 1.80495C5.83444 2.27783 5.19505 2.65081 4.55566 2.59753C4.47574 1.95814 4.78877 1.27878 5.15509 0.859182C5.55471 0.372978 6.25404 0.0266413 6.82017 0C6.88677 0.666032 6.62702 1.31874 6.23406 1.80495ZM6.81351 2.72407C5.88773 2.67079 5.09515 3.25024 4.65557 3.25024C4.20932 3.25024 3.53663 2.75071 2.804 2.76403C1.85157 2.77735 0.965747 3.31684 0.479543 4.17602C-0.519506 5.89439 0.21979 8.43863 1.18554 9.8373C1.65842 10.53 2.22455 11.2892 2.9705 11.2626C3.6765 11.236 3.95623 10.803 4.80875 10.803C5.66793 10.803 5.91437 11.2626 6.66032 11.2493C7.43292 11.236 7.91912 10.5566 8.39201 9.86394C8.93149 9.07802 9.15128 8.31208 9.16461 8.27212C9.15128 8.2588 7.67269 7.69267 7.65937 5.98763C7.64605 4.56232 8.82493 3.88297 8.87821 3.84301C8.21218 2.85728 7.17317 2.75071 6.81351 2.72407ZM12.1618 0.792578V11.176H13.7735V7.62607H16.0048C18.0428 7.62607 19.4748 6.2274 19.4748 4.20266C19.4748 2.17793 18.0695 0.792578 16.058 0.792578H12.1618ZM13.7735 2.15128H15.6318C17.0304 2.15128 17.8297 2.89724 17.8297 4.20932C17.8297 5.52141 17.0304 6.27402 15.6251 6.27402H13.7735V2.15128ZM22.4186 11.2559C23.431 11.2559 24.3701 10.7431 24.7964 9.93054H24.8297V11.176H26.3216V6.00761C26.3216 4.50904 25.1227 3.54329 23.2778 3.54329C21.5661 3.54329 20.3007 4.52236 20.254 5.86774H21.706C21.8259 5.22835 22.4186 4.80875 23.2312 4.80875C24.2169 4.80875 24.7697 5.26832 24.7697 6.11418V6.68696L22.7583 6.80685C20.8868 6.92008 19.8744 7.68601 19.8744 9.01808C19.8744 10.3635 20.9201 11.2559 22.4186 11.2559ZM22.8516 10.0238C21.9924 10.0238 21.4462 9.61085 21.4462 8.97812C21.4462 8.32541 21.9724 7.94577 22.9781 7.88582L24.7697 7.7726V8.35871C24.7697 9.33111 23.9439 10.0238 22.8516 10.0238ZM28.313 14C29.8849 14 30.6242 13.4006 31.2702 11.5823L34.1009 3.6432H32.4624L30.5642 9.77736H30.5309L28.6327 3.6432H26.9477L29.6784 11.2027L29.5319 11.6622C29.2854 12.4415 28.8858 12.7412 28.1732 12.7412C28.0466 12.7412 27.8002 12.7279 27.7003 12.7146V13.96C27.7935 13.9867 28.1931 14 28.313 14Z"
        fill="white"
      />
    </svg>
  );
};

export const AccountCard = ({ className }: { className?: string }) => {
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
            <div className="text-xs text-muted-foreground translate-y-[0.5px]">Balance</div>
            <div className="text-sm">
              {formatBalance(savingsBalance, { decimals: 6, postfix: ' USDC', mantissa: 2 })}
            </div>
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
              <Button asChild className="bg-foreground rounded-full h-12 w-12 p-2.5 hover:bg-foreground/90">
                <Link href="/welcome">
                  <Plus />
                </Link>
              </Button>
              Sign up / Log in
            </div>
          )}
        </div>
      </div>
      <div className={cn('rounded-t-lg px-3 py-2 bg-gradient2 h-18 relative z-30', '-mt-8 max-h-20 overflow-hidden')}>
        <div className="flex justify-between items-center">
          <div className="mb-[30px]">
            <div className="flex">
              <CardIcon className="mt-0.5 mr-2" />
              <div className="text-sm font-semibold">Spending Card</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!wallet?.address ? (
              ''
            ) : kyc[wallet?.address] ? (
              <div>
                <div className="flex items-center gap-1 justify-end">
                  <div className="text-xs text-muted-foreground translate-y-[0.5px]">Balance</div>
                  <div className="text-sm">{formatBalance(currentBalance, { decimals: 6, postfix: ' USDC' })}</div>
                </div>
                <div>
                  <div className="flex justify-end mt-1.5">
                    <Button className="h-6 py-0.5 text-xs rounded-lg bg-foreground hover:bg-foreground/80" asChild>
                      <div>
                        Add Card to
                        <span className="ml-1 translate-y-[0.5px]">
                          <ApplePay />
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center">
                  <div className="flex mr-2">
                    <div className="text-xs text-muted-foreground translate-y-[2.5px] mr-1">Balance</div>
                    <div className="text-sm">
                      {formatBalance(currentBalance, { decimals: 6, postfix: ' USDC', mantissa: 2 })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-1.5">
                  <Button className="h-6 py-0.5 text-xs rounded-lg bg-foreground hover:bg-foreground/80" asChild>
                    <Link href="/kyc">Activate</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
