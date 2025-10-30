"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import CustomImage from "@components/CustomImage";
import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import { cn } from "@components/lib/utils";
import { axiosInstance } from "@lib/configs/axios-instance";
import { ProductMediaResponse } from "@lib/schemas";
import { useFileStore } from "@lib/stores/store";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  title?: string;
  order?: number;
  caption?: string;
  altText?: string;
};

export default function UploadImageForm() {
  const { handleSubmit, control, formState } = useForm<FormValues>();
  const params = useParams();
  const { id } = { ...params };
  const { currentFile, clearFile } = useFileStore();

  const clean = (value: string | undefined): string | null =>
    value?.trim() ? value.trim() : null;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      if (!currentFile?.file) throw new Error("فایل انتخاب نشده است");
      if (!id || Array.isArray(id)) throw new Error("شناسه محصول معتبر نیست");

      const fd = new FormData();
      fd.append("file", currentFile.file);
      fd.append("productId", id);

      const title = clean(formData.title);
      const altText = clean(formData.altText);
      const caption = clean(formData.caption);

      if (altText) fd.append("altText", altText);
      if (caption) fd.append("caption", caption);

      return await axiosInstance<ProductMediaResponse>({
        method: "POST",
        url: "/product-medias",
        data: fd,
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearFile();
      toast.success("تصویر آپلود شد");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "خطا در آپلود تصویر");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "grid gap-4 p-4 bg-white rounded-xl shadow-sm",
        "max-w-3xl mx-auto w-full"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          "md:flex-row md:items-end md:justify-between"
        )}
      >
        <div className="flex-1">
          <label className="block text-sm font-medium text-tint-blue-500 mb-2">
            جزئیات فایل
          </label>
          <div
            className={cn(
              "border border-gray-200 rounded-lg p-3 text-[13px]",
              "text-tint-blue-500 space-y-1 bg-gray-50"
            )}
          >
            <p className="font-medium">{currentFile?.path || "بدون نام"}</p>
            <p>{currentFile ? "September 5, 2025" : "-"}</p>
            <p>{currentFile ? "320 KB" : "-"}</p>
            <p>{currentFile ? "250 × 250 pixels" : "-"}</p>
          </div>
        </div>
        <div className={cn("w-full md:w-[170px]")}>
          <CustomImage
            src={currentFile?.preview || "/images/placeholder.png"}
            alt={currentFile?.path || "preview"}
            width={170}
            height={170}
            className="rounded-lg shadow-md object-contain"
          />
        </div>
      </div>
      <FormInputField control={control} name="title" label="نام فایل" />
      <FormInputField
        control={control}
        name="order"
        label="ترتیب نمایش"
        type="number"
      />
      <FormTextareaField
        control={control}
        name="caption"
        label="توضیحات"
        placeholder="seo"
      />
      <FormInputField control={control} name="altText" label="متن جایگزین" />
      <SubmitButton disabled={formState.isSubmitting} />
    </form>
  );
}
