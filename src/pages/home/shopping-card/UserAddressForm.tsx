"use client";
import FormComboboxField from "@components/FormComboboxField";
import { FormInputField } from "@components/FormInputField";
import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { useGetProvinces } from "@lib/services/provinces/provinces";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import ShoppingCardPortalButton from "./ShoppingCardPortalButton";

interface Province {
  id: number | string;
  name: string;
}

interface UserAddressFormValues {
  province: Province | null;
  city: Province | null;
  address: string;
  licensePlate: string;
  unit: string;
  postalCode: string;
  receiver: string;
  phone: string;
}

export default function UserAddressForm() {
  const { control, handleSubmit } = useForm<UserAddressFormValues>();
  const { data: provinces } = useGetProvinces({ skip: 0, limit: 20 });
  const onSubmit = (data: UserAddressFormValues) => {
    console.log(data);
  };
  return (
    <>
      <h2 className="text-orange-500 text-sm font-semibold mb-3 text-center">
        ثبت آدرس جدید
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 items-end gap-3"
      >
        <FormComboboxField
          control={control}
          name="province"
          options={provinces?.data ?? []}
          getOptionLabel={(opt) => opt.name}
          getOptionValue={(opt) => opt.id}
          label="استان"
          placeholder="استان"
        />
        <FormComboboxField
          control={control}
          name="city"
          options={provinces?.data ?? []}
          getOptionLabel={(opt) => opt.name}
          getOptionValue={(opt) => opt.id}
          label="شهر"
          placeholder="شهر"
        />
        <div>جستجو از روی نقشه </div>
        <div className="col-span-3 w-full">
          <FormInputField control={control} name="address" label="آدرس" />
        </div>
        <FormInputField control={control} name="licensePlate" label="پلاک" />
        <FormInputField control={control} name="unit" label="واحد" />
        <FormInputField control={control} name="postalCode" label="کد پستی" />
        <FormInputField control={control} name="receiver" label="گیرنده" />
        <FormInputField control={control} name="phone" label="شماره موبایل" />
        <div className="flex flex-col gap-1">
          <label className={cn("block text-xs font-medium text-tint-blue-500")}>
            خودم
          </label>
          <Button className="w-fit bg-white border border-gray-200">
            <UserIcon className="w-4 h-4 text-tint-blue-500 " />
          </Button>
        </div>
        <ShoppingCardPortalButton onClick={() => alert("hello wrold")} />
      </form>
    </>
  );
}
