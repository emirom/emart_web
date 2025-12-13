"use client";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInventoryInput } from "@lib/schemas";
import { useGetCurrencies } from "@lib/services/currencies/currencies";
import { useGetGuarantees } from "@lib/services/guarantees/guarantees";
import { useGetInsurances } from "@lib/services/insurances/insurances";

import { SubmitButton } from "@components/BtnWithIcon";
import { postInventoryAction } from "@lib/actions/inventory-action";
import { useGetLocations } from "@lib/services/locations/locations";
import { useGetStores } from "@lib/services/stores/stores";
import { useGetVariants } from "@lib/services/variants/variants";
import { postInventoriesBody } from "@lib/validations/inventory.validation";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormDatePickerField from "../../../components/FormDatePickerField";

export default function CreateInventoryForm() {
  const { handleSubmit, control } = useForm<CreateInventoryInput>({
    defaultValues: {
      insuranceId: null,
      guaranteeId: null,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(postInventoriesBody) as any,
  });

  const { data: stores } = useGetStores({ skip: 0, limit: 10 });
  const { data: currencies } = useGetCurrencies({ skip: 0, limit: 10 });
  const { data: locations } = useGetLocations({ skip: 0, limit: 10 });
  const { data: variants } = useGetVariants({ skip: 0, limit: 10 });
  const { data: guarantees } = useGetGuarantees({ skip: 0, limit: 10 });
  const { data: insurances } = useGetInsurances({ skip: 0, limit: 10 });
  // const { data: leasings } = useGetLeasings({ skip: 0, limit: 10 });
  // const { data: cheques } = useGetCheques({ skip: 0, limit: 10 });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateInventoryInput> = async (data) => {
    try {
      await postInventoryAction(data);
      toast.success("موجودی اضافه شد");
      router.push("/dashboard/inventory");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-stretch"
    >
      <FormScrollableSelectField
        control={control}
        name="storeId"
        label="فروشگاه"
        options={stores?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="currencyId"
        label="ارز"
        options={currencies?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="locationId"
        label="مکان"
        options={locations?.data ?? []}
        getOptionLabel={(opt) => opt.street}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="variantId"
        label="شناسه تنوع"
        options={variants?.data ?? []}
        getOptionLabel={(opt) => opt.sku}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="guaranteeId"
        label="گارانتی"
        options={guarantees?.data ?? []}
        getOptionLabel={(opt) => opt.title}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="insuranceId"
        label="بیمه"
        options={insurances?.data ?? []}
        getOptionLabel={(opt) => opt.title}
        getOptionValue={(opt) => opt.id}
      />

      {/* <FormScrollableSelectField
        control={control}
        name="leasingId"
        label="لیزینگ"
        options={leasings?.data ?? []}
        getOptionLabel={(opt) => opt.title}
        getOptionValue={(opt) => opt.id}
      /> */}

      {/* <FormScrollableSelectField
        control={control}
        name="chequeId"
        label="چک"
        options={cheques?.data ?? []}
        getOptionLabel={(opt) => opt.title}
        getOptionValue={(opt) => opt.id}
      /> */}

      <FormInputField
        control={control}
        name="cost"
        label="قیمت خرید"
        type="number"
      />

      <FormInputField
        control={control}
        name="price"
        label="قیمت پایه"
        type="number"
      />

      <FormInputField
        control={control}
        name="discountPercent"
        label="درصد تخفیف"
        type="number"
      />

      <FormInputField
        control={control}
        name="discountPrice"
        label="قیمت بعد از تخفیف"
        type="number"
      />

      <FormInputField
        control={control}
        name="inStock"
        label="موجودی فعلی"
        type="number"
      />

      <FormInputField
        control={control}
        name="lowStockThreshold"
        label="آستانه هشدار کمبود"
        type="number"
      />

      <FormDatePickerField
        control={control}
        name="expiryDate"
        label="تاریخ انقضا"
      />

      <FormInputField control={control} name="warehouseCode" label="کد انبار" />

      <FormInputField control={control} name="shelfCode" label="کد قفسه" />

      <FormInputField control={control} name="hsCode" label="کد HS" />

      <FormInputField
        control={control}
        name="originCountry"
        label="کشور سازنده"
      />

      <FormInputField
        control={control}
        name="packageWeight"
        label="وزن بسته (کیلو)"
        type="number"
      />

      <FormInputField
        control={control}
        name="packageDimensions"
        label="ابعاد بسته (L x W x H)"
      />

      {/* <button
        type="submit"
        className="col-span-full bg-blue-600 text-white rounded-md p-2"
      >
        ثبت موجودی
      </button> */}
      <SubmitButton label="ثبت موجودی" className="mt-auto" />
    </form>
  );
}
