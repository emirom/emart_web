"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import SectionItem from "@components/sections/SectionItem";
import { SectionFormType } from "@/libs/types/sections";
import { CreateProductDescriptionInput } from "@lib/schemas";
import { createProductDescriptionAction } from "@lib/actions/product-description-action";
import { FieldArrayWithId, useFieldArray } from "react-hook-form";

// Define validation schema using Zod
const sectionSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(2, "عنوان باید حداقل 2 کاراکتر باشد")
        .max(100, "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد")
        .min(1, "عنوان الزامی است"),
      content: z
        .string()
        .min(2, "محتوا باید حداقل 2 کاراکتر باشد")
        .max(2000, "محتوا نمی‌تواند بیشتر از 2000 کاراکتر باشد")
        .min(1, "محتوا الزامی است"),
      topImageId: z.string().nullish(),
      leftImageId: z.string().nullish(),
      rightImageId: z.string().nullish(),
    }),
  ),
});

interface SectionsFormData {
  sections: SectionFormType[];
}

interface SectionsFormProps {
  productId: string;
}

const SectionsForm: React.FC<SectionsFormProps> = ({ productId }) => {
  const formMethods = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      sections: [
        {
          id: Date.now().toString(),
          title: "",
          content: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "sections",
  });

  const addNewSection = () => {
    const newSection: SectionFormType = {
      id: Date.now().toString(),
      title: "",
      content: "",
    };
    append(newSection);
  };

  const removeSection = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: SectionsFormData) => {
    // Validate that we have a product ID
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      // Process each section
      for (const section of data.sections) {
        // Prepare the product description input based on the section data
        const productDescriptionInput: CreateProductDescriptionInput = {
          title: section.title,
          text: section.content,
          mediaSide: "CENTER", // Default to center, you can modify based on your needs
          productId: productId,
          // The mediaId needs to be set based on the uploaded images
          // For now, we're not handling image uploads in this simplified version
        };

        // Call the server action to create the product description
        const result = await createProductDescriptionAction(
          productDescriptionInput,
        );

        if (!result.success) {
          throw new Error(result.error || "خطا در ایجاد توضیحات محصول");
        }
      }

      toast.success("توضیحات محصول با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error saving sections:", error);
      toast.error(
        error instanceof Error ? error.message : "خطا در ذخیره توضیحات محصول",
      );
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {fields.map((field, index) => (
            <SectionItem
              key={field.id}
              sectionId={field.id}
              index={index}
              title={formMethods.watch(`sections.${index}.title`)}
              content={formMethods.watch(`sections.${index}.content`)}
              onTitleChange={(title) =>
                formMethods.setValue(`sections.${index}.title`, title)
              }
              onContentChange={(content) =>
                formMethods.setValue(`sections.${index}.content`, content)
              }
              onRemove={() => removeSection(index)}
              onAddSection={addNewSection}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <motion.button
            type="submit"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ذخیره تغییرات
          </motion.button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SectionsForm;
