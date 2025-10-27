"use server";

import { CreateBrandInput, UpdateBrandInput } from "@lib/schemas";
import {
  deleteBrandsId,
  patchBrandsId,
  postBrands,
} from "@lib/services/brands/brands";
import { revalidatePath } from "next/cache";

export async function postBrandAction(data: CreateBrandInput) {
  await postBrands(data);
  revalidatePath("/dashboard/brands");
}

export async function patchBrandAction(id: string, data: UpdateBrandInput) {
  await patchBrandsId(id, data);
  revalidatePath("/dashboard/brands");
}

export async function deleteBrandAction(id: string) {
  await deleteBrandsId(id);
  revalidatePath("/dashboard/brands");
}
