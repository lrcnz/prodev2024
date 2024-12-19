'use client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';
import { TonWallet } from './components/TonWallet';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://prodev2024.vercel.app/tonconnect-manifest.json">
      <main className="h-full">{children}</main>
      <Login />
      <Deposit />
      <Pay />
      <TonWallet />
    </TonConnectUIProvider>
  );
}
