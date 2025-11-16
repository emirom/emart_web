"use client";

import { useSectionImagesStore } from "@/libs/stores/editor/section-images.store";
import { deleteProductMediaAction } from "@lib/actions/delete-product-media-action";
import { postProductMediaAction } from "@lib/actions/product-media-action";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

interface UseSectionImageHandlersProps {
  sectionId: string;
  side: "top" | "left" | "right";
  productId?: string;
}

export const useSectionImageHandlers = ({
  sectionId,
  side,
  productId,
}: UseSectionImageHandlersProps) => {
  const { sections, setSectionImage, removeSectionImage } =
    useSectionImagesStore();

  const currentSectionImages = useMemo(
    () => sections[sectionId] || {},
    [sections, sectionId],
  );

  const hasOtherImages = useCallback(() => {
    const otherSides = ["top", "left", "right"].filter(
      (s) => s !== side,
    ) as Array<"top" | "left" | "right">;
    return otherSides.some(
      (otherSide) => !!currentSectionImages[`${otherSide}Image`],
    );
  }, [currentSectionImages, side]);

  const hasCurrentImage = useCallback(() => {
    return !!currentSectionImages[`${side}Image`];
  }, [currentSectionImages, side]);

  const handleImageUpload = useCallback(
    async (file: FileWithPreview) => {
      if (hasOtherImages()) {
        toast.warning(
          "لطفاً تصویر فعلی را حذف کنید قبل از بارگذاری تصویر جدید.",
        );
        return false;
      }

      if (!productId) {
        toast.error("شناسه محصول یافت نشد");
        return false;
      }

      try {
        const uploadData = {
          file: file.file,
          productId,
          title: file.file.name,
          altText: `Image for section ${sectionId}`,
        };

        const result = await postProductMediaAction(uploadData);

        if (result.data && result.data.id) {
          const fileWithMediaId: FileWithPreview = {
            ...file,
            path: result.data.id,
          };

          setSectionImage(
            sectionId,
            side as "left" | "right" | "top",
            fileWithMediaId,
          );
          toast.success("تصویر با موفقیت آپلود شد");
          return true;
        } else {
          throw new Error("Upload failed - no ID returned");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(
          error instanceof Error ? error.message : "خطا در بارگذاری تصویر",
        );
        return false; // Upload failed
      }
    },
    [sectionId, side, hasOtherImages, setSectionImage, productId],
  );

  const handleImageRemove = useCallback(
    async (mediaId?: string) => {
      if (mediaId) {
        try {
          const result = await deleteProductMediaAction(mediaId);
          if (!result.success) {
            toast.error(result.error || "خطا در حذف تصویر");
            return false;
          }
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "خطا در حذف تصویر",
          );
          return false;
        }
      }

      // Remove from store
      removeSectionImage(sectionId, side as "left" | "right" | "top");
      return true; // Removal successful
    },
    [sectionId, side, removeSectionImage],
  );

  const getOtherImagesStatus = useCallback(() => {
    return {
      hasTopImage: !!currentSectionImages.topImage,
      hasLeftImage: !!currentSectionImages.leftImage,
      hasRightImage: !!currentSectionImages.rightImage,
    };
  }, [currentSectionImages]);

  return {
    handleImageUpload,
    handleImageRemove,
    hasOtherImages: hasOtherImages(),
    hasCurrentImage: hasCurrentImage(),
    getOtherImagesStatus,
  };
};
