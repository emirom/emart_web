"use server";

import { revalidatePath } from "next/cache";
import { uploadProductMedia, UploadProductMediaInput } from "@lib/services/product-media/upload-service";

export async function uploadProductMediaAction(data: UploadProductMediaInput) {
  try {
    const response = await uploadProductMedia(data);
    revalidatePath("/dashboard/sections");
    return { success: true, data: response };
  } catch (error: unknown) {
    console.error("Error uploading product media:", error);
    const errorMessage = error instanceof Error ? error.message : "خطایی رخ داده است";
    return { success: false, error: errorMessage };
  }
}
