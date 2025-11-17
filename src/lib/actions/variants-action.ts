"use server";

import { CreateVariantInput, UpdateVariantInput } from "@lib/schemas";
import {
  deleteVariantsId,
  patchVariantsId,
  postVariants,
} from "@lib/services/variants/variants";
import { revalidatePath } from "next/cache";

export async function postVariantAction(data: CreateVariantInput) {
  await postVariants(data);
  revalidatePath("/dashboard/variants");
}

export async function deleteVariantAction(id: string) {
  try {
    await deleteVariantsId(id);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}

export async function patchVariantAction(id: string, data: UpdateVariantInput) {
  await patchVariantsId(id, data);
  revalidatePath("/dashboard/variants");
}
