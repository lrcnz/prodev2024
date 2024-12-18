import { userControlledWalletsClient } from '@/lib/walletClient';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // circle-sdk: get user's wallet
    const walletListResponse = await userControlledWalletsClient.listWallets({
      userId: id,
    });

    console.log(walletListResponse.data);

    const wallets = walletListResponse.data?.wallets;

    return Response.json({
      result: wallets || null,
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
