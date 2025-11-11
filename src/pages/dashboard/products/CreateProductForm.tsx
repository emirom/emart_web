"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { postProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateProductInput } from "@lib/schemas";
import { useGetBrands } from "@lib/services/brands/brands";
import { useGetCategories } from "@lib/services/categories/categories";
import { useGetLabels } from "@lib/services/labels/labels";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LabelList from "./LabelList";

type Label = { id: string; name: string };

export default function CreateProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [productId, setProductId] = useState<string | null>(null);

  const { handleSubmit, control, reset } = useForm<CreateProductInput>({
    defaultValues: { labels: [], isActive: false, descriptions: null },
  });

  const { append, fields, remove } = useFieldArray({ control, name: "labels" });

  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { data: brands } = useGetBrands({ skip: 0, limit: 10 });
  const { data: labels } = useGetLabels({ skip: 0, limit: 10 });

  useEffect(() => {
    const savedId = localStorage.getItem("lastCreatedProductId");
    if (savedId) setProductId(savedId);
    return () => localStorage.removeItem("lastCreatedProductId");
  }, []);

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      const id = await postProductAction(data);
      if (!id) throw new Error("شناسه محصول بازگردانده نشد");

      setProductId(id);
      localStorage.setItem("lastCreatedProductId", id);
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      toast.success("محصول با موفقیت افزوده شد");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است");
    }
  };

  const handleSelectedLabels = (label: Label | null) => {
    if (!label) return;
    const exists =
      fields.some((item) => item.id === label.id) ||
      selectedLabels.some((lbl) => lbl.id === label.id);
    if (exists) return toast.info("این برچسب قبلاً اضافه شده است");

    append({ id: label.id });
    setSelectedLabels((prev) => [...prev, label]);
  };

  const handleRemoveLabel = (id: string) => {
    const index = fields.findIndex((item) => item.id === id);
    if (index !== -1) remove(index);
    setSelectedLabels((prev) => prev.filter((lbl) => lbl.id !== id));
  };

  const handleGoToUpload = () => {
    if (!productId) return;
    startTransition(() => {
      router.push(`/dashboard/products/add/${productId}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid sm:grid-cols-2 lg:grid-cols-3 items-end gap-2"
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
        label="وضعیت"
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

      <SubmitButton className="col-span-1" label="ثبت محصول" />

      {productId && (
        <SubmitButton
          type="button"
          disabled={isPending}
          className="col-span-1"
          label={isPending ? "در حال انتقال..." : "افزودن تصاویر محصول"}
          onClick={handleGoToUpload}
        />
      )}
    </form>
  );
}
