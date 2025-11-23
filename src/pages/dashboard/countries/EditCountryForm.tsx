"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchCountryAction } from "@lib/actions/country-action";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateCountryInput } from "@lib/schemas";
import { useGetCountriesId } from "@lib/services/countries/countries";
import { patchCountriesIdBody } from "@lib/validations/country.validation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCountryForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } =
    useForm<UpdateCountryInput>({
      defaultValues: {
        name: "",
        phoneCode: "",
        isoCode: "",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(patchCountriesIdBody) as any,
    });
  const { data: country } = useGetCountriesId(id, {
    query: { queryKey: ["/countries", id] },
  });
  useEffect(() => {
    if (country?.data) reset({ ...country.data });
  }, [reset, country]);
  const onSubmit: SubmitHandler<UpdateCountryInput> = async (data) => {
    try {
      await patchCountryAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/countries"] });
      toast.success("کشور ویرایش  شد");
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
