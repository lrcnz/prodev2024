import { useAtomValue } from 'jotai';

import { useCallback } from 'react';

import { formatNumber, type FormatOptions } from '@/lib/utils';
import { showBalanceAtom } from '@/state/showBalance';

export const useFormatBalance = () => {
  const showBalance = useAtomValue(showBalanceAtom);

  return useCallback(
    (value: string | number | undefined | bigint, options?: FormatOptions) => {
      return showBalance ? formatNumber(value, options) : '******';
    },
    [showBalance]
  );
};
