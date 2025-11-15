import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SectionFormType } from "@/libs/types/sections";

export const useSectionsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<{ sections: SectionFormType[] }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const addNewSection = useCallback(() => {
    const newSection: SectionFormType = {
      id: Date.now().toString(),
      title: "",
      content: "",
    };
    append(newSection);
  }, [append]);

  const removeSection = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return {
    fields,
    addNewSection,
    removeSection,
    handleSubmit,
    errors,
  };
};
