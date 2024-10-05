import { useMemo } from 'react';
import { type Address } from 'viem';
import { useReadContract } from 'wagmi';

import { ERC20_ABI } from '@/lib/actions/actions/abis/erc20';
import { getTokenAddress } from '@/lib/contracts';

export const useErc20Balance = (tokenNameOrAddress: string, walletAddress?: string) => {
  const tokenAddress = useMemo(() => {
    if (tokenNameOrAddress.startsWith('0x')) return tokenNameOrAddress;
    return getTokenAddress(tokenNameOrAddress);
  }, [tokenNameOrAddress]);

  return useReadContract({
    abi: ERC20_ABI,
    address: tokenAddress as Address,
    functionName: 'balanceOf',
    args: [walletAddress as Address],
    query: { enabled: true },
  });
};
