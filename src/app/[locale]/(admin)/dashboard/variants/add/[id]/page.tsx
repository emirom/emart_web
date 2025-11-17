import { getVariantsId } from "@lib/services/variants/variants";
import Head from "next/head";

export async function generateMetadata({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = await params;
  const variant = await getVariantsId(id);
  return {
    title: {
      absolute: `افزودن تصاویر${variant.data.metaTitle}`,
    },
    description: `${variant.data.metaDescription}`,
  };
}

export default async function Page() {
  return (
    <>
      <Head>
        <title>تصاویر</title>
      </Head>
      hello world
    </>
  );
}
