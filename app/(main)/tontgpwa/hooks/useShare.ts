import { type Address, JettonMaster, TonClient4 } from '@ton/ton';

import { useEffect, useState } from 'react';
import TonWeb from 'tonweb';
const jettonMasterAddress = '0:cfedd26ebc685f10c7d553a985c9d0571f73f802725489ccd694485aeb78d2d0';

export const useShare = () => {
  const [balance, setBalance] = useState<bigint>();
  const [address, setAddress] = useState<Address>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tonweb = new TonWeb(
      new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
        apiKey: '08299ffd9e1be86d721b285eb6964bc0f05413858dc3e05bfb6134d85ea5be63',
      })
    );

    async function readContract() {
      const contractAddress = jettonMasterAddress;

      // 创建合约地址对象
      const address = new TonWeb.Address(contractAddress);

      try {
        const response = await tonweb.provider.call(address.toString(), 'get_balance', []); // 方法名和参数需根据合约定义调整
        console.log('Contract Response:', response);
      } catch (error) {
        console.error('Error reading contract:', error);
      }
    }

    readContract();
  }, []);

  return { balance, walletAddress: address, isLoading, error };
};
