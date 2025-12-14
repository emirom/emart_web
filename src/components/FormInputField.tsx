"use client";

import { InputHTMLAttributes, useState } from "react";
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
  value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const toPersianDigits = (value: string) =>
  value.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  type?: HTMLInputElement["type"];
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
  const [isPersian, setIsPersian] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="block text-xs font-medium text-tint-blue-500">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          const displayValue =
            field.value === undefined || field.value === null
              ? ""
              : isPersian
                ? toPersianDigits(String(field.value))
                : String(field.value);

          return (
            <>
              <Input
                {...props}
                type="text"
                inputMode={type === "number" ? "numeric" : undefined}
                value={displayValue}
                onChange={(e) => {
                  if (type !== "number") {
                    field.onChange(e.target.value);
                    return;
                  }

                  const raw = e.target.value;

                  if (/[۰-۹]/.test(raw)) {
                    setIsPersian(true);
                  }

                  if (/[0-9]/.test(raw)) {
                    setIsPersian(false);
                  }

                  const normalized = normalizeNumber(raw);

                  if (normalized === "") {
                    field.onChange(undefined);
                    return;
                  }

                  const num = Number(normalized);
                  if (!Number.isNaN(num)) {
                    field.onChange(num);
                  }
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
