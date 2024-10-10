'use client';

import { ArchiveRestore, ArrowLeftRight, House } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCurrentWallet } from '@/hooks/useWallet';

export const Shortcuts = () => {
  const router = useRouter();
  const { data: wallet } = useCurrentWallet();

  if (!wallet?.address) return null;

  return (
    <div className="fixed bg-white rounded-full bottom-14 left-1/2 p-2 grid gap-x-1 grid-cols-3 shadow-[0_6px_20px_0px_rgba(0,0,0,0.14)] text-xs -translate-x-2/4">
      <button
        className="flex flex-col items-center text-gray-800 p-3 active:bg-indigo-100 rounded-full w-16"
        onClick={() => router.push('/deposit')}
      >
        <ArchiveRestore className="text-gray-800" size={24} />
        <label className="mt-0.5">Deposit</label>
      </button>
      <button
        className="flex flex-col items-center text-gray-800 p-3 active:bg-indigo-100 rounded-full w-16"
        onClick={() => router.push('/')}
      >
        <House className="text-gray-800" size={24} />
        <label className="mt-0.5">Home</label>
      </button>
      <button
        className="flex flex-col items-center text-gray-800 p-3 active:bg-indigo-100 rounded-full w-16"
        onClick={() => router.push('/transfer')}
      >
        <ArrowLeftRight className="text-gray-800" size={24} />
        <label className="mt-0.5">Transfer</label>
      </button>
    </div>
  );
};
