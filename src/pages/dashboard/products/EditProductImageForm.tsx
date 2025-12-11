"use client";

import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import ImageUploadButton from "@components/ImageUploadButton";
import { ImageUploader } from "@components/ui/image-uploader/ImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchProductImageAction } from "@lib/actions/product-image-action";
import { queryClient } from "@lib/apis/queryClient";
import { useGetProductMediasId } from "@lib/services/product-media/product-media";
import { patchProductMediasIdBody } from "@lib/validations/product-medias.validation";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UploadProductImageInput {
  file: File | null;
  productId?: string;
  altText?: string;
  caption?: string;
}

export default function EditProductImageForm({
  productId,
}: {
  productId: string;
}) {
  const { control, handleSubmit, reset, watch } =
    useForm<UploadProductImageInput>({
      defaultValues: {
        productId,
        file: null,
        altText: "",
        caption: "",
      },
      mode: "onChange",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(patchProductMediasIdBody) as any,
    });

  const { data: productMedia } = useGetProductMediasId(productId, {
    query: { queryKey: ["/product-medias", productId] },
  });

  const fileValue = watch("file");

  useEffect(() => {
    if (productMedia?.data) {
      reset({
        altText: productMedia?.data.altText ?? "",
        caption: productMedia?.data.caption ?? "",
        file: null,
      });
    }
  }, [productMedia?.data, reset]);

  const onSubmit: SubmitHandler<UploadProductImageInput> = async (data) => {
    if (!data.file && !productMedia?.data?.url) {
      toast.error("لطفاً یک فایل انتخاب کنید");
      return;
    }

    const formData = new FormData();
    if (data.file) formData.append("file", data.file);
    if (data.altText) formData.append("altText", data.altText);
    if (data.caption) formData.append("caption", data.caption);

    try {
      const result = await patchProductImageAction(productId, formData);
      queryClient.invalidateQueries({ queryKey: ["/product-medias"] });

      if (result.success) {
        toast.success("تصویر با موفقیت ویرایش شد");
        reset({ productId, file: null });
      } else {
        toast.error(result.error || "خطا در ویرایش تصویر");
      }
    } catch (err: unknown) {
      let message = "خطا در ویرایش";

      if (err instanceof AxiosError) {
        message = err.response?.data?.message ?? err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        control={control}
        name="file"
        placeholderText="تصویر را انتخاب کنید"
        url={productMedia?.data?.url}
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

      <ImageUploadButton />
    </form>
  );
}
