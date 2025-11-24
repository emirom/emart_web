"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCityAction } from "@lib/actions/city-action";
import { queryClient } from "@lib/apis/queryClient";
import { invalidateEntityQueries } from "@lib/utils/react-query-utils";
import { CreateCity } from "@lib/schemas";
import { useGetProvinces } from "@lib/services/provinces/provinces";
import { postCitiesBody } from "@lib/validations/city.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCityForm() {
  const { handleSubmit, control, formState, reset } = useForm<CreateCity>({
    defaultValues: {
      name: "",
      abb: "",
      provinceId: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(postCitiesBody) as any,
  });
  const onSubmit: SubmitHandler<CreateCity> = async (data) => {
    try {
      await postCityAction(data);
      // Invalidate all queries that start with "/cities" and refetch
      await invalidateEntityQueries(queryClient, "/cities");
      toast.success("شهر اضافه شد");
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };
  const { data: provinces } = useGetProvinces({ skip: 0, limit: 10 });

  return (
    <form
      className="items-stretch grid grid-cols-1 gap-2  "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormScrollableSelectField
        control={control}
        label="نام استان"
        name="provinceId"
        options={provinces?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />
      <FormInputField control={control} label="نام شهر" name="name" />
      <FormInputField control={control} label="نام مخفف شهر(abb)" name="abb" />

      <SubmitButton
        className="w-full md:w-auto"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
