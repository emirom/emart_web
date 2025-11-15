import { useCallback } from "react";
import { useSectionImagesStore } from "@/libs/stores/editor/section-images.store";
import { FileWithPreview } from "@lib/types/file-with-preview";

export const useSectionImages = (sectionId: string) => {
  const {
    sections,
    setSectionImage,
    removeSectionImage,
    removeSection,
    clearSectionImages,
  } = useSectionImagesStore();

  const setTopImage = useCallback(
    (file: FileWithPreview) => {
      // Clear all other images before setting the new one
      clearSectionImages(sectionId);
      setSectionImage(sectionId, "top" as const, file);
    },
    [sectionId, setSectionImage, clearSectionImages],
  );

  const setLeftImage = useCallback(
    (file: FileWithPreview) => {
      // Clear all other images before setting the new one
      clearSectionImages(sectionId);
      setSectionImage(sectionId, "left" as const, file);
    },
    [sectionId, setSectionImage, clearSectionImages],
  );

  const setRightImage = useCallback(
    (file: FileWithPreview) => {
      // Clear all other images before setting the new one
      clearSectionImages(sectionId);
      setSectionImage(sectionId, "right" as const, file);
    },
    [sectionId, setSectionImage, clearSectionImages],
  );

  const removeTopImage = useCallback(() => {
    removeSectionImage(sectionId, "top" as const);
  }, [sectionId, removeSectionImage]);

  const removeLeftImage = useCallback(() => {
    removeSectionImage(sectionId, "left" as const);
  }, [sectionId, removeSectionImage]);

  const removeRightImage = useCallback(() => {
    removeSectionImage(sectionId, "right" as const);
  }, [sectionId, removeSectionImage]);

  const sectionImages = sections[sectionId] || {};

  return {
    topImage: sectionImages.topImage,
    leftImage: sectionImages.leftImage,
    rightImage: sectionImages.rightImage,
    setTopImage,
    setLeftImage,
    setRightImage,
    removeTopImage,
    removeLeftImage,
    removeRightImage,
    removeSection: useCallback(
      () => removeSection(sectionId),
      [removeSection, sectionId],
    ),
  };
};
