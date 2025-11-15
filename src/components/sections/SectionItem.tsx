"use client";

import { useSectionImages } from "@/libs/hooks/sections/useSectionImages";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import React, { useCallback } from "react";
import ImageUploader from "../ui/image-uploader/ImageUploader";
import QuillEditorWrapper from "../ui/richtext-editor/QuillEditorWrapper";
import { useSectionImageHandlers } from "@/libs/hooks/sections/useSectionImageHandlers";

interface SectionItemProps {
  sectionId: string;
  index: number;
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onRemove: () => void;
  onAddSection: () => void;
}

const SectionItemComponent: React.FC<SectionItemProps> = ({
  sectionId,
  index,
  title,
  content,
  onTitleChange,
  onContentChange,
  onRemove,
  onAddSection,
}) => {
  const {
    topImage,
    leftImage,
    rightImage,
    setTopImage,
    setLeftImage,
    setRightImage,
    removeTopImage,
    removeLeftImage,
    removeRightImage,
  } = useSectionImages(sectionId);

  // Use the new hook for each side
  const topHandlers = useSectionImageHandlers({ sectionId, side: "top" });
  const leftHandlers = useSectionImageHandlers({ sectionId, side: "left" });
  const rightHandlers = useSectionImageHandlers({ sectionId, side: "right" });

  React.useEffect(() => {
    return () => {
      if (topImage?.preview) {
        URL.revokeObjectURL(topImage.preview);
      }
      if (leftImage?.preview) {
        URL.revokeObjectURL(leftImage.preview);
      }
      if (rightImage?.preview) {
        URL.revokeObjectURL(rightImage.preview);
      }
    };
  }, [topImage, leftImage, rightImage]);

  const handleTopImageChange = useCallback(
    (file: FileWithPreview) => {
      const success = topHandlers.handleImageUpload(file);
      if (success) {
        if (topImage?.preview) {
          URL.revokeObjectURL(topImage.preview);
        }
        setTopImage(file);
      }
    },
    [topHandlers, setTopImage, topImage],
  );

  const handleLeftImageChange = useCallback(
    (file: FileWithPreview) => {
      const success = leftHandlers.handleImageUpload(file);
      if (success) {
        if (leftImage?.preview) {
          URL.revokeObjectURL(leftImage.preview);
        }
        setLeftImage(file);
      }
    },
    [leftHandlers, setLeftImage, leftImage],
  );

  const handleRightImageChange = useCallback(
    (file: FileWithPreview) => {
      const success = rightHandlers.handleImageUpload(file);
      if (success) {
        if (rightImage?.preview) {
          URL.revokeObjectURL(rightImage.preview);
        }
        setRightImage(file);
      }
    },
    [rightHandlers, setRightImage, rightImage],
  );

  const handleRemoveTopImage = useCallback(async () => {
    if (topImage?.preview) {
      URL.revokeObjectURL(topImage.preview);
    }
    // Get the media ID if it exists and delete it
    const mediaId = topImage?.path; // Assuming path contains the media ID
    await topHandlers.handleImageRemove(mediaId);
    removeTopImage();
  }, [removeTopImage, topHandlers, topImage]);

  const handleRemoveLeftImage = useCallback(async () => {
    if (leftImage?.preview) {
      URL.revokeObjectURL(leftImage.preview);
    }
    // Get the media ID if it exists and delete it
    const mediaId = leftImage?.path; // Assuming path contains the media ID
    await leftHandlers.handleImageRemove(mediaId);
    removeLeftImage();
  }, [removeLeftImage, leftHandlers, leftImage]);

  const handleRemoveRightImage = useCallback(async () => {
    if (rightImage?.preview) {
      URL.revokeObjectURL(rightImage.preview);
    }
    // Get the media ID if it exists and delete it
    const mediaId = rightImage?.path; // Assuming path contains the media ID
    await rightHandlers.handleImageRemove(mediaId);
    removeRightImage();
  }, [removeRightImage, rightHandlers, rightImage]);

  return (
    <motion.div
      className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <span className="text-sm text-gray-500 mr-2">بخش {index + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddSection}
            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
          >
            <div className="flex items-center gap-1">
              <Plus size={14} />
              <span>افزودن بخش جدید</span>
            </div>
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="عنوان بخش..."
            className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-64 text-right"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-12 gap-2">
        <div className="lg:col-span-12 mb-4">
          <ImageUploader
            onImageChange={handleTopImageChange}
            onRemove={handleRemoveTopImage}
            previewImage={topImage}
            placeholderText="بارگذاری تصویر بالا"
            className="w-full min-h-32"
            hasOtherImages={
              topHandlers.hasOtherImages || topHandlers.hasCurrentImage
            }
          />
        </div>

        <div className="lg:col-span-2 flex">
          <ImageUploader
            onImageChange={handleLeftImageChange}
            onRemove={handleRemoveLeftImage}
            previewImage={leftImage}
            placeholderText="بارگذاری تصویر چپ"
            className="w-full h-40"
            hasOtherImages={
              leftHandlers.hasOtherImages || leftHandlers.hasCurrentImage
            }
          />
        </div>

        <div className="lg:col-span-8 flex">
          <QuillEditorWrapper
            value={content}
            onChange={onContentChange}
            className="h-full w-full"
          />
        </div>

        <div className="lg:col-span-2 flex">
          <ImageUploader
            onImageChange={handleRightImageChange}
            onRemove={handleRemoveRightImage}
            previewImage={rightImage}
            placeholderText="بارگذاری تصویر راست"
            className="w-full h-40"
            hasOtherImages={
              rightHandlers.hasOtherImages || rightHandlers.hasCurrentImage
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SectionItemComponent;
