import ProductComparisonFilterLink from "@/pages/product-comparison/ProductComparisonFilterLink";
import Container from "@components/Container";
import React, { ReactNode } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
  tabs: ReactNode;
};
export default async function Layout({ children, params, tabs }: Props) {
  const { id } = await params;
  return (
    <>
      <div>{children}</div>
      <Container className="grid  gap-4 items-stretch  md:grid-cols-12">
        <div className="col-span-2">right</div>
        <section className="col-span-10">
          <ProductComparisonFilterLink id={id} />
          <div>{tabs}</div>
        </section>
      </Container>
    </>
  );
}
