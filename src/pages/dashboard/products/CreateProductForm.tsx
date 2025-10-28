import { postProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { CreateProductInput } from "@lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProductForm() {
  const { handleSubmit, control, formState } = useForm<CreateProductInput>();

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      await postProductAction(data);
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      toast.success("محصول اضافه شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>CreateProductForm</form>;
}
