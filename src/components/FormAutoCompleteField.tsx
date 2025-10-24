"use client";

import { useAutocomplete } from "@lib/hooks/useAutocomplete";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { Input } from "./ui/input";

export interface AutocompleteProps<
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
> {
  options?: TOption[];
  label: string;
  name: FieldPath<TFieldValues>;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | null;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  onSelect?: (option: TOption | null) => void;
}

function FormAutocomplete<
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
>({
  options = [],
  onSelect,

  name,
  getOptionLabel,
  getOptionValue,
  inputProps,
  control,
  rules,
}: AutocompleteProps<TOption, TFieldValues>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const { inputValue, setInputValue, isOpen, open, close, filteredOptions } =
    useAutocomplete<TOption>(options, getOptionLabel);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && options.length > 0) {
      const selectedOption = options.find(
        (option) => getOptionValue(option) === value,
      );
      setInputValue(selectedOption ? getOptionLabel(selectedOption) : "");
    } else {
      setInputValue("");
    }
  }, [value, options, getOptionLabel, getOptionValue, setInputValue]);
  const t = useTranslations();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const onOptionClick = (option: TOption | null) => {
    if (option) {
      const val = getOptionValue(option);
      onChange(val ?? null);
      setInputValue(getOptionLabel(option));
      onSelect?.(option);
    } else {
      onChange(null as unknown as string);
      setInputValue("");
      onSelect?.(null);
    }
    close();
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-between grow">
      <div className="relative">
        <Input
          type="text"
          id={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={open}
          {...inputProps}
        />
        {isOpen && (
          <ul
            className={clsx(
              "text-sm text-[#0F4275] rounded-[7px] absolute w-full top-12 left-0 right-0 bg-white border border-gray-300 max-h-[400px] overflow-y-auto z-[100]",
            )}
          >
            <li
              key="empty-option"
              className="hover:bg-[#D4F1F4] p-2 cursor-pointer text-gray-500"
              onClick={() => onOptionClick(null)}
            >
              انتخاب کنید
            </li>
            {filteredOptions.length === 0 ? (
              <li className="hover:bg-[#D4F1F4] text-gray-400 text-center p-2 cursor-pointer">
                موردی وجود ندارد
              </li>
            ) : (
              filteredOptions.map((item, index) => (
                <li
                  key={`${getOptionValue(item)}-${index}`}
                  className="hover:bg-[#D4F1F4] p-2 cursor-pointer"
                  onClick={() => onOptionClick(item)}
                >
                  {getOptionLabel(item)}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}

export default FormAutocomplete;
