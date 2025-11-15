"use client";

import React, { useCallback } from "react";
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
import { useSectionImagesStore } from "@/libs/stores/editor/section-images.store";
import { uploadProductMediaAction } from "@lib/actions/upload-product-media-action";
import { FileWithPreview } from "@lib/types/file-with-preview";

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
      topImageId: z.string().optional(),
      leftImageId: z.string().optional(),
      rightImageId: z.string().optional(),
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

  const { sections: sectionImageStore } = useSectionImagesStore();

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

  const uploadImage = useCallback(
    async (imageFile: FileWithPreview, productId: string) => {
      if (!imageFile.file) return null;

      try {
        const uploadData = {
          file: imageFile.file,
          productId,
          title: imageFile.file.name,
          altText: `Image for product ${productId}`,
        };

        const result = await uploadProductMediaAction(uploadData);
        if (result.success && result.data) {
          return result.data.data?.id || null; // Return the media ID from the response data
        } else {
          throw new Error(result.error || "Upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(
          error instanceof Error ? error.message : "خطا در بارگذاری تصویر",
        );
        return null;
      }
    },
    [],
  );

  const onSubmit = async (data: SectionsFormData) => {
    // Validate that we have a product ID
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      // Process each section
      for (let i = 0; i < data.sections.length; i++) {
        const section = data.sections[i];
        const sectionImages = sectionImageStore[section.id];

        // Prepare image IDs for this section
        let topImageId: string | null = null;
        let leftImageId: string | null = null;
        let rightImageId: string | null = null;

        // Upload and get image IDs
        if (sectionImages?.topImage) {
          topImageId = await uploadImage(sectionImages.topImage, productId);
        }
        if (sectionImages?.leftImage) {
          leftImageId = await uploadImage(sectionImages.leftImage, productId);
        }
        if (sectionImages?.rightImage) {
          rightImageId = await uploadImage(sectionImages.rightImage, productId);
        }

        // Determine which image to use as mediaId and which side to place it
        let mediaId: string | undefined;
        let mediaSide: "LEFT" | "CENTER" | "RIGHT" = "CENTER";

        if (leftImageId) {
          mediaId = leftImageId;
          mediaSide = "LEFT";
        } else if (rightImageId) {
          mediaId = rightImageId;
          mediaSide = "RIGHT";
        } else if (topImageId) {
          mediaId = topImageId;
          mediaSide = "CENTER"; // Top image can be treated as center in some contexts
        }

        // Prepare the product description input based on the section data
        const productDescriptionInput: CreateProductDescriptionInput = {
          title: section.title,
          text: section.content,
          mediaSide, // Use the appropriate media side
          productId: productId,
          mediaId, // Use the uploaded media ID
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
