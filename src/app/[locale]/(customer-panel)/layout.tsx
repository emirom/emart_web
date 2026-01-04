import CustomerFooter from "@/pages/customer/CustomerFooter";
import CustomerHeader from "@/pages/customer/CustomerHeader";
import CustomerPanelNavbar from "@/pages/customer/CustomerPanelNavbar";
import { cn } from "@components/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={cn("flex flex-col h-screen overflow-hidden")}>
      <CustomerHeader />
      <main
        className={cn(
          "flex-1  px-5 my-2 overflow-y-auto md:overflow-y-hidden",
          "md:grid grid-cols-12 md:items-stretch md:gap-2 md:p-6",
        )}
      >
        <CustomerPanelNavbar />
        <div className="md:col-span-9 h-full md:overflow-y-auto">
          {children}
        </div>
      </main>
      <CustomerFooter />
    </div>
  );
}
