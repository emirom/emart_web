"use server";

import { revalidatePath } from "next/cache";
import { deleteProductMediasId } from "@lib/services/product-media/product-media";

export async function deleteProductMediaAction(id: string) {
  try {
    const response = await deleteProductMediasId(id);
    revalidatePath("/dashboard/sections");
    return { success: true, data: response };
  } catch (error: unknown) {
    console.error("Error deleting product media:", error);
    const errorMessage =
      error instanceof Error ? error.message : "خطایی رخ داده است";
    return { success: false, error: errorMessage };
  }
}
