import { useMemo } from 'react';
import { type Address } from 'viem';
import { useReadContract } from 'wagmi';

import { ERC20_ABI } from '@/lib/abis/erc20';
import { getTokenAddress } from '@/lib/contracts';

export const useErc20Balance = (
  tokenNameOrAddress: string,
  walletAddress?: string,
  options: {
    enabled?: boolean;
  } = {}
) => {
  const tokenAddress = useMemo(() => {
    if (tokenNameOrAddress.startsWith('0x')) return tokenNameOrAddress;
    const address = getTokenAddress(tokenNameOrAddress);
    if (!address) throw new Error(`Invalid token name: ${tokenNameOrAddress}`);
    return address;
  }, [tokenNameOrAddress]);

  return useReadContract({
    abi: ERC20_ABI,
    address: tokenAddress as Address,
    functionName: 'balanceOf',
    args: [walletAddress as Address],
    query: { enabled: !!(walletAddress && (options.enabled ?? true)) },
  });
};
