import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

export type LoginStep = "phone" | "otp";

type LoginState = {
  loginStep: LoginStep;
};

type LoginAction = {
  setStep: (step: LoginStep) => void;
  goBack: () => void;
};

export type LoginSlice = LoginState & LoginAction;

export const createLoginSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  LoginSlice
> = (set) => ({
  loginStep: "phone",
  setStep: (step) =>
    set((state) => {
      state.loginStep = step;
    }),
  goBack: () =>
    set((state) => {
      state.loginStep = "phone";
    }),
});
