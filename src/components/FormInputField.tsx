"use client";
import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormLabel } from "./FormLabel";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
}

function FormInputField<T extends FieldValues>({
  label,
  name,
  control,
  className,
  ...props
}: Props<T>) {
  return (
    <div>
      <FormLabel label={label} htmlFor={name as string} />

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              data-slot="input"
              {...field}
              className={cn(
                `${fieldState.error && "border border-destructive text-black"}`,
                className,
              )}
              {...props}
            />
            <FormErrorMessage message={fieldState.error?.message} />
          </>
        )}
      />
    </div>
  );
}

export { FormInputField };
