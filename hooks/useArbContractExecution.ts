import { useMutation } from '@tanstack/react-query';

import { useAtomValue } from 'jotai';

import { useCallback } from 'react';

import { encodeFunctionData } from 'viem';

import { useArbWallet } from './useWallet';

import { userTokenAtom } from '@/state/userToken';

export const useArbContractExecution = () => {
  const currentUser = useAtomValue(userTokenAtom);
  const { data: wallet } = useArbWallet(true);

  const mutation = useMutation({
    mutationKey: ['send-tx'],
    mutationFn: async (data: unknown) => {
      if (!currentUser?.userToken) throw new Error('No user token found');
      const response = await fetch('/api/transactions/contractExecution', {
        method: 'POST',
        headers: {
          token: currentUser.userToken,
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
  });

  return useCallback(
    async (
      contracts: any[],
      options: {
        feeLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
      } = {}
    ) => {
      if (!wallet?.address) throw new Error('No wallet address found');
      if (!wallet.id) throw new Error('No wallet id found');

      const params = contracts.map((item) => {
        return [
          item.address,
          item?.value?.toString() || '0',
          encodeFunctionData({
            abi: item.abi,
            functionName: item.functionName,
            args: item.args,
          }),
        ];
      });

      const response = await mutation.mutateAsync({
        abiParameters: [[...params]],
        abiFunctionSignature: 'executeBatch((address,uint,bytes)[])',
        contractAddress: wallet.address,
        walletId: wallet.id,
        feeLevel: options.feeLevel ?? 'LOW',
      });

      return response;
    },
    [mutation, wallet]
  );
};
