import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import { DynamicComponents } from '@/components/Dynamic';
import Providers from '@/components/Providers';

import './globals.css';
import Head from 'next/head';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '400 500 600 700 800 900',
});

export const metadata: Metadata = {
  title: 'Tardis Money',
  description: 'Tardis Money',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      data-theme="light"
      className={`${roboto.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <Providers>
          <DynamicComponents>{children}</DynamicComponents>
        </Providers>
      </body>
    </html>
  );
}
