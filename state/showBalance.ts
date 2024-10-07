import { atomWithStorage } from "jotai/utils";

export const showBalanceAtom = atomWithStorage<boolean>("show-balance", false);
