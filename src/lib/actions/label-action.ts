"use server";

import { CreateLabelInput, UpdateLabelInput } from "@lib/schemas";
import {
  deleteLabelsId,
  patchLabelsId,
  postLabels,
} from "@lib/services/labels/labels";
import { revalidatePath } from "next/cache";

export async function postLabelAction(label: CreateLabelInput) {
  await postLabels(label);
  revalidatePath("/dashboard/labels");
}

export async function patchLabelAction(id: string, data: UpdateLabelInput) {
  await patchLabelsId(id, data);
  revalidatePath("/dashboard/labels");
}

export async function deleteLabelAction(id: string) {
  await deleteLabelsId(id);
  revalidatePath("/dashboard/labels");
}
