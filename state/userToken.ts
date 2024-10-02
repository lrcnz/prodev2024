import { atomWithStorage } from "jotai/utils";

export const userTokenAtom = atomWithStorage<{
  userId: string;
  encryptionKey: string;
  userToken: string;
} | null>("user-token", null);
