"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { cn } from "@components/lib/utils";
import { queryClient } from "@lib/apis/queryClient";
import { attributeUnits } from "@lib/constants/attribute-units";
import { CreateAttributeInput } from "@lib/schemas";
import { patchAttributesId } from "@lib/services/attributes/attributes";
import { useGetCategories } from "@lib/services/categories/categories";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditAttribute({ id }: { id: string }) {
  const { control, handleSubmit, formState, reset } =
    useForm<CreateAttributeInput>({
      defaultValues: {
        iconUrl: "https://example.com/icons/size.png",
      },
    });

  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  // const { data: attribute } = useGetAttributesId(id);

  // useEffect(() => {
  //   reset({ ...attribute?.data });
  // }, [attribute, reset]);
  const onSubmit: SubmitHandler<CreateAttributeInput> = async (data) => {
    try {
      await patchAttributesId(id, data);
      queryClient.invalidateQueries({ queryKey: ["/attributes"] });
      toast.success("ویژگی ویرایش شد");
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی در ارسال اطلاعات رخ داد ویرایش ویژگی");
      }
    }
  };
  return (
    <div className={cn("AddFeatureStyle", "mt-6")}>
      <h2 className="text-tint-blue-500">ویرایش ویژگی</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <FormAutocomplete
          label="انتخاب دسته"
          name="categoryId"
          options={categories?.data ?? []}
          getOptionLabel={(otp) => otp.name}
          getOptionValue={(otp) => otp.id}
          control={control}
        />
        <div className="flex items-end gap-[0.4375rem]">
          <div className="flex items-end gap-[0.4375rem]">
            <FormInputField label="نام ویژگی" name="title" control={control} />
            <FormInputField label="واحد ویژگی" name="unit" control={control} />
            <FormScrollableSelectField
              options={attributeUnits}
              getOptionLabel={(opt) => opt.name}
              getOptionValue={(opt) => opt.value}
              control={control}
              label="نوع تایپ"
              name="type"
            />
          </div>
          {/* <div className="w-[20%]">
            <FileUploader label="آیکون" />
          </div> */}
          <SubmitButton disabled={!formState.isDirty} />
        </div>
      </form>

      {Object.values(formState.errors).length > 0 && (
        <div className="text-red-500 text-sm mt-1 w-full">
          {Object.values(formState.errors).map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}
