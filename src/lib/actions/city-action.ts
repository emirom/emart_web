"use server";

import { CreateCity, UpdateCity } from "@lib/schemas";
import {
  deleteCitiesId,
  patchCitiesId,
  postCities,
} from "@lib/services/cities/cities";
import { revalidatePath } from "next/cache";

export async function postCityAction(data: CreateCity) {
  try {
    await postCities(data);
    revalidatePath("/dashboard/cities");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
export async function patchCityAction(id: string, data: UpdateCity) {
  try {
    await patchCitiesId(id, data);
    revalidatePath("/dashboard/cities");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function deleteCityAction(id: string) {
  try {
    await deleteCitiesId(id);
    revalidatePath("/dashboard/cities");
    revalidatePath("/dashboard/cities/" + id);
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
