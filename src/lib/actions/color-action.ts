"use server"

import { CreateColorInput } from "@lib/schemas";
import { postColors } from "@lib/services/colors/colors";
import { revalidatePath } from "next/cache";

export async function postColorAction(data: CreateColorInput) {
  await postColors(data);
  revalidatePath('/dashboard/colors')

}


