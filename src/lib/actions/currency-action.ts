"use server";

import { CreateCurrencyInput, UpdateCurrencyInput } from "@lib/schemas";
import {
  deleteCurrenciesId,
  patchCurrenciesId,
  postCurrencies,
} from "@lib/services/currencies/currencies";
import { revalidatePath } from "next/cache";

export async function postCurrencyAction(data: CreateCurrencyInput) {
  try {
    await postCurrencies(data);
    revalidatePath("/dashboard/currencies");
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "خطایی رخ داده است",
    );
  }
}
export async function patchCurrencyAction(
  id: string,
  data: UpdateCurrencyInput,
) {
  try {
    await patchCurrenciesId(id, data);
    revalidatePath("/dashboard/currencies");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
export async function deleteCurrencyAction(id: string) {
  try {
    await deleteCurrenciesId(id);
    revalidatePath("/dashboard/currencies");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
