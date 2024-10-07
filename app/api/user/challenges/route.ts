import { userControlledWalletsClient } from '@/lib/walletClient';
import { GetUserChallengeInput } from '@circle-fin/user-controlled-wallets';

export async function POST(req: Request) {
  const params = await req.json();

  console.log(params)
  try {
    const res = await userControlledWalletsClient.getUserChallenge(params);

  //   return Response.json({
  //     result: res.data || null,
  //   });
  // } catch (error: any) {
  //   console.error(error);
  //   const status = 500;
  //   const errorMsg = 'Internal server error';
  //   return Response.json(
  //     {
  //       error: {
  //         message: errorMsg,
  //       },
  //     },
  //     { status }
  //   );
  } catch (error: any) {
  }
}
