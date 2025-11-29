"use server";

import { CreateStoreInput, UpdateStoreInput } from "@lib/schemas";
import {
  deleteStoresId,
  patchStoresId,
  postStores,
} from "@lib/services/stores/stores";
import { revalidatePath } from "next/cache";

export async function postStoreAction(data: CreateStoreInput) {
  try {
    await postStores(data);
    revalidatePath("/dashboard/stores");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function patchStoreAction(id: string, data: UpdateStoreInput) {
  try {
    await patchStoresId(id, data);
    revalidatePath("/dashboard/stores");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function deleteStoreAction(id: string) {
  try {
    await deleteStoresId(id);
    revalidatePath("/dashboard/stores");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
