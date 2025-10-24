// src/app/[locale]/(admin)/dashboard/category/add/page.tsx
"use client";

import { FormInputField } from "@components/FormInputField";
import FormSwitchField from "@components/FormSwitchField";
import { Button } from "@components/ui/button";
import { CreateCategoryInput } from "@lib/schemas";
import { useForm } from "react-hook-form";

export default function CreateCategoryPage() {
  const { control } = useForm<CreateCategoryInput>({
    defaultValues: {
      iconUrl: "https://example.com/icon.png",
      level: 2,
    },
  });

  const options = [
    { id: "1", name: "hello" },
    { id: "2", name: "world" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <h5 className="bg-tint-blue-500">افزودن دسته بندی</h5>
      <form
        onSubmit={() => console.log("hello word")}
        className="w-full flex flex-col gap-2 p-2"
      >
        <div className="flex items-stretch gap-2">
          {/* <FormAutocomplete
            options={options}
            name="parentId"
            label="دسته پدر"
            getOptionLabel={(opt) => opt.name}
            getOptionValue={(opt) => opt.id}
            control={control}
          />
          <FormAutocomplete
            options={options}
            name="unitId"
            label="واحد شمارش"
            getOptionLabel={(opt) => opt.name}
            getOptionValue={(opt) => opt.id}
            control={control}
          /> */}
        </div>
        <div className="flex items-start gap-2 my-2">
          <FormInputField
            label="categoryEnName"
            name="name"
            control={control}
          />
          <FormInputField
            label="categoryFaName"
            name="enName"
            control={control}
          />
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-5">
            <FormSwitchField
              label="وضعیت نمایش"
              name="isActive"
              control={control}
            />
            <FormSwitchField
              label="نمایش در منو"
              name="showInMenu"
              control={control}
            />
          </div>
          <Button type="submit">ذخیره</Button>
        </div>
      </form>
    </div>
  );
}
