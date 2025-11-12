import InventoryTable from "@/pages/dashboard/inventory/InventoryTable";
import { HeaderWithLink } from "@components/HeaderWithLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "موجودی محصول" },
  description: " موجودی محصول",
};

export default async function Page() {
  return (
    <>
      <HeaderWithLink
        linkTitle="بازگشت"
        linkHref="/dashboard"
        title="موجودی محصول"
      />
      <InventoryTable />
    </>
  );
}
