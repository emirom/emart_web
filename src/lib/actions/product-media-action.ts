"use server";

import { axiosInstance } from "@lib/configs/axios-instance";
import { CreateProductMediaInput } from "@lib/types/file-with-preview";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

export async function postProductMediaAction(data: CreateProductMediaInput) {
  try {
    return axiosInstance<CreateProductMediaInput>({
      url: "/product-medias",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("خطایی رخ داده است");
    }
  }
  revalidatePath("/dashboard/products");
}
