import MultiPromote from "@/pages/home/MultiPromote";
import ProductSlider from "@/pages/home/ProductSlider";
import RelatedCarousel from "@/pages/home/RelatedCarousel";
import Container from "@components/Container";
import ShareCarousel from "@components/ShareCaousel";
import SpecialOfferCarousel from "@components/SpecialOfferCarousel";

export default function HomePage() {
  return (
    <>
      {/* <LanguageSwitcher /> */}
      <ProductSlider />
      <RelatedCarousel />
      <ShareCarousel
        title="پرفروش‌های‌این‌هفته"
        labelAria="Bestsellers of the week"
      />
      <Container>
        <MultiPromote />
        <SpecialOfferCarousel labelAria="پیشنهاد ویژه" />
      </Container>
    </>
  );
}
