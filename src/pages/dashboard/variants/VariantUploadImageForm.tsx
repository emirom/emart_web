"use client";

import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import ImageUploadButton from "@components/ImageUploadButton";
import { ImageUploader } from "@components/ui/image-uploader/ImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { postProductImageAction } from "@lib/actions/product-image-action";
import { queryClient } from "@lib/apis/queryClient";
import { postProductMediasBody } from "@lib/validations/product-medias.validation";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UploadProductImageInput {
  file: File | null;
  productId: string;
  altText?: string;
  caption?: string;
  variantId?: string;
}

export default function VariantUploadImageForm({
  productId,
}: {
  productId: string;
}) {
  const params = useSearchParams();
  const variant = params!.get("variantId");
  const { control, handleSubmit, reset } = useForm<UploadProductImageInput>({
    defaultValues: {
      productId,
      file: null,
      altText: "",
      caption: "",
      variantId: variant!,
    },
    mode: "onChange",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(postProductMediasBody) as any,
  });

  const buildFormData = (data: UploadProductImageInput) => {
    const formData = new FormData();
    formData.append("file", data.file as File);
    formData.append("productId", data.productId);
    if (data.altText) formData.append("altText", data.altText);
    if (data.caption) formData.append("caption", data.caption);
    if (data.variantId) formData.append("varian", data.variantId);

    return formData;
  };

  const onSubmit: SubmitHandler<UploadProductImageInput> = async (data) => {
    if (!data.file) {
      toast.error("لطفاً یک تصویر انتخاب کنید");
      return;
    }

    try {
      const result = await postProductImageAction(buildFormData(data));

      queryClient.invalidateQueries({ queryKey: ["/product-medias"] });

      if (result.success) {
        toast.success("تصویر با موفقیت آپلود شد");

        reset({
          productId,
          file: null,
          altText: "",
          caption: "",
        });
      } else {
        toast.error(result.error || "خطا در آپلود تصویر");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("خطا در آپلود تصویر");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="توضیحات مربوط به تصویر محصول را وارد نمایید"
      />

      <ImageUploadButton />
    </form>
  );
}
