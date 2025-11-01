import CreateAttribute from "@/pages/dashboard/attribute/CreateAttributeForm";
import CreateCategory from "@/pages/dashboard/category/CreateCategory";
import PreviewList from "@/pages/dashboard/category/PreviewList";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeaderWithLink
        title="افزودن‌دسته و ویژگی"
        linkHref="/dashboard"
        linkTitle="بازگشت"
      />
      <div className="grid items-stretch gap-2 relative lg:grid-cols-2">
        <div className="p-2 ">
          <CreateCategory />
          <CreateAttribute />
        </div>
        <div className="w-full ">
          <PreviewList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
