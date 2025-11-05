import EditAttribute from "@/pages/dashboard/attribute/EditAttribute";
import EditCategory from "@/pages/dashboard/category/EditCategory";
import EditPreviewList from "@/pages/dashboard/category/EditPreviewList";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { getCategoriesId } from "@lib/services/categories/categories";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const { data } = await getCategoriesId(categoryId);
  return {
    title: `ویرایش دسته ${data.name}`,
    description: `ویرایش دسته ${data.name}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="ویرایش دسته بندی"
        linkHref="/dashboard"
        linkTitle="بازگشت"
      />
      <div className="grid items-stretch gap-2 relative lg:grid-cols-2">
        <div className="p-2 ">
          <EditCategory id={categoryId} />
          <EditAttribute id={categoryId} />
        </div>
        <div className="w-full ">
          <EditPreviewList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
