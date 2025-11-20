"use server";

import { CreateInsuranceInput } from "@lib/schemas";
import {
  deleteInsurancesId,
  patchInsurancesId,
  postInsurances,
} from "@lib/services/insurances/insurances";
import { revalidatePath } from "next/cache";

export async function postInsuranceAction(data: CreateInsuranceInput) {
  await postInsurances(data);
  revalidatePath("/dashboard/insurances");
}

export async function patchInsuranceAction(
  id: string,
  data: CreateInsuranceInput,
) {
  await patchInsurancesId(id, data);
  revalidatePath("/dashboard/insurance");
}

export async function deleteInsuranceAction(id: string) {
  await deleteInsurancesId(id);
  revalidatePath("/dashboard/insurance");
}
