import { Store } from "@lib/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createExampleSlice } from "./example-slice";
import { createLoginSlice } from "./login-slice";

export const useAppStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createExampleSlice(...a),
        ...createLoginSlice(...a),
      })),
      {
        name: "phone-store",
        partialize: (state) => ({ phone: state.phone }),
      },
    ),
    {
      name: "app-store-devtools",
    },
  ),
);
