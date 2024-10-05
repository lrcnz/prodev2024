import { userControlledWalletsClient } from '@/lib/walletClient';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await userControlledWalletsClient.createUserPinWithWallets({
      userId: id,
      blockchains: ['ETH-SEPOLIA'],
      accountType: 'SCA',
    });

    return Response.json({
      result: res.data || null,
    });
  } catch (error: any) {
    console.error(error);
    const status = 500;
    const errorMsg = 'Internal server error';
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
