'use client';
import { useEffect } from 'react';

import { Deposit } from './components/Deposit';
import { Login } from './components/Login';
import { Pay } from './components/Pay';
import { TonWallet } from './components/TonWallet';
import './telegram-web-app';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const webview = (window as any).TelegramWebviewProxy;

      if (webview) {
        webview.postEvent('web_app_request_fullscreen');
        // tg.enableClosingConfirmation();
        // tg.setBackgroundColor('#ffffff');
        // tg.setHeaderColor('#000000');
      }
    }
  }, []);

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
