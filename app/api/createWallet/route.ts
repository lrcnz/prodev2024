import { type NextRequest } from 'next/server';

import { userControlledWalletsClient } from '@/lib/walletClient';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    // circle-sdk: get user's wallet
    const createWalletPinRes = await userControlledWalletsClient.createWallet({
      userId: body.userId,
      blockchains: ['ARB-SEPOLIA'],
      accountType: 'SCA',
    });

    return Response.json({
      result: {
        challengeId: createWalletPinRes.data?.challengeId,
      },
    });
  } catch (error: any) {
    let status = 500;
    let errorMsg = 'Internal server error';

    if (error.response && error.response.status === 404) {
      status = 404;
      errorMsg = 'Wallet not found';
    }

    return Response.json(
      {
        error: {
          message: errorMsg,
        },
      },
      { status }
    );
  }
}
