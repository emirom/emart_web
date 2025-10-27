import { SubmitButton } from "@components/BtnWithIcon";
import { FormInputField } from "@components/FormInputField";
import { updateUnitAction } from "@lib/actions/units-actions";
import { queryClient } from "@lib/apis/queryClient";
import { UpdateUnitInput } from "@lib/schemas";
import { useGetUnitsId } from "@lib/services/units/units";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditAttributeForm({ id }: { id: string }) {
  const { handleSubmit, control, formState, reset } =
    useForm<UpdateUnitInput>();
  const { data: unit } = useGetUnitsId(id);
  useEffect(() => {
    reset({ ...unit });
  }, [unit, reset]);
  const onSubmit: SubmitHandler<UpdateUnitInput> = async (data) => {
    try {
      await updateUnitAction(id, data);
      queryClient.invalidateQueries({ queryKey: ["/units"] });
      toast.success("کمیت ویرایش شد");
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
