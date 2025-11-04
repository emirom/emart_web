import ProductMobileMode from "@/pages/home/product/product-mobile-mode/ProductMobileMode";
import Container from "@components/Container";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <Container>
      <ProductMobileMode />
    </Container>
  );
}
