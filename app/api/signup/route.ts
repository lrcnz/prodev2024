import { randomUUID } from 'crypto';

import { type NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { userControlledWalletsClient } from '@/lib/walletClient';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // const user = await prisma.user.findFirst({
  //   where: { email: email },
  // });

  // if (user) {
  //   return Response.json(
  //     {
  //       error: {
  //         message: 'This email address is registered',
  //       },
  //     },
  //     { status: 400 }
  //   );
  // }

  let result: any;
  try {
    const uuid = randomUUID();

    await prisma.$transaction(async (prisma) => {
      // await prisma.user.create({
      //   data: { userId: uuid, email: email, password: password },
      // });
      
      // console.log(`create user ${uuid}/${email} successfully`);
      // Circle SDK: create user
      // await userControlledWalletsClient.createUser({ userId: uuid });

      // Circle SDK: create user token
      // const createTokenRes = await userControlledWalletsClient.createUserToken({
      //   userId: uuid,
      // });

      // Circle SDK: create user wallet pin
      const createWalletPinRes = await userControlledWalletsClient.createWallet({
        userId: '7f7aaa4d-2140-4c26-bea1-b98a7fc9677b',
        blockchains: ['ARB-SEPOLIA'],
        accountType: 'SCA',
      });

      result = {
        userId: uuid,
        // userToken: createTokenRes.data?.userToken,
        // encryptionKey: createTokenRes.data?.encryptionKey,
        challengeId: createWalletPinRes.data?.challengeId,
      };
    });

    return Response.json(
      {
        result,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);

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
