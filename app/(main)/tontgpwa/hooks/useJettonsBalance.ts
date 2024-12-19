import { Address, JettonMaster, TonClient4 } from '@ton/ton';

import { useEffect, useState } from 'react';
import TonWeb from 'tonweb';
const jettonMasterAddress = '0:cfedd26ebc685f10c7d553a985c9d0571f73f802725489ccd694485aeb78d2d0';

export const useJettonBalance = (_userAddress: string) => {
  const [balance, setBalance] = useState<bigint>();
  const [address, setAddress] = useState<Address>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!_userAddress) return;
      try {
        setIsLoading(true);

        const client = new TonClient4({
          endpoint: 'https://testnet-v4.tonhubapi.com', // 测试网节点
        });

        const userAddress = Address.parse(_userAddress);
        const masterAddress = Address.parse(jettonMasterAddress);
        const contract = JettonMaster.create(masterAddress);
        const jettonMaster = client.open(contract);
        const jettonWalletAddress = await jettonMaster.getWalletAddress(userAddress);
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC'));

        const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
          address: jettonWalletAddress.toString(),
        });

        const data = await jettonWallet.getData();
        setAddress(jettonWalletAddress);
        setBalance(BigInt(data.balance.toString()));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [_userAddress]);

  return { balance, walletAddress: address, isLoading, error };
};
