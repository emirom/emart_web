"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCurrencyAction } from "@lib/actions/currency-action";
import { CreateCurrencyInput } from "@lib/schemas";
import { postCurrenciesBody } from "@lib/validations/currency.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCurrencyForm() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateCurrencyInput>({
      defaultValues: {
        name: "",
        symbol: "",
        isDefault: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(postCurrenciesBody) as any,
    });
  const onSubmit: SubmitHandler<CreateCurrencyInput> = async (data) => {
    try {
      await postCurrencyAction(data);
      toast.success("ارز اضافه شد");
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
      className="items-stretch grid grid-cols-1 gap-2  "
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
