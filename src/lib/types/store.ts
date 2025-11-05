import { CategoryListSlice } from "@lib/stores/category-attr-slice";
import { ExampleSlice } from "@lib/stores/example-slice";
import { LoginSlice } from "@lib/stores/login-slice";
import { FileSlice } from "@lib/stores/product-file-slice";
import { StepperSlice } from "@lib/stores/stepper-slice";

export type Store = ExampleSlice &
  LoginSlice &
  CategoryListSlice &
  FileSlice &
  StepperSlice;
