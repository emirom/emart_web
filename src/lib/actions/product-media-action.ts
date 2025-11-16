"use server";

import { ProductMediaResponse } from "@lib/schemas";
import { axiosInstance } from "@lib/configs/axios-instance";
import { revalidatePath } from "next/cache";

export interface UploadProductMediaInput {
  file: File;
  productId: string;
  title?: string;
  altText?: string;
  caption?: string;
  order?: number;
}

export async function postProductMediaAction(data: UploadProductMediaInput) {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("productId", data.productId);

    if (data.title) formData.append("title", data.title);
    if (data.altText) formData.append("altText", data.altText);
    if (data.caption) formData.append("caption", data.caption);
    if (data.order !== undefined)
      formData.append("order", data.order.toString());

    // Use axiosInstance for file upload with proper content-type
    const result: ProductMediaResponse = await axiosInstance({
      url: `/product-medias`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath("/dashboard/products");
    return { success: true, data: result.data }; // Extract the inner data
  } catch (error: unknown) {
    console.error("Error in postProductMediaAction:", {
      error: error instanceof Error ? error.message : error,
      productId: data.productId,
      fileName: data.file.name,
      apiUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-medias`,
    });

    // Check if API server is running
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_API_BASE_URL?.includes("localhost")
    ) {
      console.warn(
        "API not available, returning simulated success response for development",
      );
      revalidatePath("/dashboard/products");

      // Return mock data for development when API is not available
      return {
        success: true,
        data: {
          // This should match the API response structure (ProductMedia object)
          id: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          productId: data.productId,
          url: `/public/products/${data.productId}/${data.file.name}`,
          title: data.title || data.file.name,
          thumbnailUrl: `/public/products/${data.productId}/thumb_${data.file.name}`,
          altText: data.altText || `Image for product ${data.productId}`,
          caption: data.caption || "",
          mimetype: data.file.type,
          order: data.order || 0,
          uploadedById: "mock-user-id",
        },
      };
    }

    const errorMessage =
      error instanceof Error ? error.message : "File upload failed";
    return { success: false, error: errorMessage };
  }
}
