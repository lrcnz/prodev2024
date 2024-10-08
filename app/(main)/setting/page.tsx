'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useAtomValue } from 'jotai';
import { LogOut, RefreshCcw, X } from 'lucide-react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { useBalance } from 'wagmi';

import { useErc20Balance } from '@/hooks/useErc20Balance';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useUserLogin } from '@/hooks/useUserLogin';
import { useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { delay } from '@/lib/utils';
import { userIdAtom } from '@/state/userToken';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const SettingPage = () => {
  const { logout, loginMutateAsync } = useUserLogin();
  const userId = useAtomValue(userIdAtom);
  const formatBalance = useFormatBalance();
  const { data: wallet } = useCurrentWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: sepoliaETHBalance } = useBalance({
    address: wallet?.address as any,
    query: { enabled: !!wallet?.address },
  });
  const { currentBalance } = useWalletBalance();
  const { data: ustbBalance } = useErc20Balance('USTB', wallet?.address);

  const onLogout = async () => {
    setLoading(true);
    logout();
    await delay(1000);
    Toast.show({
      icon: 'success',
      content: 'Logged out',
    });
    setLoading(false);
    router.push('/');
  };

  const onRefresh = async () => {
    if (!userId?.email || !userId?.password) {
      Toast.show({
        icon: 'error',
        content: 'not logged in',
      });
      return;
    }
    setLoading(true);
    loginMutateAsync({ email: userId?.email, password: userId?.password });
    Toast.show({
      icon: 'success',
      content: 'Refreshed token',
    });
    setLoading(false);
  };

  return (
    <>
      <Loading open={loading} />
      <header className="h-14 flex justify-center items-center ">
        <div className="text-lg font-semibold relative w-full flex items-center justify-center">
          <div className="absolute left-4">
            <Link href="/">
              <X />
            </Link>
          </div>
          Setting
        </div>
      </header>
      <div>
        <div className="mt-12 flex justify-center items-center flex-col">
          <div className="rounded-full overflow-hidden h-20 w-20 flex justify-center items-center bg-slate-500 text-3xl text-background">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="tradis" />
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-3 text-2xl font-medium">Tradis App</div>
        </div>
        <div className="mx-4 mt-8 space-y-4">
          <div className="rounded-xl bg-accent flex flex-col py-2">
            <div className="flex h-14 items-center cursor-pointer gap-4" onClick={onLogout}>
              <div className="ml-8">
                <LogOut />
              </div>
              <div className="text-base font-medium">Log out</div>
            </div>
            <div className="flex h-14 items-center cursor-pointer gap-4" onClick={onRefresh}>
              <div className="ml-8">
                <RefreshCcw />
              </div>
              <div className="text-base font-medium">Refresh token</div>
            </div>
          </div>
          {wallet?.address && (
            <div className="rounded-xl bg-accent flex flex-col gap-4 py-4 px-8">
              {wallet?.address && (
                <div>
                  <div className="text-xs text-muted-foreground">Sepolia Address</div>
                  <div className="text-base break-all">{wallet?.address}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-muted-foreground">Sepolia Eth Balance</div>
                <div className="text-base break-all">
                  {formatBalance(sepoliaETHBalance?.value, {
                    decimals: 18,
                    postfix: ' sepoliaETH',
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">USDC Balance</div>
                <div className="text-base break-all">
                  {formatBalance(currentBalance, {
                    decimals: 6,
                    postfix: ' USDC',
                  })}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">USTB Balance</div>
                <div className="text-base break-all">
                  {formatBalance(ustbBalance, {
                    decimals: 6,
                    postfix: ' USTB',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingPage;
