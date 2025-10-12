import { Search } from "lucide-react";
import { MainHeaderMenu } from "./MainHeaderMenu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DesktopPrimaryHeader() {
  const inputId = "desktop-search-input";

  return (
    <header className="hidden md:block">
      <div className="flex items-stretch justify-baseline">
        <div className="flex items-center gap-2 w-full">
          <p aria-label="لوگو">logo</p>
          <div
            role="search"
            aria-label="جستجو"
            className="flex mr-10 items-stretch border border-tint-blue-100 rounded-md overflow-hidden w-full"
          >
            <Button
              className="bg-transparent mx-0 px-1"
              type="submit"
              form="primary-search"
              aria-label="جستجو"
              title="جستجو"
            >
              <Search
                className="stroke-black"
                aria-hidden="true"
                focusable="false"
              />
            </Button>
            <label htmlFor={inputId} className="sr-only">
              جستجو
            </label>
            <Input
              id={inputId}
              name="q"
              className="border-0 m-0 p-0"
              placeholder="چی می‌خوای پیدا کنی؟"
              aria-label="متن جستجو"
              autoComplete="off"
              type="search"
              form="primary-search"
            />
          </div>
        </div>

        <div className="w-full flex items-stretch gap-2 justify-end">
          <Button
            type="button"
            className="bg-tint-blue-100 text-tint-blue-500 border border-tint-blue-100 text-sm py-2"
            aria-label="ورود یا عضویت"
            title="ورود یا عضویت"
          >
            ورود‌ / عضویت
          </Button>
          <Button
            type="button"
            className="bg-white text-tint-blue-500 border border-tint-blue-100 text-sm py-2"
            aria-label="ورود یا عضویت"
            title="ورود یا عضویت"
          >
            ورود‌ / عضویت
          </Button>
        </div>
      </div>

      <nav className="mt-2" aria-label="منوی اصلی">
        <MainHeaderMenu />
      </nav>
    </header>
  );
}
