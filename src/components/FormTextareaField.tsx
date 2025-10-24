"use client";
import { TextareaHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "./lib/utils";
import { Textarea } from "./ui/textarea";
interface Props<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  className?: string;
}

export function FormTextareaField<T extends FieldValues>({
  control,
  name,
  placeholder = "Type your message here.",
  className,
}: Props<T>) {
  return (
    <div className="grid w-full ">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          return (
            <>
              <Textarea
                placeholder={placeholder}
                id={name}
                {...field}
                className={cn(
                  `${fieldState?.error && "border-destructive ring-destructive"}`,
                  className,
                )}
              />
            </>
          );
        }}
      />
    </div>
  );
}
