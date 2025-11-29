"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postProvinceAction } from "@lib/actions/province-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateProvinceInput } from "@lib/schemas";
import { useGetCountries } from "@lib/services/countries/countries";
import { postProvincesBody } from "@lib/validations/province.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProvinceForm() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateProvinceInput>({
      defaultValues: {
        name: "",
        abb: "",
        countryId: "",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(postProvincesBody) as any,
    });
  const onSubmit: SubmitHandler<CreateProvinceInput> = async (data) => {
    try {
      await postProvinceAction(data);
      queryClient.invalidateQueries({ queryKey: ["/provinces"] });
      toast.success("فروشگاه اضافه شد");
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };
  const { data: countries } = useGetCountries({ skip: 0, limit: 10 });

  return (
    <form
      className="items-stretch grid grid-cols-1 gap-2  "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormScrollableSelectField
        control={control}
        label="نام کشور"
        name="countryId"
        options={countries?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />
      <FormInputField control={control} label="نام فروشگاه" name="name" />
      <FormInputField
        control={control}
        label="نام مخفف اصتان(abb)"
        name="abb"
      />

      <SubmitButton
        className="w-full md:w-auto"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
