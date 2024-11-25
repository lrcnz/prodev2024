import { atom } from 'jotai';

export const openedModalAtom = atom<'login' | 'deposit' | 'pay' | 'ton' | undefined>(undefined);
