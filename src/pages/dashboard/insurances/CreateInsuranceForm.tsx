"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { postInsuranceAction } from "@lib/actions/insurance-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateInsuranceInput } from "@lib/schemas";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateInsuranceForm() {
  const { handleSubmit, control, formState } = useForm<CreateInsuranceInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateInsuranceInput> = async (data) => {
    try {
      await postInsuranceAction(data);
      queryClient.invalidateQueries({ queryKey: ["/insurances"] });
      toast.success("گارانتی اضافه شد");
      router.push("/dashboard/insurances");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end"
    >
      <FormInputField control={control} name="title" label="عنوان" />

      <FormInputField control={control} name="start" label="تاریخ شروع" />
      <FormInputField
        control={control}
        name="months"
        label="مدت (ماه)"
        type="number"
      />
      <FormInputField
        control={control}
        name="days"
        label="مدت (روز)"
        type="number"
      />
      <FormInputField control={control} name="logo" label="لوگو (URL)" />

      <FormInputField
        control={control}
        name="price"
        label="قیمت"
        type="number"
      />

      <FormInputField
        control={control}
        name="providerName"
        label="نام ارائه‌دهنده"
      />
      <FormInputField control={control} name="coverage" label="پوشش بیمه" />
      <FormInputField
        control={control}
        name="exclusions"
        label="موارد استثناء"
      />
      <FormInputField
        control={control}
        name="claimLimit"
        label="حداکثر خسارت"
        type="number"
      />
      <FormInputField
        control={control}
        name="deductible"
        label="سهم پرداخت اولیه"
        type="number"
      />
      <FormInputField
        control={control}
        name="claimProcess"
        label="فرآیند مطالبه"
      />

      <FormScrollableSelectField
        control={control}
        name="isActive"
        label="فعال است؟"
        options={[
          { label: "بله", value: true },
          { label: "خیر", value: false },
        ]}
        getOptionLabel={(o) => o.label}
        getOptionValue={(o) => o.value}
      />

      <FormInputField
        control={control}
        name="minOrderValue"
        label="حداقل مبلغ سفارش"
        type="number"
      />

      <FormInputField
        control={control}
        name="maxOrderValue"
        label="حداکثر مبلغ سفارش"
        type="number"
      />

      <FormInputField
        control={control}
        name="sortOrder"
        label="ترتیب نمایش"
        type="number"
      />

      <SubmitButton
        className="w-full md:w-auto"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
