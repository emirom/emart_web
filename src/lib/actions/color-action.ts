"use server";

import { CreateColorInput, UpdateColorInput } from "@lib/schemas";
import {
  deleteColorsId,
  patchColorsId,
  postColors,
} from "@lib/services/colors/colors";
import { revalidatePath } from "next/cache";

export async function postColorAction(data: CreateColorInput) {
  await postColors(data);
  revalidatePath("/dashboard/colors");
}

export async function patchColorAction(id: string, data: UpdateColorInput) {
  await patchColorsId(id, data);
  revalidatePath("/dashboard/colors");
}

export async function deleteColorAction(id: string) {
  await deleteColorsId(id);
  revalidatePath("/dashboard/colors");
}
