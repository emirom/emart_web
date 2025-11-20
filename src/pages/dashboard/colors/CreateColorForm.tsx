"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { postColorAction } from "@lib/actions/color-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateColorInput } from "@lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateColorForm() {
  const { handleSubmit, control, formState, reset } = useForm<CreateColorInput>(
    { defaultValues: { hex: "#000000" } },
  );
  const onSubmit: SubmitHandler<CreateColorInput> = async (data) => {
    try {
      await postColorAction(data);
      queryClient.invalidateQueries({ queryKey: ["/colors"] });
      toast.success("رنگ اضافه شد");
      reset();
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
      className="grid grid-cols-1 gap-2 md:grid-cols-2  items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} label="نام رنگ" name="name" />
      <FormInputField control={control} label="نام رنگ(en)" name="enName" />
      <div className="flex items-end gap-2 col-span-4">
        <FormInputField
          control={control}
          label="نام نمایشی"
          name="displayName"
        />
        <FormScrollableSelectField
          control={control}
          name="isActive"
          label="وضعیت"
          options={[
            { value: true, label: "فعال" },
            { value: false, label: "غیرفعال" },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
        />
        <FormInputField
          control={control}
          name="hex"
          label="انتخاب رنگ"
          type="color"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
        <SubmitButton
          className="w-full md:w-auto"
          disabled={!formState.isDirty}
        />
      </div>
    </form>
  );
}
