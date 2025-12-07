import { ProductMedia } from "@lib/schemas";
import { buildMediaUrl } from "@lib/utils/build-media-url";
import { Edit, TrashIcon } from "lucide-react";
import CustomImage from "./CustomImage";
import { Button } from "./ui/button";

interface UploadedImagesGalleryProps
  extends Pick<ProductMedia, "id" | "url" | "altText"> {
  onDelete: (id: string) => void;
  edit?: true;
}

export default function UploadedImagesGallery({
  id,
  url,
  altText,
  onDelete,
  edit,
}: UploadedImagesGalleryProps) {
  return (
    <div className="relative group border rounded-lg overflow-hidden">
      <CustomImage
        src={buildMediaUrl(url)}
        alt={altText || "product image"}
        width={150}
        height={150}
        className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105 flex items-center justify-center"
      />

      <div
        className="
      absolute bottom-0 w-full h-10 bg-white/30 backdrop-blur-xs rounded-t-lg
      opacity-0 group-hover:opacity-100 transition-opacity duration-200
    "
      >
        <div className="absolute bottom-0 flex items-center justify-between w-full h-12 px-2">
          <Button
            onClick={() => onDelete?.(id)}
            className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
            aria-label="حذف تصویر"
          >
            <TrashIcon size={16} />
          </Button>
          {edit && (
            <Button
              onClick={() => onDelete?.(id)}
              className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer"
              aria-label="حذف تصویر"
            >
              <Edit size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
