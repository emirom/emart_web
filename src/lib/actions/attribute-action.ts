"use server";

import { CreateAttributeInput } from "@lib/schemas";
import {
  patchAttributesId,
  postAttributes,
} from "@lib/services/attributes/attributes";

export async function postAttributeAction(data: CreateAttributeInput) {
  await postAttributes(data);
}

export async function putAttributeAction(
  id: string,
  data: CreateAttributeInput,
) {
  await patchAttributesId(id, data);
}
