import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const planAtom = atomWithStorage<'savings' | 'growth'>('plan', 'savings');

export const switchPlanModalOpenedAtom = atom<boolean>(false);
