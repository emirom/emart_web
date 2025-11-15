"use client";

import { useSectionsForm } from "@/libs/hooks/sections/useSectionsForm";
import { SectionFormType } from "@/libs/types/sections";
import React, { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SectionItem from "./SectionItem";

interface DynamicSectionsEditorProps {
  initialSections?: SectionFormType[];
  onSubmit?: (data: { sections: SectionFormType[] }) => void;
}

const DynamicSectionsEditor: React.FC<DynamicSectionsEditorProps> = ({
  initialSections = [],
  onSubmit,
}) => {
  const formMethods = useForm<{ sections: SectionFormType[] }>({
    defaultValues: {
      sections:
        initialSections.length > 0
          ? initialSections
          : [{ id: Date.now().toString(), title: "", content: "" }],
    },
  });

  const { fields, addNewSection, removeSection, handleSubmit, errors } =
    useSectionsForm();

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit?.(data);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="mb-6">
          <button
            type="button"
            onClick={addNewSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>افزودن بخش جدید</span>
          </button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <SectionItem
              key={field.id}
              sectionId={field.id}
              index={index}
              title={field.title || ""}
              content={field.content || ""}
              onTitleChange={(title) => {
                formMethods.setValue(`sections.${index}.title`, title);
              }}
              onContentChange={(content) => {
                formMethods.setValue(`sections.${index}.content`, content);
              }}
              onRemove={() => removeSection(index)}
              onAddSection={addNewSection}
            />
          ))}
        </div>

        {errors.sections && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            لطفا خطاهای فرم را بررسی کنید.
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(DynamicSectionsEditor);
