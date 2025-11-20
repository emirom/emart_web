"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { postBrandAction } from "@lib/actions/brand-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateBrandInput } from "@lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateBrandForm() {
  const { handleSubmit, control, formState, reset } = useForm<CreateBrandInput>(
    { defaultValues: { logoUrl: "https://example.com/logo.png" } },
  );
  const onSubmit: SubmitHandler<CreateBrandInput> = async (data) => {
    try {
      await postBrandAction(data);
      queryClient.invalidateQueries({ queryKey: ["/brands"] });
      toast.success("برند اضافه شد");
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-2 items-stretch "
    >
      <FormInputField name="name" control={control} label="نام برند" />
      <FormInputField name="enName" control={control} label="نام برند(en)" />
      <div className="w-full">
        <FormScrollableSelectField
          control={control}
          label="وضعیت"
          name="isActive"
          options={[
            { label: "غیر فعال", value: false },
            { label: "فعال", value: true },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
        />
      </div>
      <FormInputField
        name="sortOrder"
        control={control}
        label="ترتیب مرتب‌سازی"
        type="number"
      />

      <div className="w-full flex flex-wrap gap-2 items-end justify-between">
        <FormInputField
          name="website"
          control={control}
          label="وب سایت"
          placeholder="www."
        />
      </div>
      <SubmitButton className="w-full grow" disabled={!formState.isDirty} />
    </form>
  );
}
