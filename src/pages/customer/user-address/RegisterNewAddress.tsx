"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import FormComboboxField from "@components/FormComboboxField";
import { FormInputField } from "@components/FormInputField";
import { cn } from "@components/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterNewAddressInput = {
  province: string;
  city: string;
  address: string;
  number: string;
  unit: string;
  postalCode: string;
};

export default function RegisterNewAddress() {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<RegisterNewAddressInput>();
  const onSubmit: SubmitHandler<RegisterNewAddressInput> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 ">
      <h2 className="text-sm font-medium">ثبت آدرس جدید</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "grid grid-cols-1 items-stretch border border-gray-100 rounded-md py-3 px-6 gap-3",
          "md:grid-cols-2",
        )}
      >
        <FormComboboxField
          control={control}
          name="province"
          label="استان"
          options={[
            { id: 1, label: "همدان" },
            { id: 2, label: "هرمزگان" },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.id}
          placeholder="انتخاب استان"
          emptyMessage="استان مورد نظر یافت نشد"
        />
        <FormComboboxField
          control={control}
          name="city"
          label="شهر"
          options={[
            { id: 1, label: "همدان" },
            { id: 2, label: "هرمزگان" },
          ]}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.id}
          placeholder="انتخاب شهر"
          emptyMessage="شهر مورد نظر یافت نشد"
        />
        <div className="md:col-span-2">
          <FormInputField
            control={control}
            name="address"
            label="خیابان و کوچه"
          />
        </div>
        <FormInputField control={control} name="number" label="پلاک" />
        <FormInputField control={control} name="unit" label="واحد" />
        <FormInputField control={control} name="postalCode" label="کد پستی" />
        <SubmitButton
          title="ثبت آدرس جدید"
          className="bg-[#34C759] self-end"
          disabled={!isDirty}
        />
      </form>
    </div>
  );
}
