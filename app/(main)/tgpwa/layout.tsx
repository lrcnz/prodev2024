'use client';
import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';

import { useWalletBalance } from '@/hooks/useWalletBalance';

export default function Layout({ children }: { children: React.ReactNode }) {
  useWalletBalance(true);
  return (
    <>
      <main className="h-full">{children}</main>
      <Login />
      <Deposit />
      <Pay />
    </>
  );
}
