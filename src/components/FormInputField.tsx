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

const normalizeNumber = (value: string) =>
  value.replace(/[۰-۹]/g, (d) => {
    const index = "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
    return String(index);
  });

const toPersianDigits = (value: string) =>
  value.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  type?: HTMLInputElement["type"];
  nuSeparator?: boolean;
}

function FormInputField<T extends FieldValues>({
  label,
  name,
  control,
  className,
  rules,
  type,
  nuSeparator = false,
  ...props
}: Props<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="block text-xs font-medium text-tint-blue-500">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          const displayValue =
            field.value === undefined || field.value === null
              ? ""
              : type === "number" && nuSeparator
                ? toPersianDigits(
                    String(field.value).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  )
                : String(field.value);

          return (
            <>
              <Input
                {...props}
                type="text"
                inputMode={type === "number" ? "numeric" : undefined}
                value={displayValue}
                onChange={(e) => {
                  if (type !== "number" || !nuSeparator) {
                    field.onChange(e.target.value);
                    return;
                  }

                  const raw = normalizeNumber(e.target.value).replace(/,/g, "");
                  const num = Number(raw);
                  field.onChange(!isNaN(num) ? num : undefined);
                }}
                className={cn(
                  fieldState.error && "border border-destructive text-black",
                  className,
                )}
              />
              {fieldState.error && (
                <p className="text-destructive text-[0.625rem] font-medium mt-[0.125rem]">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export { FormInputField };
