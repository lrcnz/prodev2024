'use client';
import WebApp from '@twa-dev/sdk';
import { useEffect, useMemo, useState } from 'react';

export const useStartParam = () => {
  const [startapp, setStartapp] = useState('');
  const [amount, setAmount] = useState<number>();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    import('@twa-dev/sdk')
      .then((mod) => {
        const Webapp = mod.default;
        WebApp.ready();
        return Webapp.initDataUnsafe.start_param || '';
      })
      .then((start_param) => {
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
      })
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  return { startapp, amount, loading };
};
