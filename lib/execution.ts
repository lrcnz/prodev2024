import { ERC20_ABI } from './abis/erc20';
import { USTB_ABI } from './abis/ustb';
import { USDC_ADDRESS, USTB_ADDRESS } from './contracts';

export const depositSavingsContract = (amount: bigint) => {
  if (!amount) throw new Error('Amount must be greater than 0');

  return [
    {
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [USTB_ADDRESS, amount],
    },
    {
      address: USTB_ADDRESS,
      abi: USTB_ABI,
      functionName: 'deposit',
      args: [amount],
    },
  ];
};
