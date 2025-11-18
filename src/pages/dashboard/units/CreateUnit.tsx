"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { FormInputField } from "@components/FormInputField";
import { Button } from "@components/ui/button";
import { postUnitAction } from "@lib/actions/units-actions";
import { queryClient } from "@lib/apis/queryClient";
import { CreateUnitInput } from "@lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function CreateUnit() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server to prevent hydration mismatch
  }

  return (
    <DashboardCustomModal
      button={
        <Button className="bg-green-200" aria-label="افزودن کمیت">
          افزودن کمیت
        </Button>
      }
      title="افزودن کمیت"
      element={<CreateUnitForm />}
    />
  );
}
export function CreateUnitForm() {
  const { handleSubmit, control, formState, reset } =
    useForm<CreateUnitInput>();
  const onSubmit: SubmitHandler<CreateUnitInput> = async (data) => {
    try {
      await postUnitAction(data);
      queryClient.invalidateQueries({ queryKey: ["/units"] });
      toast.success("کمیت اضافه شد");
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
      <FormInputField control={control} name="title" label="نام کمیت" />
      <SubmitButton disabled={!formState.isDirty} />
    </form>
  );
}
