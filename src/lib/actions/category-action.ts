"use server";

import { CreateCategoryInput, UpdateCategoryInput } from "@lib/schemas";
import {
  deleteCategoriesId,
  patchCategoriesId,
  postCategories,
} from "@lib/services/categories/categories";
import { revalidatePath } from "next/cache";

export async function postCategoryAction(data: CreateCategoryInput) {
  await postCategories(data);
  revalidatePath("/dashboard");
}

export async function deleteCategoryAction(id: string) {
  await deleteCategoriesId(id);
  revalidatePath("/dashboard");
}

export async function putCategoryAction(id: string, data: UpdateCategoryInput) {
  await patchCategoriesId(id, data);
  revalidatePath("/dashboard");
}
