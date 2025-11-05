"use client";
import { useCallback, useMemo, useState } from "react";

export const useAutocomplete = <T extends object>(
  options: T[] = [],
  getOptionLabel: (option: T) => string,
) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, options, getOptionLabel]);

  const handleInputChange = useCallback((val: string) => {
    setInputValue(val);
    setIsOpen(true);
  }, []);

  const handleSelect = useCallback(
    (option: T) => {
      setSelectedOption(option);
      setInputValue(getOptionLabel(option));
      setIsOpen(false);
    },
    [getOptionLabel],
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    isOpen,
    open,
    close,
    filteredOptions,
    selectedOption,
    handleSelect,
  };
};
