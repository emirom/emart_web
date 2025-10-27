"use server";

import { CreateAttributeInput } from "@lib/schemas";
import {
  deleteAttributesId,
  patchAttributesId,
  postAttributes,
} from "@lib/services/attributes/attributes";
import { revalidatePath } from "next/cache";

export async function postAttributeAction(data: CreateAttributeInput) {
  await postAttributes(data);
}

export async function putAttributeAction(
  id: string,
  data: Partial<CreateAttributeInput>,
) {
  await patchAttributesId(id, data);
  revalidatePath('/dashboard/attributes')

}

export async function deleteAttributeAction(id: string) {
  await deleteAttributesId(id);
  revalidatePath("/dashboard/attributes");
}


