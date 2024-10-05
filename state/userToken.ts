import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userIdAtom = atomWithStorage<{
  userId: string;
  password: string;
  email: string;
} | null>('user-id', null);

export const userTokenAtom = atom<{
  userId: string;
  encryptionKey: string;
  userToken: string;
} | null>(null);
