import { atomWithStorage } from 'jotai/utils';

export const kycAtom = atomWithStorage<Record<string, boolean>>('kyc', {});
