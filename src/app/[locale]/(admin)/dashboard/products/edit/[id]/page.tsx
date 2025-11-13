import EditProductForm from "@/pages/dashboard/products/EditProductForm";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "صفحه اصلی",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <HeaderWithLink
        title="افزودن محصول"
        linkHref="/dashboard/products/add"
        linkTitle="بازگشت"
      />
      <EditProductForm editId={id} />
    </>
  );
}
