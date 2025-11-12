import Container from "@components/Container";
import CustomBreadcrumb from "@components/CustomBradcrump";
import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return {
    title: `محصول با ایدی${id}`,
    description: `محصول با ایدی ${id}`,
  };
}

const routes = [
  { label: "ماهورهمراه", href: "/" },
  { label: "گوشی تلفن همراه", href: "/products" },
  { label: "گوشی موبایل", href: "/product" },
  { label: "آیفون " },
];
export default async function Page() {
  return (
    <>
      <figure className="shadow-2xl">
        <CustomImage
          src="/images/slider-image.png"
          alt={`images-slider}`}
          fill
          fetchPriority={"high"}
          loading={"eager"}
          className={cn(
            "aspect-[16/4] lg:aspect-[19/4] rounded-lg object-cover",
            "!opacity-100 !duration-0",
          )}
        />
      </figure>
      <Container>
        <CustomBreadcrumb routes={routes} className="my-5" />
      </Container>
    </>
  );
}
