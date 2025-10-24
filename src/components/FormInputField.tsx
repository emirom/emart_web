"use client";

import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

function FormInputField<T extends FieldValues>({
  label,
  name,
  control,
  className,
  ...props
}: Props<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className={cn("block text-sm font-medium")}>{label}</label>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              data-slot="input"
              {...field}
              value={field.value ?? ""}
              className={cn(
                fieldState.error && "border border-destructive text-black",
                className,
              )}
              {...props}
            />
            {fieldState?.error && (
              <p className="text-destructive text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}

export { FormInputField };
