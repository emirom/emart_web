import { FileWithPreview } from "@lib/types/file-with-preview";
import { SubmitButton } from "./BtnWithIcon";
type ImageUploadButtonProps = {
  onClose: () => void;
  currentFile?: FileWithPreview | null;
};
export default function ImageUploadButton({
  onClose,

  currentFile,
}: ImageUploadButtonProps) {
  return (
    <div className="flex justify-between">
      <SubmitButton
        // label={isUploading ? "در حال آپلود..." : "آپلود تصویر"}
        label={"آپلود تصویر"}
        // disabled={!currentFile}
        // disabled={!currentFile || isUploading}
        className="bg-green-500 hover:bg-green-600 text-white"
        type="submit"
      />

      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        // disabled={isUploading}
      >
        انصراف
      </button>
    </div>
  );
}
