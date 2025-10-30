"use server";

import { axiosInstance } from "@lib/configs/axios-instance";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function postProductImageAction(
  file: File,
  {
    productId,
    title,
    altText,
    caption,
    order,
  }: {
    productId: string;
    title?: string | null;
    altText?: string | null;
    caption?: string | null;
    order?: number | null;
  }
) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId);

    if (title != null && title !== "") formData.append("title", title);
    if (altText != null && altText !== "") formData.append("altText", altText);
    if (caption != null && caption !== "") formData.append("caption", caption);
    if (order != null) formData.append("order", order.toString());

    const response = await axiosInstance.post("/product-medias", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    revalidatePath(`/dashboard/products/add/${productId}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "خطا در آپلود تصویر");
    }
    throw new Error("خطای ناشناخته در آپلود تصویر");
  }
}