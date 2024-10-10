import { atomWithStorage } from 'jotai/utils';

export const kycAtom = atomWithStorage<boolean>('kyc', false);
