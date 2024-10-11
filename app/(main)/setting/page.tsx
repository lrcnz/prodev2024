'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useAtomValue } from 'jotai';
import { LogOut, RefreshCcw, X } from 'lucide-react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { type Address } from 'viem';
import { useBalance, useReadContract } from 'wagmi';

import { useErc20Balance } from '@/hooks/useErc20Balance';
import { useFormatBalance } from '@/hooks/useFormatBalance';
import { useUserLogin } from '@/hooks/useUserLogin';
import { useArbWallet, useCurrentWallet } from '@/hooks/useWallet';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { SHORT_MARKET_ABI } from '@/lib/abis/short-market';
import { MOCK_SHORT_MARKET, UNI_WETH_ADDRESS } from '@/lib/contracts';
import { delay } from '@/lib/utils';
import { userIdAtom } from '@/state/userToken';
import { Button } from '@/ui-components/Button';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const SettingPage = () => {
  const { logout, loginMutateAsync } = useUserLogin();
  const userId = useAtomValue(userIdAtom);
  const formatBalance = useFormatBalance();
  const { data: wallet } = useCurrentWallet();
  const { data: arbWallet } = useArbWallet(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: sepoliaETHBalance } = useBalance({
    address: wallet?.address as any,
    query: { enabled: !!wallet?.address },
  });
  const { currentBalance } = useWalletBalance();
  const { data: ustbBalance } = useErc20Balance('USTB', wallet?.address);
  const { data: stETHBalance } = useErc20Balance('stETH', wallet?.address);
  const { data: ezETHBalance } = useErc20Balance('ezETH', wallet?.address);
  const { data: wETHBalance } = useErc20Balance('WETH', wallet?.address);
  const { data: positions } = useReadContract({
    abi: SHORT_MARKET_ABI,
    address: MOCK_SHORT_MARKET as Address,
    functionName: 'positions',
    args: [UNI_WETH_ADDRESS as Address, wallet?.address as Address],
    query: { enabled: !!wallet?.address },
  });

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
        icon: 'fail',
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
      {wallet?.address ? (
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
              <div>
                <div className="text-xl font-medium mb-2 mt-8 ml-1">Dev Info</div>
                <div className="rounded-xl bg-accent flex flex-col gap-4 py-4 px-8">
                  {wallet?.address && (
                    <div>
                      <div className="text-xs text-muted-foreground">Sepolia Address</div>
                      <div className="text-base break-all">
                        <Link target="_blank" href={`https://sepolia.etherscan.io/address/${wallet?.address}`}>
                          {wallet?.address}
                        </Link>
                      </div>
                    </div>
                  )}
                  {arbWallet?.address && (
                    <div>
                      <div className="text-xs text-muted-foreground">Arb Sepolia Address</div>
                      <div className="text-base break-all">
                        <Link target="_blank" href={`https://sepolia.arbiscan.io/address/${arbWallet?.address}`}>
                          {arbWallet?.address}
                        </Link>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-muted-foreground">Sepolia Eth Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(sepoliaETHBalance?.value, {
                        decimals: 18,
                        postfix: ' sepoliaETH',
                        mantissa: 18,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">USDC Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(currentBalance, {
                        decimals: 6,
                        mantissa: 6,
                        postfix: ' USDC',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">USTB Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(ustbBalance, {
                        decimals: 6,
                        mantissa: 6,
                        postfix: ' USTB',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">stETH Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(stETHBalance, {
                        decimals: 18,
                        mantissa: 18,
                        postfix: ' stETH',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">ezETH Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(ezETHBalance, {
                        decimals: 18,
                        mantissa: 18,
                        postfix: ' ezETH',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">WETH Balance</div>
                    <div className="text-base break-all">
                      {formatBalance(wETHBalance, {
                        decimals: 18,
                        mantissa: 18,
                        postfix: ' WETH',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">positions deposit</div>
                    <div className="text-base break-all">
                      {formatBalance(positions?.[1], {
                        decimals: 18,
                        mantissa: 18,
                        postfix: ' WETH',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 mt-12">
          <Button variant="primary" onClick={() => router.push('/welcome')} className="w-full h-12 rounded-xl">
            Sign up / Log in
          </Button>
        </div>
      )}
    </>
  );
};

export default SettingPage;
