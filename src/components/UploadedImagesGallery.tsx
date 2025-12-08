import { ProductMedia } from "@lib/schemas";
import { buildMediaUrl } from "@lib/utils/build-media-url";
import { ReactNode } from "react";
import CustomImage from "./CustomImage";

interface UploadedImagesGalleryProps
  extends Pick<ProductMedia, "id" | "url" | "altText"> {
  buttonsAction: ReactNode;
}

export default function UploadedImagesGallery({
  id,
  url,
  altText,

  buttonsAction,
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
          {id && buttonsAction}
        </div>
      </div>
    </div>
  );
}
