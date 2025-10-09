import { Menu, Search, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MobilePrimaryHeader() {
  return (
    <div className="flex items-center w-full gap-2 md:hidden">
      <Button type="button" className="bg-tint-blue-100">
        <Menu className="stroke-tint-blue-500 stroke-3" />
      </Button>
      <div className="flex items-center w-full bg-tint-blue-100 rounded-md md:hidden">
        <Button className="bg-tint-blue-100 mx-0 " type="submit">
          <Search className="stroke-tint-blue-500 stroke-3 w-full" />
        </Button>
        <span className="text-tint-blue-500 block h-full">|</span>
        <Input
          className="border-0 text-sm ring-0 mx-0 p-1"
          placeholder="جستجو"
        />
      </div>
      <Button
        type="button"
        className="bg-tint-blue-100"
        formTarget="primary-search"
      >
        <ShoppingBasket className="stroke-tint-blue-500 stroke-3" />
      </Button>
    </div>
  );
}
