"use client";
import { fieldMapper } from "@lib/helper/fieldMapper";
import { FilterSchemaInput } from "@lib/types/file-type";
import { Funnel } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type FormGeneratorProps = {
  configs: FilterSchemaInput[] | null | undefined;
};

export default function FilterGenerator({ configs }: FormGeneratorProps) {
  const methods = useForm<Record<string, unknown>>();
  const { handleSubmit, control } = methods;

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    const params = new URLSearchParams(searchParams!.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.replace(`?${params.toString()}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" className="bg-gray cursor-pointer">
          <Funnel className="stroke-gray-400 stroke-3" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <FormProvider {...methods}>
          <form
            className="h-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SheetHeader className="flex items-center gap-2 text-start">
              <SheetTitle className="text-right">فیلترها</SheetTitle>
            </SheetHeader>

            <div className="px-4 flex-1 overflow-y-auto flex flex-col gap-3">
              {Array.isArray(configs) ? (
                configs.map((config, index) => {
                  const Component =
                    fieldMapper<Record<string, unknown>>(config);
                  return (
                    <Component key={index} config={config} control={control} />
                  );
                })
              ) : (
                <div>No filter configurations available</div>
              )}
            </div>

            <SheetFooter>
              <Button type="submit" className="bg-sky-400">
                اعمال فیلتر
              </Button>
              <SheetClose asChild>
                <Button className="bg-gray-100">بستن</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
