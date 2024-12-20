import { Address } from '@ton/ton';

import { useEffect, useState } from 'react';

import { useTonClient } from './useTonClient';
const contractAddress = 'kQAvbmVWzh2zt8S2eP4f12WY5XhA7pKOJ0taL39auJ63vVJ1';

export const useShare = () => {
  const client = useTonClient();

  useEffect(() => {
    if (!client) return;

    async function readContract() {
      if (!client) return;

      const data = await client.runMethod(Address.parse(contractAddress), 'share_of', []);
      console.log('data', data);
    }

    readContract();
  }, [client]);

  return { a: 1 };
};
