import { type W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import { atom, useAtomValue } from 'jotai';

export const w3sSDKAtom = atom<{
  sdk: W3SSdk | null;
  isAuth: boolean;
}>({
  sdk: null,
  isAuth: false,
});

export const useW3sSDK = () => {
  const { sdk } = useAtomValue(w3sSDKAtom);
  return sdk;
};

export const useW3sSDKIsAuth = () => {
  const { isAuth } = useAtomValue(w3sSDKAtom);
  return isAuth;
};
