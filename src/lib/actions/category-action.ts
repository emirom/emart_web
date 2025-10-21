"use server";

import { deleteCategoriesId } from "@lib/services/categories/categories";

export async function deleteCategoryAction(id: string) {
  await deleteCategoriesId(id);
}
