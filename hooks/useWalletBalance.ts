import { useMemo } from 'react';

import { useErc20Balance } from './useErc20Balance';
import { useCurrentWallet } from './useWallet';

export const useWalletBalance = (enabled: boolean = false) => {
  const { data: wallet } = useCurrentWallet();
  const { data: usdcBalance } = useErc20Balance('USDC', wallet?.address, {
    enabled,
  });

  return useMemo(() => {
    return {
      totalBalance: usdcBalance,
      currentBalance: usdcBalance,
    };
  }, [usdcBalance]);
};
