'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useTonConnectUI } from '@tonconnect/ui-react';

import { ExternalLink, X } from 'lucide-react';

import Link from 'next/link';

const SettingPage = () => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <>
      <header className="h-14 flex justify-center items-center ">
        <div className="text-lg font-semibold relative w-full flex items-center justify-center">
          <div className="absolute left-4">
            <Link href="/tontgpwa">
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
          <div className="mt-3 text-2xl font-medium">Gluon App</div>
        </div>
        <div className="mx-4 mt-8 space-y-4">
          <div className="rounded-xl bg-accent flex flex-col py-2">
            <div className="flex h-14 items-center cursor-pointer gap-4">
              <div className="ml-8">
                <ExternalLink />
              </div>
              <div onClick={() => tonConnectUI.disconnect()} className="text-base font-medium">
                Disconnect
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
