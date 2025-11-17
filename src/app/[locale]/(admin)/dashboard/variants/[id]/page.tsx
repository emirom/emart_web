import EditVariantForm from "@/pages/dashboard/variants/EditVariantForm";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { getVariantsId } from "@lib/services/variants/variants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = await params;
  const variant = await getVariantsId(id);
  return {
    title: `${variant.data.metaTitle}`,
    description: `${variant.data.metaDescription}`,
  };
}

export default async function Page({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = await params;
  const variant = await getVariantsId(id);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="ویرایش تنوع محصول"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <EditVariantForm id={id} />
    </HydrationBoundary>
  );
}
