"use client";

import FormComboboxField from "@components/FormComboboxField";
import { FormInputField } from "@components/FormInputField";
import { postVariantAction } from "@lib/actions/variants-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateVariantInput } from "@lib/schemas";
import { useGetColors } from "@lib/services/colors/colors";
import { useGetProducts } from "@lib/services/products/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateVariantForm() {
  const { data: products } = useGetProducts({ skip: 0, limit: 10 });
  const { data: colors } = useGetColors({ skip: 0, limit: 10 });
  const { handleSubmit, control } = useForm<CreateVariantInput>();
  const onSubmit: SubmitHandler<CreateVariantInput> = async (data) => {
    try {
      await postVariantAction(data);
      queryClient.invalidateQueries({ queryKey: ["/variants"] });
      toast.success("تنوع افزوده شد");
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
      className="grid grid-cols-1 items-end gap-x-2 gap-y-3 md:grid-cols-2 lg:grid-cols-3"
    >
      <FormComboboxField
        control={control}
        name="productId"
        label="محصول"
        options={products?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        emptyMessage="محصول مورد نظر یافت نشد"
        searchPlaceholder="محصول مورد نظر را انتخاب کنید "
        placeholder="انتخاب محصول"
      />
      <FormComboboxField
        control={control}
        name="colorId"
        label="رنگ"
        options={colors?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        emptyMessage="رنگ مورد نظر یافت نشد"
        searchPlaceholder="رنگ مورد نظر را انتخاب کنید "
        placeholder="انتخاب رنگ"
      />
      <FormInputField control={control} name="sku" label="کد فروشگاه" />
      <FormInputField control={control} name="mpn" label="کد سازنده" />
      <FormInputField control={control} name="barcode" label="بارکد" />
    </form>
  );
}
