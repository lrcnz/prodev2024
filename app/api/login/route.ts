import { type NextRequest } from 'next/server';



import { prisma } from '@/lib/prisma';
import { userControlledWalletsClient } from '@/lib/walletClient';

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, password } = await req.json();

  const user = await prisma.prodev_User.findFirst({
    where: { email: email },
  });

  if (!user) {
    return Response.json(
      {
        error: {
          message: 'Invalid email or password',
        },
      },
      { status: 400 }
    );
  }

  // @TODO: enable password check
  // if (user.password !== password) {
  //   return Response.json(
  //     {
  //       error: {
  //         message: "Invalid email or password",
  //       },
  //     },
  //     { status: 400 }
  //   );
  // }

  try {
    const createTokenRes = await userControlledWalletsClient.createUserToken({
      userId: user.userId,
    });

    return Response.json(
      {
        result: {
          userId: user.userId,
          userToken: createTokenRes.data?.userToken,
          encryptionKey: createTokenRes.data?.encryptionKey,
        },
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
