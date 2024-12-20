import { type TonClient } from '@ton/ton';
import { atom } from 'jotai';

export const depositValueAtom = atom('0');
export const tonClientAtom = atom<TonClient>();
