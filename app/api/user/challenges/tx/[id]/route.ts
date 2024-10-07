
import { userControlledWalletsClient } from '@/lib/walletClient';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await userControlledWalletsClient.getUserChallenge({
      userToken: req.headers.get('token') as string,
      challengeId: id,
    });

    if (!res.data?.challenge || !res.data?.challenge?.correlationIds?.[0]) throw new Error('No found');

    const tx = await userControlledWalletsClient.getTransaction({
      userToken: req.headers.get('token') as string,
      id: res.data?.challenge?.correlationIds?.[0],
    });

    if (!tx.data?.transaction) throw new Error('No found');

    return Response.json({
      result: tx.data?.transaction || null,
    });
  } catch (error: any) {
    console.error(error.response || error);
    const notFound = error.message === "No found"
    return Response.json(
      {
        error: {
          message: notFound ? 'Transaction not found' :'Internal server error',
        },
      },
      { status: notFound ? 404 :500 }
    );
  }
}
