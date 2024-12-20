import { Address, JettonMaster, toNano } from '@ton/ton';
import { useCallback } from 'react';

import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { JettonWallet } from './JettonWallet';
import { useTonConnect } from './useTonConnect';

export const useGenerateId = () => {
  const idRef = useRef<string | null>(null);

  if (idRef.current === null) {
    idRef.current = uuidv4();
  }

  return idRef.current;
};

export const USDT_MASTER_ADDRESS = Address.parse('kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy');
export const INVOICE_WALLET_ADDRESS = Address.parse('kQAvbmVWzh2zt8S2eP4f12WY5XhA7pKOJ0taL39auJ63vVJ1');
export const JETTON_TRANSFER_GAS_FEES = toNano('0.1');

export const separateTonAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;

export const calculateUsdtAmount = (usdCents: number) => BigInt(usdCents * 10000);

export const calculateUsdFromUsdt = (usdtAmount: bigint) => Math.round((Number(usdtAmount) / 1000000) * 100) / 100;

export const isUUID = (uuid: string): boolean =>
  uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$') !== null;

export async function wait(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function retry<T>(fn: () => Promise<T>, options: { retries: number; delay: number }): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof Error) {
        lastError = e;
      }
      await wait(options.delay);
    }
  }
  throw lastError;
}

export const useTransfer = () => {
  const { sender, walletAddress, tonClient } = useTonConnect();

  const handleCompletePayment = useCallback(
    async (amount: any) => {
      if (!tonClient || !walletAddress) return;

      const jettonMaster = tonClient.open(
        JettonMaster.create(Address.parse('0:cfedd26ebc685f10c7d553a985c9d0571f73f802725489ccd694485aeb78d2d0'))
      );
      const usersUsdtAddress = await jettonMaster.getWalletAddress(walletAddress);

      // creating and opening jetton wallet instance.
      // First argument (provider) will be automatically substituted in methods, which names starts with 'get' or 'send'
      const jettonWallet = tonClient.open(JettonWallet.createFromAddress(usersUsdtAddress));

      await jettonWallet.sendTransfer(sender, {
        fwdAmount: toNano(0.01),
        jettonAmount: amount,
        toAddress: INVOICE_WALLET_ADDRESS,
        value: JETTON_TRANSFER_GAS_FEES,
      });

      console.log(`See transaction at https://testnet.tonviewer.com/${usersUsdtAddress.toString()}`);
    },
    [tonClient, walletAddress, sender]
  );

  return handleCompletePayment;
};
