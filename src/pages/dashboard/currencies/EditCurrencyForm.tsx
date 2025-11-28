"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchCurrencyAction } from "@lib/actions/currency-action";
import { UpdateCurrencyInput } from "@lib/schemas";
import { useGetCurrenciesId } from "@lib/services/currencies/currencies";
import { patchCurrenciesIdBody } from "@lib/validations/currency.validation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditCurrencyForm({ id }: { id: string }) {
  const { data: currency } = useGetCurrenciesId(id, {
    query: { queryKey: ["/currencies", id] },
  });

  const { handleSubmit, control, formState, reset } =
    useForm<UpdateCurrencyInput>({
      defaultValues: {
        name: "",
        symbol: "",
        isDefault: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(patchCurrenciesIdBody) as any,
    });
  useEffect(() => {
    if (currency?.data) reset({ ...currency.data });
  }, [currency?.data, reset]);
  const onSubmit: SubmitHandler<UpdateCurrencyInput> = async (data) => {
    try {
      await patchCurrencyAction(id, data);
      toast.success("ارز ویرایش شد");
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
      className="items-stretch grid grid-cols-1 gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} label="نام ارز" name="name" />
      <FormInputField control={control} label="نماد" name="symbol" />
      <FormScrollableSelectField
        control={control}
        label="ارز‌پیش فرض"
        name="isDefault"
        options={[
          { label: "ارز پیش‌فرض", value: true },
          { label: "ارز غیر پیش‌فرض", value: false },
        ]}
        getOptionLabel={(opt) => opt.label}
        getOptionValue={(opt) => opt.value}
      />

      <SubmitButton
        className="w-full md:w-auto"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
