import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets';

export const userControlledWalletsClient = initiateUserControlledWalletsClient({
  apiKey: process.env.NEXT_CIRCLE_API_KEY!,
  baseUrl: 'https://api.circle.com',
  userAgent: 'PW-USER-WALLET-WEB-SAMPLE-APP',
});
