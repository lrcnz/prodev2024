'use client';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { isReadyAtom } from './atoms';

export const useStartParam = () => {
  const [startapp, setStartapp] = useState('');
  const [amount, setAmount] = useState<number>();
  const [loading, setIsLoading] = useState(false);
  const isReady = useAtomValue(isReadyAtom);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const start_param = (window as any).Telegram.WebApp.initDataUnsafe.start_param || '';

    if (start_param.startsWith('send')) {
      setStartapp('send');
      if (parseInt(start_param.split('-')[1]) > 0) {
        setAmount(parseInt(start_param.split('-')[1]));
      }
    }
    if (start_param.startsWith('raffle')) {
      setStartapp('raffle');
      if (parseInt(start_param.split('-')[1]) > 0) {
        setAmount(parseInt(start_param.split('-')[1]));
      }
    }
    if (start_param.startsWith('earn')) {
      setStartapp('earn');
      setAmount(undefined);
    }
    setIsLoading(true);
  }, [isReady]);

  return { startapp, amount, loading };
};
