import { ExampleSlice } from "@lib/stores/example-slice";
import { LoginSlice } from "@lib/stores/login-slice";

export type Store = ExampleSlice & LoginSlice;
