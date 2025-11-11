"use server";

import { CreateProductInput } from "@lib/schemas";
import {
  deleteProductsId,
  patchProductsId,
  postProducts,
} from "@lib/services/products/products";
import { revalidatePath } from "next/cache";

export async function postProductAction(data: CreateProductInput) {
  const response = await postProducts(data);
  if (response.success) {
    revalidatePath("/dashboard/products");
    return response.data.id;
  }
  throw new Error("افزودن محصول ناموفق بود");
}
export async function patchProductAction(id: string, data: CreateProductInput) {
  await patchProductsId(id, data);
  revalidatePath("/dashboard/products");
}

export async function deleteProductAction(id: string) {
  await deleteProductsId(id);
  revalidatePath("/dashboard/products");
}
