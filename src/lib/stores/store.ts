// lib/stores/store.ts
import { Store } from "@lib/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createCategoryListSlice } from "./category-attr-slice";
import { createExampleSlice } from "./example-slice";
import { createLoginSlice } from "./login-slice";

export const useAppStore = create<Store>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createExampleSlice(...a),
        ...createLoginSlice(...a),
        ...createCategoryListSlice(...a),
      })),
      {
        name: "phone-store",
        partialize: (state) => ({ phone: state.phone }),
      },
    ),
    { name: "app-store-devtools" },
  ),
);
