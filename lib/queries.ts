'use client';

import { type Transaction } from 'viem';

export const fetchWallet = async ({
  userToken,
  userId,
}: {
  userToken: string;
  userId: string;
}): Promise<
  {
    accountType: string;
    address: string;
    blockchain: string;
    createDate: string;
    custodyType: string;
    id: string;
    scaCore: string;
    state: string;
    updateDate: string;
    userId: string;
    walletSetId: string;
  }[]
> => {
  const res = await fetch(`/api/wallet/${userId}`, {
    headers: { token: userToken },
  }).then((res) => res.json());

  return res.result;
};

export const fetchUser = async ({
  userId,
}: {
  userId: string;
}): Promise<{
  id: string;
  status: string;
  createDate: string;
  pinStatus: string;
  pinDetails: {
    failedAttempts: number;
  };
  securityQuestionStatus: string;
  securityQuestionDetails: {
    failedAttempts: number;
  };
  authMode: string;
}> => {
  const res = await fetch(`/api/user/${userId}`).then((res) => res.json());

  return res.result;
};

export const fetchUserChallenge = async ({
  userId,
}: {
  userId: string;
}): Promise<{
  challengeId: string;
}> => {
  const res = await fetch(`/api/user/challenge/${userId}`).then((res) => res.json());

  return res.result;
};

export const fetchUserChallengeTx = async ({
  challengeId,
  userToken,
}: {
  challengeId: string;
  userToken: string;
}): Promise<Transaction> => {
  const res = await fetch(`/api/user/challenges/tx/${challengeId}`, {
    headers: { token: userToken },
  }).then((res) => res.json());

  return res.result;
};

export const fetchAttestations = async (messageHash: string): Promise<Transaction> => {
  const res = await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageHash}`).then((res) => res.json());

  return res;
};

export const pollAttestations = async (messageHash: string) => {
  if (!messageHash) return;
  return new Promise((resolve, reject) => {
    const polling = async () => {
      try {
        const result: any = await fetchAttestations(messageHash);

        if (result.status !== 'complete') {
          throw new Error('Attestation is pending');
        }

        clearInterval(pollingInterval);
        resolve(result);
      } catch (error) {
        console.error(`fetch attestations ${messageHash}`, error);
      }
    };

    const pollingInterval = setInterval(polling, 6000);
  });
};
