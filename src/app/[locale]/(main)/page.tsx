import ProductSlider from "@/pages/home/ProductSlider";
import RelatedCarousel from "@/pages/home/RelatedCarousel";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <ProductSlider />
      <RelatedCarousel />
    </>
  );
}
