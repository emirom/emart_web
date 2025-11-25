"use server";

import { CreateLocationInput, UpdateLocationInput } from "@lib/schemas";
import {
  deleteLocationsId,
  patchLocationsId,
  postLocations,
} from "@lib/services/locations/locations";
import { revalidatePath } from "next/cache";

export async function postLocationAction(data: CreateLocationInput) {
  try {
    await postLocations(data);
    revalidatePath("/dashboard/locations");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "خطایی رخ داده است";
    }
  }
}

export async function patchLocationAction(
  id: string,
  data: UpdateLocationInput,
) {
  try {
    await patchLocationsId(id, data);
    revalidatePath("/dashboard/locations");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "خطایی رخ داده است";
    }
  }
}

export async function deleteLocationAction(id: string) {
  try {
    await deleteLocationsId(id);
    revalidatePath("/dashboard/locations");
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw "خطایی رخ داده است";
    }
  }
}
