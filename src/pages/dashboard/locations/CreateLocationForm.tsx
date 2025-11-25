"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { FormTextareaField } from "@components/FormTextareaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postLocationAction } from "@lib/actions/location-action";
import { CreateLocationInput } from "@lib/schemas";
import { useGetCities } from "@lib/services/cities/cities";
import { postLocationsBody } from "@lib/validations/location.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateLocationForm() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateLocationInput>({
      defaultValues: {
        cityId: "",
        postalCode: "",
        streetNumber: null,
        isActive: null,
        street: "",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(postLocationsBody) as any,
    });
  const { data: cities } = useGetCities({ skip: 0, limit: 10 });
  const onSubmit: SubmitHandler<CreateLocationInput> = async (data) => {
    try {
      await postLocationAction(data);

      toast.success("آدرس جدید اضافه شد");
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
      className="grid grid-cols-1 gap-2 md:grid-cols-2  items-stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormScrollableSelectField
        control={control}
        label="انتخاب‌شهر"
        name="cityId"
        options={cities?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />
      <FormInputField
        control={control}
        type="number"
        label="کد‌پستی"
        name="postalCode"
      />
      <FormInputField
        control={control}
        label="شماره خیابان"
        name="streetNumber"
      />
      <FormScrollableSelectField
        control={control}
        label="وضعیت"
        name="isActive"
        options={[
          { label: "غیرفعال", value: false },
          { label: "فعال", value: true },
        ]}
        getOptionLabel={(opt) => opt.label}
        getOptionValue={(opt) => opt.value}
      />

      <div className="col-span-1 md:col-span-2 w-full">
        <FormTextareaField
          control={control}
          name="street"
          label="آدرس خیابان"
          placeholder="آدرس دقیق خود را واردنمایید"
        />
      </div>
      <SubmitButton
        className="w-full col-span-1 md:col-span-2"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
