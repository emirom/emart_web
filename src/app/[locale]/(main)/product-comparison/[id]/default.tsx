import { redirect } from "next/navigation";

export default async function DefaultTabs({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/product-comparison/${id}`);
}
