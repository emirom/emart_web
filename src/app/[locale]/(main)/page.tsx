import MultiPromote from "@/pages/home/MultiPromote";
import ProductSlider from "@/pages/home/ProductSlider";
import RelatedCarousel from "@/pages/home/RelatedCarousel";
import Container from "@components/Container";
import ShareCarousel from "@components/ShareCaousel";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <ProductSlider />
      <RelatedCarousel />
      <ShareCarousel
        title="پرفروش‌های‌این‌هفته"
        labelAria="Bestsellers of the week"
      />
      <Container>
        <MultiPromote />
      </Container>
    </>
  );
}
