"use server"

import { CreateProductInput } from "@lib/schemas";
import { deleteProductsId, patchProductsId, postProducts } from "@lib/services/products/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function postProductAction(data: CreateProductInput) {

  const response = await postProducts(data);
  if (response.success) {

    revalidatePath("/dashboard/products");
    redirect(`/dashboard/products/add/${response.data.id}`);
  }
};



export async function patchProductAction(id: string, data: CreateProductInput) {
  await patchProductsId(id, data);
  revalidatePath("/dashboard/products");
}



export async function deleteProductAction(id: string) {
  await deleteProductsId(id);
  revalidatePath("/dashboard/products");
}
