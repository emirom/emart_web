"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { postLabelAction } from "@lib/actions/label-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateLabelInput } from "@lib/schemas";
import { postLabelsBody } from "@lib/validations/label.validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateLabelForm() {
  const { handleSubmit, control, formState, reset } = useForm<CreateLabelInput>(
    {
      defaultValues: { pageId: null, name: "" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(postLabelsBody) as any,
    },
  );
  const onSubmit: SubmitHandler<CreateLabelInput> = async (data) => {
    try {
      await postLabelAction(data);
      queryClient.invalidateQueries({ queryKey: ["/labels"] });
      toast.success("برچسب اضافه شد");
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
      className="grid grid-cols-1 gap-2 md:grid-cols-2  items-stretch"
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
