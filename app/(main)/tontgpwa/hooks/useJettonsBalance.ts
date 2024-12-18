import { Address, JettonMaster, TonClient4 } from '@ton/ton';

import { useEffect, useState } from 'react';
import TonWeb from 'tonweb';
const jettonMasterAddress = '0:cfedd26ebc685f10c7d553a985c9d0571f73f802725489ccd694485aeb78d2d0';

export const useJettonBalance = (walletAddress: string) => {
  const [balance, setBalance] = useState<bigint>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;
      console.log('walletAddress', walletAddress);
      try {
        setIsLoading(true);

        const client = new TonClient4({
          endpoint: 'https://testnet-v4.tonhubapi.com', // 测试网节点
        });
        console.log(walletAddress);

        const userAddress = Address.parse(walletAddress);
        const masterAddress = Address.parse(jettonMasterAddress);
        const contract = JettonMaster.create(masterAddress);
        const jettonMaster = client.open(contract);
        const jettonWalletAddress = await jettonMaster.getWalletAddress(userAddress);
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
          address: jettonWalletAddress.toString(),
        });

        const data = await jettonWallet.getData();
        setBalance(BigInt(data.balance.toString()));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return { balance, isLoading, error };
};
