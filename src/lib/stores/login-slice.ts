import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

export type LoginStep = "phone" | "otp";

type LoginState = {
  loginStep: LoginStep;
  phone: string | null;
};

type LoginAction = {
  setStep: (step: LoginStep) => void;
  goBack: () => void;
  setPhone: (phone: string) => void;
  clearPhone: () => void;
};

export type LoginSlice = LoginState & LoginAction;

export const createLoginSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  LoginSlice
> = (set) => ({
  loginStep: "phone",
  phone: null,
  setStep: (step) =>
    set((state) => {
      state.loginStep = step;
    }),
  setPhone: (phone) =>
    set((state) => {
      state.phone = phone;
    }),
  clearPhone: () =>
    set((state) => {
      state.phone = null;
    }),
  goBack: () =>
    set((state) => {
      state.loginStep = "phone";
    }),
});
