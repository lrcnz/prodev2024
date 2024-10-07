'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider as StorageProvider } from 'jotai';
import { WagmiProvider } from 'wagmi';

import { config as wagmiConfig } from '@/lib/wagmi';

export const store = createStore();
const client = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <StorageProvider store={store}>
          {children}
        </StorageProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
