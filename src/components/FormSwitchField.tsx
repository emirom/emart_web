"use client";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { cn } from "./lib/utils";

type SwitchButtonProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  defaultValue?: boolean;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
};

const FormSwitchField = <T extends FieldValues>({
  label,
  name,
  control,
  defaultValue = false,
  rules,
}: SwitchButtonProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      rules={rules}
      render={({ field: { value, onChange }, fieldState }) => {
        const isActive = value;
        const toggle = () => {
          onChange(!isActive);
        };
        return (
          <div className="flex flex-col justify-between text-tint-blue-500 text-xs font-medium">
            {label && (
              <label className={cn("block text-xs font-medium mb-1")}>
                {label}
              </label>
            )}
            <button
              type="button"
              onClick={toggle}
              className={cn(
                "w-[120px] h-9 bg-white rounded-[7px] border border-input flex items-center transition-all duration-300 overflow-hidden relative",
                fieldState.error && "border-destructive",
              )}
            >
              <div
                className={`absolute top-1 left-1 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] flex items-center justify-center text-white text-xs font-semibold rounded-[7px] transition-all duration-300
                  ${
                    isActive
                      ? "translate-x-[calc(50%+1.7rem)] bg-[#34C759] shadow-[0_0_8px_#34C759]"
                      : "translate-x-0 bg-[#FF3B30] shadow-[0_0_6px_#FF3B30]"
                  }`}
              >
                {isActive ? "فعال" : "غیرفعال"}
              </div>
              <div className="w-full h-full flex items-center justify-between px-1 text-xs font-normal text-center text-[#aaa]">
                <span className="block mr-3">فعال</span>
                <span>غیر فعال</span>
              </div>
            </button>
            {fieldState?.error && (
              <p className="text-destructive text-[0.625rem] font-medium mt-[0.125rem]">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormSwitchField;
