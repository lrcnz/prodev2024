import { userControlledWalletsClient } from '@/lib/walletClient';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await userControlledWalletsClient.getUserChallenge({
      userToken: req.headers.get('token') as string,
      challengeId: id,
    });

    if (!res.data?.challenge) throw new Error('No challenge found');

    return Response.json({
      result: res.data?.challenge || null,
    });
  } catch (error: any) {
    console.error(error.response || error);
    return Response.json(
      {
        error: {
          message: 'Internal server error',
        },
      },
      { status: 500 }
    );
  }
}
