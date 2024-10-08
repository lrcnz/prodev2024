import { type Address, type PublicClient } from 'viem';

import { ERC20_ABI } from './abis/erc20';
import { USTB_ABI } from './abis/ustb';
import { USDC_ADDRESS, USTB_ADDRESS } from './contracts';

export const depositSavingsContract = async (publicClient: PublicClient, walletAddress: string) => {
  const value = await publicClient.readContract({
    address: USTB_ADDRESS,
    abi: USTB_ABI,
    functionName: 'balanceOf',
    args: [walletAddress as Address],
  });

  return [
    {
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [USTB_ADDRESS, value],
    },
    {
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'deposit',
      args: [value],
    },
  ];
};

export const withdrawSavingsContract = async (publicClient: PublicClient, walletAddress: string) => {
  const value = await publicClient.readContract({
    address: USTB_ADDRESS,
    abi: USTB_ABI,
    functionName: 'balanceOf',
    args: [walletAddress as Address],
  });

  return [
    {
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'withdraw',
      args: [value],
    },
  ];
};
