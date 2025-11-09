import CustomImage from "@components/CustomImage";
import { Ellipsis } from "lucide-react";

export default function ProductImages() {
  return (
    <div className="col-span-1 flex flex-col justify-between">
      {Array.from({ length: 5 }).map((_, index) => (
        <figure key={index}>
          <CustomImage
            src="/images/product.webp"
            alt="productImage"
            className="flex items-center justify-center rounded-lg object-center shadow-md p-4"
            width={50}
            height={70}
          />
          <figcaption className="sr-only">
            تصویر محصول با عنوان گوشی موبایل
          </figcaption>
        </figure>
      ))}
      <button
        type="button"
        aria-label="مشاهده تصاویر بیشتر"
        className="flex items-center justify-center rounded-lg shadow-md p-4 text-tint-blue-500 cursor-pointer"
      >
        <Ellipsis />
      </button>
    </div>
  );
}
