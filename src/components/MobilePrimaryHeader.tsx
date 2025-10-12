import { Menu, Search, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MobilePrimaryHeader() {
  const inputId = "mobile-search-input";

  return (
    <div className="flex items-center w-full gap-2 md:hidden">
      <Button
        type="button"
        className="bg-tint-blue-100"
        aria-label="باز کردن منو"
        title="باز کردن منو"
      >
        <Menu
          className="stroke-tint-blue-500 stroke-3"
          aria-hidden="true"
          focusable="false"
        />
      </Button>

      <div
        role="search"
        aria-label="جستجو"
        className="flex items-center w-full bg-tint-blue-100 rounded-md md:hidden"
      >
        <Button
          className="bg-tint-blue-100 mx-0"
          type="submit"
          form="primary-search"
          aria-label="جستجو"
          title="جستجو"
        >
          <Search
            className="stroke-tint-blue-500 stroke-3 w-full"
            aria-hidden="true"
            focusable="false"
          />
        </Button>

        <span
          className="text-tint-blue-500 block h-full px-1"
          aria-hidden="true"
        >
          |
        </span>

        <Input
          id={inputId}
          name="q"
          type="search"
          form="primary-search"
          className="border-0 text-sm ring-0 mx-0 p-1 w-full bg-transparent"
          placeholder="جستجو"
          aria-label="متن جستجو"
          autoComplete="off"
        />
      </div>

      <Button
        type="button"
        className="bg-tint-blue-100"
        aria-label="سبد خرید"
        title="سبد خرید"
      >
        <ShoppingBasket
          className="stroke-tint-blue-500 stroke-3"
          aria-hidden="true"
          focusable="false"
        />
      </Button>
    </div>
  );
}
