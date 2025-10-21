import DashboardHeader from "@components/DashboardHeader";
import DashboardSidebar from "@components/DashboardSidebar";
import { cn } from "@components/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "پنل ادمین",
    template: "%s - ماهور الوند",
  },
  description: "پنل مدیریت سایت ماهور الوند برای مدیریت محتوای سیستم.",
  openGraph: {
    title: "پنل ادمین - ماهور الوند",
    description: "مدیریت محتوا، کاربران و محصولات سایت ماهور الوند.",
    locale: "fa_IR",
    type: "website",
  },
  alternates: {
    canonical: "https://mahooralvand.ir/admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-tint-blue-200 py-2 text-gray-900",
        "selection:bg-primary/20 selection:text-primary-foreground",
      )}
      lang="fa"
      dir="rtl"
    >
      {/* ===== Header ===== */}
      <header
        role="banner"
        aria-label="سربرگ پنل مدیریت"
        className="flex-shrink-0"
      >
        <DashboardHeader />
      </header>

      {/* ===== Body Wrapper ===== */}
      <div
        className={cn(
          "flex flex-1 mt-2 w-[99%] mx-auto gap-2",
          "overflow-hidden focus-within:ring-2 focus-within:ring-primary/30",
          "transition-all duration-200",
        )}
      >
        {/* ===== Sidebar ===== */}
        <aside
          role="complementary"
          aria-label="نوار کناری پنل مدیریت"
          className={cn(
            "hidden lg:flex flex-col w-64 p-3 bg-white rounded-md shadow-md",
            "overflow-y-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
          )}
          tabIndex={0}
        >
          <DashboardSidebar />
        </aside>

        {/* ===== Main Content ===== */}
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          aria-label="محتوای اصلی پنل"
          className={cn(
            "flex-1 p-4 bg-white rounded-md shadow-md overflow-y-auto",
            "scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
