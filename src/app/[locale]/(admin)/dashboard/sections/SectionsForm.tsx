"use client";

import { useSectionImagesStore } from "@/libs/stores/editor/section-images.store";
import { SectionFormType } from "@/libs/types/sections";
import SectionItem from "@components/sections/SectionItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductDescriptionAction } from "@lib/actions/product-description-action";
import { CreateProductDescriptionInput } from "@lib/schemas";
import { motion } from "framer-motion";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

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

  const onSubmit = async (data: SectionsFormData) => {
    if (!productId) {
      toast.error("شناسه محصول یافت نشد");
      return;
    }

    try {
      for (let i = 0; i < data.sections.length; i++) {
        const section = data.sections[i];
        const sectionImages = sectionImageStore[section.id];

        const hasPendingUploads =
          sectionImages?.topImage?.isUploading ||
          sectionImages?.leftImage?.isUploading ||
          sectionImages?.rightImage?.isUploading ||
          (sectionImages?.topImage && !sectionImages?.topImage?.path) ||
          (sectionImages?.leftImage && !sectionImages?.leftImage?.path) ||
          (sectionImages?.rightImage && !sectionImages?.rightImage?.path);

        if (hasPendingUploads) {
          toast.warning("لطفاً تا پایان بارگذاری تصاویر صبر کنید");
          return;
        }
      }

      for (let i = 0; i < data.sections.length; i++) {
        const section = data.sections[i];

        let mediaId: string | undefined;
        let mediaSide: "LEFT" | "CENTER" | "RIGHT" = "CENTER";

        if (section.leftImageId) {
          mediaId = section.leftImageId;
          mediaSide = "LEFT";
        } else if (section.rightImageId) {
          mediaId = section.rightImageId;
          mediaSide = "RIGHT";
        } else if (section.topImageId) {
          mediaId = section.topImageId;
          mediaSide = "CENTER";
        }

        const productDescriptionInput: CreateProductDescriptionInput = {
          title: section.title,
          text: section.content,
          mediaSide,
          productId: productId,
          ...(mediaId && { mediaId }),
        };

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
              productId={productId}
              onTitleChange={(title) =>
                formMethods.setValue(`sections.${index}.title`, title)
              }
              onContentChange={(content) =>
                formMethods.setValue(`sections.${index}.content`, content)
              }
              onRemove={() => removeSection(index)}
              onAddSection={addNewSection}
              onMediaInfoChange={(mediaInfo) => {
                if (mediaInfo.topImageId !== undefined) {
                  formMethods.setValue(
                    `sections.${index}.topImageId`,
                    mediaInfo.topImageId,
                  );
                }
                if (mediaInfo.leftImageId !== undefined) {
                  formMethods.setValue(
                    `sections.${index}.leftImageId`,
                    mediaInfo.leftImageId,
                  );
                }
                if (mediaInfo.rightImageId !== undefined) {
                  formMethods.setValue(
                    `sections.${index}.rightImageId`,
                    mediaInfo.rightImageId,
                  );
                }
              }}
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
