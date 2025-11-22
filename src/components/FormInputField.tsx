"use client";

import { InputHTMLAttributes } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "./lib/utils";
import { Input } from "./ui/input";

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
}

function FormInputField<T extends FieldValues>({
  label,
  name,
  control,
  className,
  rules,
  type,
  ...props
}: Props<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className={cn("block text-xs font-medium text-tint-blue-500")}>
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              data-slot="input"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                let value: unknown = e.target.value;

                if (type === "number") {
                  value =
                    e.target.value === "" ? undefined : Number(e.target.value);
                }

                field.onChange(value);
              }}
              className={cn(
                fieldState.error && "border border-destructive text-black",
                className,
              )}
              type={type}
              {...props}
            />
            {fieldState?.error && (
              <p className="text-destructive text-[0.625rem] font-medium mt-[0.125rem]">
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
