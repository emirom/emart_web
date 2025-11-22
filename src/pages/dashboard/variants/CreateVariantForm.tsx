"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormComboboxField from "@components/FormComboboxField";
import { FormInputField } from "@components/FormInputField";
import FormSwitchField from "@components/FormSwitchField";
import { FormTextareaField } from "@components/FormTextareaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postVariantAction } from "@lib/actions/variants-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateVariantInput } from "@lib/schemas";
import { useGetColors } from "@lib/services/colors/colors";
import { useGetProducts } from "@lib/services/products/products";
import { postVariantsBody } from "@lib/validations/variant.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateVariantForm() {
  const { data: products } = useGetProducts({ skip: 0, limit: 10 });
  const { data: colors } = useGetColors({ skip: 0, limit: 10 });

  const { handleSubmit, control, reset } = useForm<CreateVariantInput>({
    defaultValues: {
      productId: "",
      colorId: "",
      sku: "",
      publicId: "",
      barcode: "",
      mpn: "",
      titleOverride: "",
      descriptionOverride: "",
      isActive: false,
      isApproved: false,
      slug: "",
      metaTitle: "",
      metaDescription: "",
      attributeComboKey: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(postVariantsBody) as any,
  });

  const onSubmit: SubmitHandler<CreateVariantInput> = async (data) => {
    try {
      await postVariantAction(data);
      queryClient.invalidateQueries({ queryKey: ["/variants"] });
      toast.success("تنوع افزوده شد");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطا در ارسال داده");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 items-stretch gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3"
    >
      <FormComboboxField
        control={control}
        name="productId"
        label="محصول"
        options={products?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        emptyMessage="محصول یافت نشد"
        searchPlaceholder="جستجوی محصول"
        placeholder="انتخاب محصول"
      />
      <FormComboboxField
        control={control}
        name="colorId"
        label="رنگ"
        options={colors?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        emptyMessage="رنگ یافت نشد"
        searchPlaceholder="جستجوی رنگ"
        placeholder="انتخاب رنگ"
      />
      <FormInputField control={control} name="sku" label="SKU (کد فروشگاه)" />
      <FormInputField control={control} name="publicId" label="شناسه عمومی" />
      <FormInputField control={control} name="barcode" label="بارکد" />
      <FormInputField control={control} name="mpn" label="MPN (کد سازنده)" />
      <FormInputField
        control={control}
        name="titleOverride"
        label="عنوان سفارشی"
      />

      <FormInputField control={control} name="slug" label="Slug" />
      <FormInputField
        control={control}
        name="metaTitle"
        label="فراداده(meta data)"
      />
      <FormInputField
        control={control}
        name="attributeComboKey"
        label="کلید ویژگی‌ها (attributeComboKey)"
      />

      <FormSwitchField control={control} name="isActive" label="وضعیت" />
      <FormSwitchField control={control} name="isApproved" label="تأیید شده؟" />
      <div className="flex items-stretch gap-2 col-span-1 md:col-span-2 lg:col-span-3">
        <FormTextareaField
          control={control}
          name="metaDescription"
          label="توضیحات فراداده(meta data)"
          className="h-30"
          placeholder="توضیحات فراداده"
        />
        <FormTextareaField
          control={control}
          name="descriptionOverride"
          label="بازنویسی عنوان"
          className="h-30"
          placeholder="بازنویسی عنوان "
        />
      </div>
      <SubmitButton />
    </form>
  );
}
