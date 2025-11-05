import CreateProductForm from "@/pages/dashboard/products/CreateProductForm";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "صفحه اصلی",
};

export default async function Page() {
  return (
    <>
      <HeaderWithLink
        title="افزودن محصول"
        linkHref="/dashboard/products/add"
        linkTitle="بازگشت"
      />
      <CreateProductForm />
    </>
  );
}
