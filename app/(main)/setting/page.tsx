'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { useAtomValue } from 'jotai';
import { LogOut, RefreshCcw, X } from 'lucide-react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { useUserLogin } from '@/hooks/useUserLogin';
import { delay } from '@/lib/utils';
import { userIdAtom } from '@/state/userToken';
import { Loading } from '@/ui-components/Loading';
import { Toast } from '@/ui-components/Toast';

const SettingPage = () => {
  const { logout, loginMutateAsync } = useUserLogin();
  const userId = useAtomValue(userIdAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        <div className="mx-4 mt-16 space-y-4">
          <div className="rounded-xl bg-accent flex h-14 items-center cursor-pointer gap-4" onClick={onLogout}>
            <div className="ml-8">
              <LogOut />
            </div>
            <div className="text-base font-medium">Log out</div>
          </div>
          <div className="rounded-xl bg-accent flex h-14 items-center cursor-pointer gap-4" onClick={onRefresh}>
            <div className="ml-8">
              <RefreshCcw />
            </div>
            <div className="text-base font-medium">Refresh token</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
