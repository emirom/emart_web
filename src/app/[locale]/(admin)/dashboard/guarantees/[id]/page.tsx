"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { patchGuaranteeAction } from "@lib/actions/guarantee-action";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateGuaranteeInput } from "@lib/schemas";
import { useGetGuaranteesId } from "@lib/services/guarantees/guarantees";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
  const { handleSubmit, control, formState, reset } =
    useForm<UpdateGuaranteeInput>();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: guarantee } = useGetGuaranteesId(id);
  useEffect(() => {
    if (guarantee) {
      reset({ ...guarantee.data });
    }
  }, [guarantee, reset]);
  const onSubmit: SubmitHandler<UpdateGuaranteeInput> = async (data) => {
    try {
      await patchGuaranteeAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/guarantees"] });
      toast.success("گارانتی اضافه شد");
      router.push("/dashboard/guarantees");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  return (
    <>
      <header
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 border-b border-gray-200 pb-3"
        aria-label="افزودن گارانتی"
      >
        <h1 className="text-sm font-bold text-tint-blue-600 tracking-tight">
          افزودن گارانتی
        </h1>

        <Link
          href="/dashboard/guarantees"
          aria-label="بازگشت به لیست گارانتی‌ها"
          className="text-sm text-tint-blue-500 hover:text-tint-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tint-blue-500 focus-visible:ring-offset-2 transition-colors duration-200 font-medium mt-2 sm:mt-0"
        >
          ← بازگشت
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2  gap-2 items-end"
      >
        <FormInputField control={control} name="title" label="عنوان گارانتی" />
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
          name="providerName"
          label="نام ارائه‌دهنده"
        />
        <FormInputField
          control={control}
          name="providerAddress"
          label="آدرس ارائه‌دهنده"
        />
        <FormInputField
          control={control}
          name="providerPhone"
          label="تلفن ارائه‌دهنده"
        />
        <FormInputField
          control={control}
          name="providerCode"
          label="کد ارائه‌دهنده"
        />
        <FormInputField
          control={control}
          name="termsUrl"
          label="لینک شرایط و ضوابط"
        />
        <FormInputField
          control={control}
          name="claimProcess"
          label="فرآیند مطالبه گارانتی"
        />
        <FormInputField
          control={control}
          name="responseTime"
          label="زمان پاسخ‌گویی (روز)"
          type="number"
        />

        <FormScrollableSelectField
          control={control}
          name="isInternational"
          label="بین‌المللی است؟"
          options={[
            { label: "بله", value: true },
            { label: "خیر", value: false },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
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

        <FormScrollableSelectField
          control={control}
          name="isRegisteredWithTax"
          label="ثبت‌شده در اداره مالیات؟"
          options={[
            { label: "بله", value: true },
            { label: "خیر", value: false },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.value}
        />

        <FormInputField
          control={control}
          name="sortOrder"
          label="ترتیب نمایش"
          type="number"
        />
        <FormInputField
          control={control}
          name="sepidarGuaranteeId"
          label="شناسه سپیدار"
        />

        <SubmitButton
          className="w-full md:w-auto"
          disabled={!formState.isDirty}
        />
      </form>
    </>
  );
}
