'use client';
import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';
import { TonWallet } from './components/TonWallet';
import './telegram-web-app';

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
