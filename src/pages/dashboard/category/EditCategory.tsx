"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import FormSwitchField from "@components/FormSwitchField";
import { putCategoryAction } from "@lib/actions/category-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateCategoryInput } from "@lib/schemas";
import {
  useGetCategories,
  useGetCategoriesId,
} from "@lib/services/categories/categories";
import { useGetUnits } from "@lib/services/units/units";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditCategory({ id }: { id: string }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CreateCategoryInput>({
    defaultValues: {
      iconUrl: "https://example.com/icon.png",
      level: 2,
    },
  });
  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { data: units } = useGetUnits({ skip: 0, limit: 10 });
  const { data: category } = useGetCategoriesId(id, {
    query: { queryKey: ["/categories", id] },
  });
  useEffect(() => {
    reset({ ...category?.data });
  }, [category, reset]);

  const onSubmit: SubmitHandler<CreateCategoryInput> = async (data) => {
    try {
      await putCategoryAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
      toast.success("ویرایش دسته بندی انجام شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی در ارسال اطلاعات رخ داد ویرایش دسته بندی");
      }
    }
  };
  return (
    <div className="w-full ">
      <h2 className="text-tint-blue-500">ویرایش {category?.data?.name}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2 p-2"
      >
        <div className="flex items-stretch gap-2">
          <FormAutocomplete
            options={categories?.data ?? []}
            name="parentId"
            label="دسته پدر"
            getOptionLabel={(opt) => opt.name}
            getOptionValue={(opt) => opt.id}
            control={control}
          />
          <FormAutocomplete
            options={units?.data ?? []}
            name="unitId"
            label="واحد شمارش"
            getOptionLabel={(opt) => opt.title}
            getOptionValue={(opt) => opt.id}
            control={control}
          />
        </div>
        <div className="flex items-start gap-2 my-2">
          <FormInputField
            label="عنوان دسته - فارسی"
            name="name"
            control={control}
          />
          <FormInputField
            label="عنوان دسته - انگلیسی"
            name="enName"
            control={control}
          />
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-5">
            <FormSwitchField
              label="وضعیت نمایش"
              name="isActive"
              control={control}
            />
            <FormSwitchField
              label="نمایش در منو"
              name="showInMenu"
              control={control}
            />
          </div>
          <SubmitButton className="py-5" disabled={!isDirty} />
        </div>
      </form>
    </div>
  );
}
