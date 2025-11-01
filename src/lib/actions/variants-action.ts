'use server';

import { CreateVariantInput } from "@lib/schemas";
import { postVariants } from "@lib/services/variants/variants";
import { revalidatePath } from "next/cache";

export async function postVariantAction(data: CreateVariantInput) {
  await postVariants(data)
  revalidatePath('/dashboard/variants');
}
