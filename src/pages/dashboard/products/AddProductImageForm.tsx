"use client";

import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import { ImageUploader } from "@components/ui/image-uploader/ImageUploader";
import { postProductImageAction } from "@lib/actions/product-image-action";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UploadProductImageInput {
  file: File | null;
  productId: string;
  altText?: string;
  caption?: string;
}

export default function AddProductImageForm({
  productId,
}: {
  productId: string;
}) {
  const { control, handleSubmit, reset } = useForm<UploadProductImageInput>({
    defaultValues: {
      productId,
      file: null,
      altText: "",
      caption: "",
    },
  });

  const onSubmit: SubmitHandler<UploadProductImageInput> = async (data) => {
    if (!data.file) {
      toast.error("لطفاً یک فایل انتخاب کنید");
      return;
    }

    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("productId", data.productId);

    if (data.altText) formData.append("altText", data.altText);
    if (data.caption) formData.append("caption", data.caption);

    try {
      const result = await postProductImageAction(formData);

      if (result.success) {
        toast.success("تصویر با موفقیت آپلود شد");
        reset({ productId, file: null });
      } else {
        toast.error(result.error || "خطا در آپلود تصویر");
      }
    } catch (err: any) {
      toast.error(err.message || "خطا در آپلود");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        control={control}
        name="file"
        placeholderText="تصویر را انتخاب کنید"
      />

      <FormInputField
        control={control}
        name="altText"
        label="متن جایگزین (alt)"
      />
      <FormTextareaField
        control={control}
        name="caption"
        label="توضیحات"
        placeholder="توضیحات مربوط به تصویر محصول را وارد نمایید "
      />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
        آپلود تصویر
      </button>
    </form>
  );
}
