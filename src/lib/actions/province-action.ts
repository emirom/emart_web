"use server";

import { CreateProvinceInput, UpdateProvinceInput } from "@lib/schemas";
import {
  deleteProvincesId,
  patchProvincesId,
  postProvinces,
} from "@lib/services/provinces/provinces";
import { revalidatePath } from "next/cache";

export async function postProvinceAction(data: CreateProvinceInput) {
  try {
    await postProvinces(data);
    revalidatePath("/dashboard/provinces");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function patchProvinceAction(
  id: string,
  data: UpdateProvinceInput,
) {
  try {
    await patchProvincesId(id, data);
    revalidatePath("/dashboard/provinces");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function deleteProvinceAction(id: string) {
  try {
    await deleteProvincesId(id);
    revalidatePath("/dashboard/provinces");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
