"use server";

import { axiosInstance } from "@lib/configs/axios-instance";
import { ProductMediaResponse } from "@lib/schemas";
import { AxiosError } from "axios";

export async function postProductImageAction(formData: FormData) {
  try {
    const response = await axiosInstance<ProductMediaResponse>({
      url: "/product-medias",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "خطا در آپلود تصویر");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("خطای ناشناخته در آپلود تصویر");
  }
}

export async function deleteProductImageAction(id: string) {
  try {
    const response = await axiosInstance<ProductMediaResponse>({
      url: `/product-medias/${id}`,
      method: "DELETE",
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "خطا در حذف تصویر");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("خطای ناشناخته در حذف تصویر");
  }
}
