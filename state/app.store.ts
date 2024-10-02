import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AppState = {};

type AppActions = {};

export const useAppStore = create(immer<AppState & AppActions>(() => ({})));
