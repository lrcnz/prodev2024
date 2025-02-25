'use client';
import { type Viewport } from 'next';

import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';
import { TonWallet } from './components/TonWallet';
import './telegram-web-app';

export const viewport: Viewport = {
  themeColor: '#3270ef',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-full">{children}</main>
      <Login />
      <Deposit />
      <Pay />
      <TonWallet />
    </>
  );
}
