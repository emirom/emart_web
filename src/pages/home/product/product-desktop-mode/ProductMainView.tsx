import CustomImage from "@components/CustomImage";
import ProductButtonAction from "../product-mobile-mode/ProductButtonAction";
import ProductColor from "../ProductColor";

export default function ProductMainView() {
  return (
    <div className="col-span-5 rounded-lg shadow-md p-4 flex flex-col justify-between">
      <ProductButtonAction />
      <figure>
        <CustomImage
          src="/images/product.webp"
          alt="productImage"
          className="w-full h-73 mt-4 flex items-center justify-center"
          fill
        />
        <figcaption className="sr-only">
          تصویر محصول با عنوان گوشی موبایل
        </figcaption>
      </figure>
      <span className="block h-[1px] my-2 bg-gray-300"></span>
      <ProductColor />
    </div>
  );
}
