"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { putAttributeAction } from "@lib/actions/attribute-action";
import { queryClient } from "@lib/apis/queryClient";
import { attributeUnits } from "@lib/constants/attribute-units";
import { UpdateAttributeInput } from "@lib/schemas";
import { useGetAttributesId } from "@lib/services/attributes/attributes";
import { useGetCategories } from "@lib/services/categories/categories";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditAttributeForm({ id }: { id: string }) {
  const { data: attribute } = useGetAttributesId(id, {
    query: { queryKey: ["/attributes", id] },
  });
  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { handleSubmit, control, formState, reset } =
    useForm<Partial<UpdateAttributeInput>>();

  useEffect(() => {
    reset({
      ...attribute?.data,
    });
  }, [attribute?.data, reset]);

  const onSubmit: SubmitHandler<Partial<UpdateAttributeInput>> = async (
    data,
  ) => {
    try {
      await putAttributeAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/attributes"] });
      toast.success("ویژگی ویرایش شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid gap-4 items-end
                 grid-cols-1
                 sm:grid-cols-2
                 lg:grid-cols-3"
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

      <div className="col-span-1 sm:col-span-2 lg:col-span-1 w-full">
        <SubmitButton className="w-full" disabled={!formState.isDirty} />
      </div>
    </form>
  );
}
