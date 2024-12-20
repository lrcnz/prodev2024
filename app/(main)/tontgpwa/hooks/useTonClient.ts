import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { tonClientAtom } from './atoms';

export const useTonClient = () => {
  const [tonClient, setTonClient] = useAtom(tonClientAtom);

  useEffect(() => {
    if (tonClient) return;

    const fetchTonClient = async () => {
      const endpoint = await getHttpEndpoint({
        network: 'testnet',
      });

      console.log('endpoint', endpoint);

      setTonClient(new TonClient({ endpoint }));
    };

    fetchTonClient();
  }, [setTonClient, tonClient]);

  return tonClient;
};
