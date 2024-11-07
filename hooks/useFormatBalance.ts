import { useAtomValue } from 'jotai';

import { useCallback } from 'react';

import { formatNumber, type FormatOptions } from '@/lib/utils';
import { showBalanceAtom } from '@/state/showBalance';

export const useFormatBalance = ({
  show,
}: {
  show?: boolean;
} = {}) => {
  const showBalance = useAtomValue(showBalanceAtom);

  return useCallback(
    (value: string | number | undefined | bigint, options?: FormatOptions) => {
      return (show != null ? show : showBalance) ? formatNumber(value, options) : '******';
    },
    [show, showBalance]
  );
};
