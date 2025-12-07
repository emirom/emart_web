import { ProductMedia } from "@lib/schemas";
import { buildMediaUrl } from "@lib/utils/build-media-url";
import { TrashIcon } from "lucide-react";
import CustomImage from "./CustomImage";
import { Button } from "./ui/button";

interface UploadedImagesGalleryProps
  extends Pick<ProductMedia, "id" | "url" | "altText"> {
  onDelete: (id: string) => void;
}

export default function UploadedImagesGallery({
  id,
  url,
  altText,
  onDelete,
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

      <Button
        onClick={() => onDelete?.(id)}
        className="absolute top-2 w-7 h-7 right-2 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="حذف تصویر"
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
}
