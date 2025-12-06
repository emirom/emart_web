"use client";

import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import ImageUploadButton from "@components/ImageUploadButton";
import { ImageUploader } from "@components/ui/image-uploader/ImageUploader";
import { useAppStore } from "@lib/stores/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UploadProductMediaInput {
  file: File | null;
  productId: string;
  title?: string;
  altText?: string;
  caption?: string;
  order?: number;
}

interface AddProductImageFormProps {
  productId: string;
}

export default function AddProductImageForm({
  productId,
}: AddProductImageFormProps) {
  const { control, handleSubmit, reset } = useForm<UploadProductMediaInput>({
    defaultValues: { productId, file: null },
  });

  const currentFile = useAppStore((state) => state.currentFile);

  const onSubmit: SubmitHandler<UploadProductMediaInput> = async (data) => {
    if (!data.file) {
      toast.error("لطفاً یک فایل انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("productId", data.productId);
    if (data.title) formData.append("title", data.title);
    if (data.altText) formData.append("altText", data.altText);
    if (data.caption) formData.append("caption", data.caption);
    if (data.order != null) formData.append("order", data.order.toString());

    try {
      const res = await fetch("/dashboard/products/add/" + data.productId, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "خطا در آپلود تصویر");
      }

      toast.success("تصویر با موفقیت اضافه شد");
      reset({ productId, file: null });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("خطا در آپلود تصویر");
      }
    }
  };

  const onClose = () => console.log("close");

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        control={control}
        name="file"
        placeholderText="تصویر را اینجا رها کنید یا کلیک کنید"
      />
      <FormInputField control={control} name="title" label="عنوان" />
      <FormInputField
        control={control}
        name="altText"
        label="متن جایگزین (alt)"
      />
      <FormInputField
        type="number"
        control={control}
        name="order"
        label="ترتیب"
      />
      <FormInputField
        control={control}
        name="productId"
        className="opacity-0 h-0 w-0"
        hidden
      />
      <FormTextareaField
        control={control}
        name="caption"
        label="توضیحات"
        placeholder="توضیحات مربوط به تصویر را وارد نمایید"
      />

      <ImageUploadButton currentFile={currentFile} onClose={onClose} />
    </form>
  );
}
