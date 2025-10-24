"use server";

import { CreateAttributeInput } from "@lib/schemas";
import { postAttributes } from "@lib/services/attributes/attributes";

export async function postAttributeAction(data: CreateAttributeInput) {
  await postAttributes(data);
}
