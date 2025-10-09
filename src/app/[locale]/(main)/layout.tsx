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
      <main>{children}</main>
    </>
  );
}
