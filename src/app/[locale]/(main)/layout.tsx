import MainFooter from "@components/MainFooter";
import MainHeader from "@components/MainHeader";
import { ReactNode } from "react";

export default async function mainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <MainHeader />
      <main className="mt-13 md:mt-28">{children}</main>
      <MainFooter />
    </>
  );
}
