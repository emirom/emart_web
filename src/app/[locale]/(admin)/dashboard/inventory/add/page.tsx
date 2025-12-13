import AddInventoryLinked from "@/pages/dashboard/inventory/AddInventoryLinked";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "افزودن موجودی",
  description: "افزودن موجودی",
};
export default async function Page() {
  return <AddInventoryLinked />;
}
