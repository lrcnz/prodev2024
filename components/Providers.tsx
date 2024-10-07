'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider as StorageProvider } from 'jotai';
import { WagmiProvider } from 'wagmi';

import { config as wagmiConfig } from '@/lib/wagmi';
import { TooltipProvider } from '@/ui-components/tooltip';

export const store = createStore();
const client = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <StorageProvider store={store}>
          <TooltipProvider>{children}</TooltipProvider>
        </StorageProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
