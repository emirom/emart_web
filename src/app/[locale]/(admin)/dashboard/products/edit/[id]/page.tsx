import EditProductForm from "@/pages/dashboard/products/EditProductForm";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { getProductsId } from "@lib/services/products/products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
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
  queryClient.prefetchQuery({
    queryKey: ["/products", id],
    queryFn: () => getProductsId(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="افزودن محصول"
        linkHref="/dashboard/products/add"
        linkTitle="بازگشت"
      />
      <EditProductForm editId={id} />
    </HydrationBoundary>
  );
}
