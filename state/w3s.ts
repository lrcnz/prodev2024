import { type W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import { atom } from 'jotai';

export const w3sSDKAtom = atom<{
  sdk: W3SSdk | null;
  isAuth: boolean;
}>({
  sdk: null,
  isAuth: false,
});
