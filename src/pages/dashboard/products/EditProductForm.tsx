"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { patchProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateProductInput } from "@lib/schemas";
import { useGetBrands } from "@lib/services/brands/brands";
import { useGetCategories } from "@lib/services/categories/categories";
import { useGetLabels } from "@lib/services/labels/labels";
import { useGetProductsId } from "@lib/services/products/products";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LabelList from "./LabelList";

type Label = { id: string; name: string };

export default function EditProductId({ editId }: { editId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [productId, setProductId] = useState<string | null>(null);

  const { handleSubmit, control, reset } = useForm<UpdateProductInput>({
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

  const { data: product } = useGetProductsId(editId);

  useEffect(() => {
    if (product?.data) {
      reset({
        name: product.data.name,
        enName: product.data.name,
        brandId: product.data.brandId,
        categoryId: product.data.categoryId,
        isActive: product.data.isActive,
        labels:
          product.data.labels?.map((lbl: Label) => ({ id: lbl.id })) ?? [],
      });
      setSelectedLabels(product.data.labels ?? []);
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<UpdateProductInput> = async (data) => {
    try {
      await patchProductAction(editId, data);
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      toast.success("محصول با موفقیت ویرایش شد");
      reset();
      setSelectedLabels([]);
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
