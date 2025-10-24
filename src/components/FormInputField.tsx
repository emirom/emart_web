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
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <FormLabel
          label={label}
          htmlFor={name as string}
          className="text-xs mb-1 text-sky-500"
        />
      )}

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
            {fieldState.error && (
              <FormErrorMessage message={fieldState.error.message} />
            )}
          </>
        )}
      />
    </div>
  );
}

export { FormInputField };
