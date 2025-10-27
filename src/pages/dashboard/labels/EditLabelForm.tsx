"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { patchLabelAction } from "@lib/actions/label-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateLabelInput } from "@lib/schemas";
import { useGetLabelsId } from "@lib/services/labels/labels";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditLabelForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateLabelInput>();
  const { data: label } = useGetLabelsId(id);
  useEffect(() => {
    reset({ ...label?.data });
  }, [label, reset]);
  const onSubmit: SubmitHandler<CreateLabelInput> = async (data) => {
    try {
      await patchLabelAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/labels"] });
      toast.success("برچسب ویرایش شد");
      reset();
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
      className="grid grid-cols-1 gap-2 md:grid-cols-2  items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField control={control} label="نام برچسب" name="name" />
      <FormInputField control={control} label="شناسه صفحه" name="pageId" />

      <SubmitButton
        className="w-full col-span-1 md:col-span-2"
        disabled={!formState.isDirty}
      />
    </form>
  );
}
