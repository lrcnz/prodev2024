'use client';

export const fetchWallet = async ({
  userToken,
  userId,
}: {
  userToken: string;
  userId: string;
}): Promise<{
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
}> => {
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
