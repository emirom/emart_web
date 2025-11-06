import Container from "@components/Container";
import Link from "next/link";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return {
    title: {
      absolute: "محصول های ما",
    },
    description: "محصولات ما را با استفاده از سایت ما به شما ارائه دهید",
  };
}
export default async function Layout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
      <Container>
        <div className="flex items-center gap-2 bg-tint-blue-100 py-3 px-4 text-xs text-tint-blue-500 font-medium rounded-tl-lg rounded-tr-lg ">
          <Link href="/product/1/specification">مشخصات محصول</Link>
          {/* <Link href="/product/1/specifications">نقد و بررسی</Link> */}
          <Link href="/product/1/comment">نظرات کاربران</Link>
        </div>
        <div className="mt-4">{tabs}</div>
      </Container>
    </>
  );
}
