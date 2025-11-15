"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { useSectionImagesStore } from "@/libs/stores/editor/section-images.store";
import { deleteProductMediaAction } from "@lib/actions/delete-product-media-action";
import { FileWithPreview } from "@lib/types/file-with-preview";

interface UseSectionImageHandlersProps {
  sectionId: string;
  side: "top" | "left" | "right";
}

export const useSectionImageHandlers = ({
  sectionId,
  side,
}: UseSectionImageHandlersProps) => {
  const { sections, setSectionImage, removeSectionImage, clearSectionImages } =
    useSectionImagesStore();

  const currentSectionImages = sections[sectionId] || {};

  // Check if any other image is uploaded for this section (excluding the current side)
  const hasOtherImages = useCallback(() => {
    const otherSides = ["top", "left", "right"].filter(
      (s) => s !== side,
    ) as Array<"top" | "left" | "right">;
    return otherSides.some(
      (otherSide) => !!currentSectionImages[`${otherSide}Image`],
    );
  }, [currentSectionImages, side]);

  // Check if the current side has an image
  const hasCurrentImage = useCallback(() => {
    return !!currentSectionImages[`${side}Image`];
  }, [currentSectionImages, side]);

  // Handle new image upload with restriction logic
  const handleImageUpload = useCallback(
    (file: FileWithPreview) => {
      // Check if any other image is already uploaded
      if (hasOtherImages()) {
        toast.warning(
          "لطفاً تصویر فعلی را حذف کنید قبل از بارگذاری تصویر جدید.",
        );
        return false; // Prevent upload
      }

      // Set the new image
      setSectionImage(sectionId, side as "left" | "right" | "top", file);
      return true; // Upload successful
    },
    [sectionId, side, hasOtherImages, setSectionImage],
  );

  // Handle image removal with backend delete
  const handleImageRemove = useCallback(
    async (mediaId?: string) => {
      // If there's a mediaId, delete from backend
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

  // Check if other updaters have images
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
