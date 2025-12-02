"use server";

import { CreateInventoryInput } from "@lib/schemas";
import { postInventories } from "@lib/services/inventories/inventories";
import { revalidatePath } from "next/cache";

export async function postInventoryAction(data: CreateInventoryInput) {
  try {
    await postInventories(data);
    revalidatePath("/dashboard/inventory");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
}
