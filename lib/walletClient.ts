import { initiateUserControlledWalletsClient } from '@circle-fin/user-controlled-wallets';

export const userControlledWalletsClient = initiateUserControlledWalletsClient({
  apiKey: 'TEST_API_KEY:0d95d041aeb91c9ae1c73b08e58b90db:6c1d22381cdb81c1d7bc0174b387d13d',
  baseUrl: 'https://api.circle.com',
  userAgent: 'PW-USER-WALLET-WEB-SAMPLE-APP',
});
