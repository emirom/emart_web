"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import FormDatePickerField from "@components/FormDatePickerField";
import { FormInputField } from "@components/FormInputField";
import { FormTextareaField } from "@components/FormTextareaField";
import {
  FileWithPreview,
  ImageUploader,
} from "@components/ui/image-uploader/ImageUploader";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  store: string;
  postalCode: string;
  phone: string;
  address: string;
  nationality: string;
  email: string;
  birthday: string;
  nationalityCardImage: FileWithPreview | null;
};

export default function UserInfoForm() {
  const { control, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async () => {};
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 items-stretch "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} name="firstName" label="نام" />
      <FormInputField control={control} name="lastName" label="نام خانوادگی" />
      <FormInputField control={control} name="postalCode" label="کدپستی" />
      <FormInputField control={control} name="phone" label="شماره تماس" />
      <FormInputField control={control} name="email" label="آدرس الکرونیکی" />
      <FormInputField control={control} name="nationality" label="شماره ملی" />
      <FormInputField
        control={control}
        name="email"
        type="email"
        label="شماره ملی"
      />
      <FormDatePickerField
        control={control}
        name="birthday"
        label="تاریخ تولد"
      />
      <div className="col-span-1 md:col-span-2">
        <FormTextareaField
          className=""
          control={control}
          name="address"
          label="آدرس"
          placeholder="آدرس خود را وارد نمایید"
        />
      </div>
      <ImageUploader
        control={control}
        name="nationalityCardImage"
        label="تصویر کارت ملی"
        placeholderText="بارگذاری تصویر کارت ملی"
      />
      <ImageUploader
        control={control}
        name="nationalityCardImage"
        label="تصویر پروانه کسب"
        placeholderText="تصویر پروانه کسب"
      />
      <SubmitButton className="self-end " />
    </form>
  );
}
