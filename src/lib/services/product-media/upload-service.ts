import { axiosInstance } from "../../configs/axios-instance";
import { ProductMediaResponse } from "../../schemas";

export interface UploadProductMediaInput {
  file: File;
  productId: string;
  title?: string;
  altText?: string;
  caption?: string;
  order?: number;
}

export const uploadProductMedia = async (
  data: UploadProductMediaInput,
): Promise<ProductMediaResponse> => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("productId", data.productId);

  if (data.title) formData.append("title", data.title);
  if (data.altText) formData.append("altText", data.altText);
  if (data.caption) formData.append("caption", data.caption);
  if (data.order !== undefined) formData.append("order", data.order.toString());

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-medias`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "File upload failed");
  }

  return response.json();
};
