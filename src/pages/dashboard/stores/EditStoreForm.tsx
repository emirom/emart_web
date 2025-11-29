"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { FormTextareaField } from "@components/FormTextareaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchStoreAction } from "@lib/actions/store.action";
import { CreateStoreInput } from "@lib/schemas";
import { useGetStoresId } from "@lib/services/stores/stores";
import { patchStoresIdBody } from "@lib/validations/store.validation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditStoreForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } = useForm<CreateStoreInput>(
    {
      defaultValues: {
        name: "",
        slug: "",
        logo: "https://cdn.example.com/logos/techstore.png",
        description: "",
        email: "",
        phone: "",
        website: "",
        isActive: true,
        isApproved: false,
        ownerId: null,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(patchStoresIdBody) as any,
    },
  );

  const { data: store } = useGetStoresId(id, {
    query: { queryKey: ["/stores", id] },
  });

  useEffect(() => {
    if (store?.data) reset({ ...store.data });
  }, [store?.data, reset]);

  const onSubmit: SubmitHandler<CreateStoreInput> = async (data) => {
    try {
      await patchStoreAction(id, data);

      toast.success("فروشگاه اضافه شد");
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
      className="items-stretch grid grid-cols-1 gap-2 md:grid-cols-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} name="name" label="نام‌فروشگاه" />
      <FormInputField control={control} name="slug" label="اسلاگ" />
      <FormInputField control={control} name="email" label="ایمیل" />
      <FormInputField control={control} name="phone" label="تلفن" />
      <FormInputField control={control} name="website" label="وبسایت" />
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
      <FormScrollableSelectField
        className="col-span-2"
        control={control}
        label="تایید شده "
        name="isApproved"
        options={[
          { label: "غیرفعال", value: false },
          { label: "فعال", value: true },
        ]}
        getOptionLabel={(opt) => opt.label}
        getOptionValue={(opt) => opt.value}
      />
      <div className="col-span-2">
        <FormTextareaField
          control={control}
          label="توضیحات"
          name="description"
          placeholder="توضیحات فروشگاه"
        />
      </div>

      <SubmitButton
        className="w-full md:w-auto col-span-2 "
        disabled={!formState.isDirty}
      />
    </form>
  );
}
