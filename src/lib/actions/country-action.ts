"use server";

import { CreateCountryInput, UpdateCountryInput } from "@lib/schemas";
import {
  deleteCountriesId,
  patchCountriesId,
  postCountries,
} from "@lib/services/countries/countries";
import { revalidatePath } from "next/cache";

export async function postCountryAction(data: CreateCountryInput) {
  try {
    await postCountries(data);
    revalidatePath("/dashboard/countries");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function deleteCountryAction(id: string) {
  try {
    await deleteCountriesId(id);
    revalidatePath("/dashboard/countries");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function patchCountryAction(id: string, data: UpdateCountryInput) {
  try {
    await patchCountriesId(id, data);
    revalidatePath("/dashboard/countries");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
