import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

type PaginationState = {
  currentPage: number;
};

type PaginationAction = {
  previewPage: () => void;
  nextPage: () => void;
  setPage?: (page: number) => void;
};

export type PaginationSlice = PaginationState & PaginationAction;

export const createPaginationSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  PaginationSlice
> = (set) => ({
  currentPage: 0,
  previewPage: () =>
    set((state) => {
      if (state.currentPage > 0) {
        state.currentPage = state.currentPage - 1;
      }
    }),
  nextPage: () =>
    set((state) => {
      state.currentPage = state.currentPage + 1;
    }),
  setPage: (page) =>
    set((state) => {
      state.currentPage = page;
    }),
});
