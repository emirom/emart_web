"use server";

import { CreateGuaranteeInput, UpdateGuaranteeInput } from "@lib/schemas";
import {
  deleteGuaranteesId,
  patchGuaranteesId,
  postGuarantees,
} from "@lib/services/guarantees/guarantees";
import { revalidatePath } from "next/cache";

export async function postGuaranteeAction(data: CreateGuaranteeInput) {
  await postGuarantees(data);
  revalidatePath("/dashboard/guarantees");
}

export async function patchGuaranteeAction(
  id: string,
  data: UpdateGuaranteeInput,
) {
  await patchGuaranteesId(id, data);
  revalidatePath("/dashboard/guarantees");
}

export async function deleteGuaranteeAction(id: string) {
  await deleteGuaranteesId(id);
  revalidatePath("/dashboard/guarantees");
}
