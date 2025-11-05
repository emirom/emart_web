import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

type ExampleState = {
  exampleSlice: number;
};

type ExampleAction = {
  changeExampleSlice: (index: number) => void;
};

export type ExampleSlice = ExampleState & ExampleAction;

export const createExampleSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  ExampleSlice
> = (set) => ({
  exampleSlice: 0,
  changeExampleSlice: (index) =>
    set((state) => {
      state.exampleSlice = index;
    }),
});
