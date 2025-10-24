"use server";

import { CreateCategoryInput } from "@lib/schemas";
import {
  deleteCategoriesId,
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
