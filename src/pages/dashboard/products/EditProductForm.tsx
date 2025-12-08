"use client";
import { SubmitButton } from "@components/BtnWithIcon";
import FormAutocomplete from "@components/FormAutoCompleteField";
import { FormInputField } from "@components/FormInputField";
import { FormScrollableSelectField } from "@components/FormScrollableSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateProductInput } from "@lib/schemas";
import { useGetBrands } from "@lib/services/brands/brands";
import { useGetCategories } from "@lib/services/categories/categories";
import { useGetLabels } from "@lib/services/labels/labels";
import { useGetProductsId } from "@lib/services/products/products";
import { patchProductsIdBody } from "@lib/validations/product.validation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LabelList from "./LabelList";
import ProductImageModal from "./ProductImageModal";

type Label = { id: string; name: string };

export default function EditProductId({ id }: { id: string }) {
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const { handleSubmit, control, reset } = useForm<UpdateProductInput>({
    defaultValues: {
      labels: [],
      isActive: false,
      name: "",
      enName: "",
      categoryId: "",
      brandId: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(patchProductsIdBody) as any,
  });

  const { append, fields, remove } = useFieldArray({ control, name: "labels" });

  const { data: categories } = useGetCategories({ skip: 0, limit: 10 });
  const { data: brands } = useGetBrands({ skip: 0, limit: 10 });
  const { data: labels } = useGetLabels({ skip: 0, limit: 10 });

  const { data: product } = useGetProductsId(id, {
    query: { queryKey: ["/products", id] },
  });

  useEffect(() => {
    if (product?.data && labels?.data) {
      reset({
        name: product.data.name,
        enName: product.data.name,
        brandId: product.data.brandId,
        categoryId: product.data.categoryId,
        isActive: product.data.isActive,
        labels: product.data.labels?.map((lbl) => ({ id: lbl.id })) ?? [],
      });
      const labelIds = product.data.labels?.map((lbl) => lbl.id) || [];
      const selectedLabelsData = labels.data.filter((label) =>
        labelIds.includes(label.id),
      );
      setSelectedLabels(selectedLabelsData);
    }
  }, [product, labels, reset]);

  const onSubmit: SubmitHandler<UpdateProductInput> = async (data) => {
    try {
      await patchProductAction(id, data);
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-2"
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
      <div className="sm:col-span-2 lg:col-span-3">
        <ProductImageModal productId={id} />
      </div>
      <SubmitButton className="col-span-1 mt-2" label="ثبت ویرایش" />
    </form>
  );
}
