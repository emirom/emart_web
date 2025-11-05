"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { patchBrandAction } from "@lib/actions/brand-action";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateBrandInput } from "@lib/schemas";
import { useGetBrandsId } from "@lib/services/brands/brands";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditBrandForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } = useForm<UpdateBrandInput>(
    { defaultValues: { isActive: false } },
  );
  const { data: brand } = useGetBrandsId(id, {
    query: { queryKey: ["/brands", id] },
  });
  useEffect(() => {
    reset({ ...brand?.data });
  }, [brand, reset]);
  const onSubmit: SubmitHandler<UpdateBrandInput> = async (data) => {
    try {
      await patchBrandAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/brands"] });
      toast.success("برند ویرایش  شد");
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
      className="flex flex-wrap gap-2 items-stretch"
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
      <SubmitButton className="w-full" disabled={!formState.isDirty} />
    </form>
  );
}
