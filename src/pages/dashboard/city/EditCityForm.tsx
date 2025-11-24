"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchCityAction } from "@lib/actions/city-action";
import { queryClient } from "@lib/apis/queryClient";
import { invalidateEntityQueries } from "@lib/utils/react-query-utils";
import { UpdateCity } from "@lib/schemas";
import { useGetCitiesId } from "@lib/services/cities/cities";
import { useGetProvinces } from "@lib/services/provinces/provinces";
import { patchCitiesIdBody } from "@lib/validations/city.validation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditCityForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } = useForm<UpdateCity>({
    defaultValues: {
      name: "",
      abb: "",
      provinceId: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(patchCitiesIdBody) as any,
  });
  const { data: city } = useGetCitiesId(id, {
    query: { queryKey: ["/cities", id] },
  });
  useEffect(() => {
    if (city?.data) reset({ ...city.data });
  }, [reset, city?.data]);
  const onSubmit: SubmitHandler<UpdateCity> = async (data) => {
    try {
      await patchCityAction(id, data);
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
