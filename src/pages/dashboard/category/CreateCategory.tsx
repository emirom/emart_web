"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import FormSwitchField from "@components/FormSwitchField";
import { postCategoryAction } from "@lib/actions/category-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateCategoryInput } from "@lib/schemas";
import { useGetCategories } from "@lib/services/categories/categories";
import { useGetUnits } from "@lib/services/units/units";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCategoryPage() {
  const { control, handleSubmit, reset } = useForm<CreateCategoryInput>({
    defaultValues: {
      iconUrl: "https://example.com/icon.png",
      level: 2,
    },
  });
  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { data: units } = useGetUnits({ skip: 0, limit: 10 });
  const onSubmit: SubmitHandler<CreateCategoryInput> = async (data) => {
    try {
      await postCategoryAction(data);
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
      toast.success("دسته بندی اضافه شد");
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی در ارسال اطلاعات رخ داد");
      }
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-tint-blue-500">افزودن دسته بندی</h2>
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
          <SubmitButton className="py-5" />
        </div>
      </form>
    </div>
  );
}
