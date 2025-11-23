"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCountryAction } from "@lib/actions/country-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateCountryInput } from "@lib/schemas";
import { postCountriesBody } from "@lib/validations/country.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCountryForm() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateCountryInput>({
      defaultValues: {
        name: "",
        phoneCode: "",
        isoCode: "",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(postCountriesBody) as any,
    });
  const onSubmit: SubmitHandler<CreateCountryInput> = async (data) => {
    try {
      await postCountryAction(data);
      queryClient.invalidateQueries({ queryKey: ["/countries"] });
      toast.success("کشور اضافه شد");
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
      <FormInputField control={control} label="نام کشور" name="name" />
      <FormInputField control={control} label="کد ISO" name="isoCode" />
      <FormInputField control={control} label="کد تلفن" name="phoneCode" />

      <SubmitButton
        className="w-full md:w-auto"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
