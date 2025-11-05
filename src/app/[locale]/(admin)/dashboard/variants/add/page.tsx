import CreateVariantForm from "@/pages/dashboard/variants/CreateVariantForm";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن تنوع محصول",
  description: "افزودن تنوع محصول",
};

export default function Page() {
  return (
    <>
      <HeaderWithLink
        title="افزودن تنوع محصول"
        linkTitle="بازگشت"
        linkHref="/dashboard"
      />
      <CreateVariantForm />
    </>
  );
}
