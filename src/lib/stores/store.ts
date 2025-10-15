import { Store } from "@lib/types/store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createExampleSlice } from "./example-slice";
import { createLoginSlice } from "./login-slice";

export const useAppStore = create<Store>()(
  devtools(
    immer((...a) => ({
      ...createExampleSlice(...a),
      ...createLoginSlice(...a),
    })),
    {
      name: "app-store",
    },
  ),
);
