import { atom } from "jotai";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

export const w3sSDKAtom = atom<{
  sdk: W3SSdk | null;
  isAuth: boolean;
}>({
  sdk: null,
  isAuth: false,
});
