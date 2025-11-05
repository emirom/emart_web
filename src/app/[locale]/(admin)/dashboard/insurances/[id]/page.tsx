"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { patchInsuranceAction } from "@lib/actions/insurance-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateInsuranceInput } from "@lib/schemas";
import { useGetInsurancesId } from "@lib/services/insurances/insurances";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateInsuranceInput>();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: insurance } = useGetInsurancesId(id, {
    query: { queryKey: ["/insurances", id] },
  });

  useEffect(() => {
    if (insurance?.data) {
      reset({ ...insurance?.data });
    }
  }, [insurance?.data, reset]);
  const onSubmit: SubmitHandler<CreateInsuranceInput> = async (data) => {
    try {
      await patchInsuranceAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/insurance"] });
      toast.success("بیمه با موفقیت ویرایش شد");
      router.push("/dashboard/insurances");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-sm font-bold text-tint-blue-600 tracking-tight">
          افزودن بیمه جدید
        </h1>
        <Link
          href="/dashboard/insurances"
          className="text-sm text-tint-blue-500 hover:text-tint-blue-600 font-medium mt-2 sm:mt-0"
        >
          ← بازگشت
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end"
      >
        <FormInputField control={control} name="title" label="عنوان بیمه" />
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
        <FormInputField control={control} name="logo" label="آدرس لوگو (URL)" />
        <FormInputField
          control={control}
          name="price"
          label="قیمت بیمه (IRR/USD)"
          type="number"
        />
        <FormInputField
          control={control}
          name="providerName"
          label="نام ارائه‌دهنده"
        />
        <FormInputField
          control={control}
          name="coverage"
          label="موارد تحت پوشش"
        />
        <FormInputField
          control={control}
          name="exclusions"
          label="موارد استثنا"
        />
        <FormInputField
          control={control}
          name="claimLimit"
          label="حداکثر مبلغ مطالبه"
          type="number"
        />
        <FormInputField
          control={control}
          name="deductible"
          label="مبلغ اولیه پرداختی (Deductible)"
          type="number"
        />
        <FormInputField
          control={control}
          name="claimProcess"
          label="فرآیند مطالبه خسارت"
        />
        <FormScrollableSelectField
          control={control}
          name="isActive"
          label="فعال است؟"
          options={[
            { label: "بله", value: true },
            { label: "خیر", value: false },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
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
    </>
  );
}
