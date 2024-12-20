import { Address, TupleBuilder } from '@ton/ton';

import { useEffect, useState } from 'react';

import { useTonClient } from './useTonClient';

const contractAddress = 'kQA_PwJcE6KoLTdOzIujYj3eJ20gdumhVpA6ycq0hZATkFCk';

import { useTonConnect } from './useTonConnect';

export const useShare = () => {
  const client = useTonClient();
  const [share, setShare] = useState<bigint | null>(null);
  const { walletAddress } = useTonConnect();
  useEffect(() => {
    if (!client || !walletAddress) return;

    async function readContract() {
      if (!client || !walletAddress) return;
      const builder = new TupleBuilder();

      builder.writeAddress(walletAddress);

      const data = await client.runMethod(Address.parse(contractAddress), 'shareOf', builder.build());
      setShare(data.stack.readBigNumberOpt());
    }

    readContract();
  }, [client, walletAddress]);

  return { share };
};
