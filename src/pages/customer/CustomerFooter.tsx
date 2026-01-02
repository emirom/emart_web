import { Button } from "@components/ui/button";
import { customerFooterItem } from "@lib/constants/customer-footer-navigation";
import Link from "next/link";

export default function CustomerFooter() {
  return (
    <footer className="border-t w-full flex flex-col gap-3 px-5 py-4">
      <div className="flex items-center justify-center gap-2 text-red-600 md:justify-between">
        <p className="text-xs text-right">
          با تایید هویت می توانید امنیت حساب کاربری خود را افزایش داده و از
          امکانات بیشتر سایت استفاده کنید.
        </p>
        <Button className="bg-whit text-xs text-red-600 border border-red-600 cursor-pointer">
          تکمیل اطلاعات
        </Button>
      </div>
      <nav className="md:hidden">
        <div className="flex  items-center justify-between ">
          {customerFooterItem.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              title={item.title}
              className="bg-tint-blue-200 rounded-sm px-4 py-2 cursor-pointer"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  );
}
