import { userControlledWalletsClient } from '@/lib/walletClient';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await userControlledWalletsClient.getTransaction({
      userToken: req.headers.get('token') as string,
      id: id,
    });

    if (!res.data?.transaction) throw new Error('No transactions found');

    return Response.json({
      result: res.data?.transaction || null,
    });
  } catch (error: any) {
    console.error(error.response || error);
    const notFound = error.message === "No transactions found"
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
