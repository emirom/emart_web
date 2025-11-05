import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

export type StepperStates =
  | "address"
  | "receiverMethod"
  | "receiveTime"
  | "payment";

type StepperState = {
  currentStep: StepperStates;
};

type StepperAction = {
  changeStepperState: (step: StepperStates) => void;
};

export type StepperSlice = StepperState & StepperAction;

export const createStepperSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  StepperSlice
> = (set) => ({
  currentStep: "address",
  changeStepperState: (step) =>
    set((state) => {
      state.currentStep = step;
    }),
});
