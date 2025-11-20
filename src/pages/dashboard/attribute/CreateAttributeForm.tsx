"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { postAttributeAction } from "@lib/actions/attribute-action";
import { queryClient } from "@lib/apis/queryClient";
import { attributeUnits } from "@lib/constants/attribute-units";
import { CreateAttributeInput } from "@lib/schemas";
import { useGetCategories } from "@lib/services/categories/categories";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateAttributeForm() {
  const { control, handleSubmit, formState, reset } =
    useForm<CreateAttributeInput>({
      defaultValues: {
        iconUrl: "https://example.com/icons/size.png",
      },
    });
  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const onSubmit: SubmitHandler<CreateAttributeInput> = async (data) => {
    try {
      await postAttributeAction(data);
      queryClient.invalidateQueries({ queryKey: ["/attributes"] });
      toast.success("ویژگی اضافه شد");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid gap-2 items-end
                      grid-cols-1
                      sm:grid-cols-2
                      "
    >
      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <FormAutocomplete
          label="انتخاب دسته"
          name="categoryId"
          options={categories?.data ?? []}
          getOptionLabel={(otp) => otp.name}
          getOptionValue={(otp) => otp.id}
          control={control}
        />
      </div>

      <div className="col-span-1">
        <FormInputField label="نام ویژگی" name="title" control={control} />
      </div>

      <div className="col-span-1">
        <FormInputField label="واحد ویژگی" name="unit" control={control} />
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <FormScrollableSelectField
          options={attributeUnits}
          getOptionLabel={(opt) => opt.name}
          getOptionValue={(opt) => opt.value}
          control={control}
          label="نوع تایپ"
          name="type"
        />
      </div>

      <div className="col-span-1 sm:col-span-2  mt-2 w-full">
        <SubmitButton className="w-full" disabled={!formState.isDirty} />
      </div>
    </form>
  );
}
