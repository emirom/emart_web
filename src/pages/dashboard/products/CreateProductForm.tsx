"use client";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { FormTextareaField } from "@components/FormTextareaField";
import { postProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateProductInput } from "@lib/schemas";
import { useGetBrands } from "@lib/services/brands/brands";
import { useGetCategories } from "@lib/services/categories/categories";
import { useGetLabels } from "@lib/services/labels/labels";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LabelList from "./LabelList";

type Label = { id: string; name: string };

export default function CreateProductForm() {
  const { handleSubmit, control } = useForm<CreateProductInput>({
    defaultValues: { labels: [] },
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "labels",
  });

  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      await postProductAction(data);
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      toast.success("محصول اضافه شد");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { data: brands } = useGetBrands({ skip: 0, limit: 10 });
  const { data: labels } = useGetLabels({ limit: 10, skip: 0 });

  const handleSelectedLabels = (label: Label | null) => {
    if (!label) return;

    const isAlreadyAdded =
      fields.some((item) => item.id === label.id) ||
      selectedLabels.some((lbl) => lbl.id === label.id);

    if (isAlreadyAdded) {
      toast.info("این برچسب قبلاً اضافه شده است");
      return;
    }

    append({ id: label.id });
    setSelectedLabels((state) => [...state, label]);
  };

  const handleRemoveLabel = (id: string) => {
    const index = fields.findIndex((item) => item.id === id);
    if (index !== -1) {
      remove(index);
    }
    setSelectedLabels((prev) => prev.filter((lbl) => lbl.id !== id));
  };

  return (
    <form
      className=" grid  sm:grid-cols-2 items-end gap-2 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} name="name" label="نام محصول" />
      <FormInputField
        control={control}
        name="enName"
        label="نام انگلیسی محصول"
      />

      <FormScrollableSelectField
        control={control}
        name="categoryId"
        label="دسته محصول"
        options={categories?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="brandId"
        label="برند محصول"
        options={brands?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
      />

      <FormScrollableSelectField
        control={control}
        name="isActive"
        label="فعال"
        options={[
          { label: "غیرفعال", value: false },
          { label: "فعال", value: true },
        ]}
        getOptionLabel={(opt) => opt.label}
        getOptionValue={(opt) => opt.value}
      />

      <FormAutocomplete
        control={control}
        name="labels"
        label="برچسب‌ها"
        options={labels?.data ?? []}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        onSelect={handleSelectedLabels}
      />

      <LabelList
        selectedLabels={selectedLabels}
        handleRemoveLabel={handleRemoveLabel}
      />
      <div className="mt-5 col-span-1 sm:col-span-2 lg:col-span-3">
        <FormTextareaField
          control={control}
          name="descriptions"
          label="توضیحات"
          placeholder="توضیحات محصول"
        />
      </div>
    </form>
  );
}
