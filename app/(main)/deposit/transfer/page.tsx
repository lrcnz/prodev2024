'use client';

import { BadgeCheck, CircleCheck, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import USDC from '@/assets/usdc.svg?url';
import { useCurrentWallet } from '@/hooks/useWallet';

import { Button } from '@/ui-components/Button';
import { Toast } from '@/ui-components/Toast';

const TransferPage = () => {
  const { data: wallet } = useCurrentWallet();

  return (
    <div className="flex flex-col h-full">
      <header className="h-14 flex justify-center items-center ">
        <div className="text-lg font-semibold relative w-full flex items-center justify-center">
          <div className="absolute left-4">
            <Link href="/">
              <X />
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-col">
        <div className="flex flex-col items-center flex-1">
          <div className="mt-24">
            <div className="flex justify-center mb-4 items-center gap-1 text-xl font-semibold">
              <Image className="h-6 w-6" src={USDC} alt="usdc" />
              USDC
            </div>
            {wallet?.address && <QRCodeSVG size={240} value={wallet.address} />}
          </div>
        </div>
      </div>
      {wallet?.address && (
        <div className="mt-auto p-6 mb-8 flex gap-2 items-center">
          <div className="break-all text-muted-foreground">{wallet?.address}</div>
          <div>
            <CopyToClipboard
              text={wallet?.address}
              onCopy={() => {
                Toast.show({
                  icon: 'success',
                  content: 'Copied',
                });
              }}
            >
              <Button className="rounded-xl h-8 px-4 text-sm">Copy</Button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
