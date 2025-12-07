"use server";

export async function postProductImageAction(formData: FormData) {
  try {
    const response = await fetch("http://localhost:3010/product-medias", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Upload Error:", response.status, data);
      throw new Error(data?.error || "خطا در آپلود تصویر");
    }

    return data;
  } catch (error: any) {
    console.error("postProductImageAction ERROR:", error);
    throw new Error(error.message || "خطای ناشناخته");
  }
}
