"use server";

import { CreateUnitInput, UpdateUnitInput } from "@lib/schemas";
import {
  deleteUnitsId,
  patchUnitsId,
  postUnits,
} from "@lib/services/units/units";
import { revalidatePath } from "next/cache";

export async function postUnitAction(data: CreateUnitInput) {
  await postUnits(data);
  revalidatePath("/dashboard/units");
}

export async function updateUnitAction(id: string, data: UpdateUnitInput) {
  await patchUnitsId(id, data);
  revalidatePath("/dashboard/units");
}

export async function deleteUnitAction(id: string) {
  await deleteUnitsId(id);
  revalidatePath("/dashboard/units");
}
