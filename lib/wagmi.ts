import { http, createConfig } from 'wagmi';
import { arbitrumSepolia, sepolia } from 'wagmi/chains';

export const config = createConfig({
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http('https://rpc.sepolia.org'),
    [arbitrumSepolia.id]: http(),
  },
  chains: [sepolia, arbitrumSepolia],
  ssr: true,
});
