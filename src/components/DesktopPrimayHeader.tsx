import { Search } from "lucide-react";
import { MainHeaderMenu } from "./MainHeaderMenu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default async function DesktopPrimaryHeader() {
  return (
    <div className="hidden  md:block">
      <div className="flex items-stretch justify-baseline">
        <div className="flex items-center gap-2 w-full">
          <p>logo</p>
          <div className="flex mr-10 items-stretch border border-tint-blue-100 rounded-md overflow-hidden w-full">
            <Button className="bg-transparent mx-0 px-1" type="submit">
              <Search className="stroke-black" />
            </Button>
            <Input className="border-0 m-0 p-0" />
          </div>
        </div>
        <div className="w-full flex items-stretch gap-2 justify-end">
          <Button
            type="button"
            className="bg-tint-blue-100 text-tint-blue-500 border border-tint-blue-100 text-sm py-2"
          >
            ورود‌ / عضویت
          </Button>
          <Button
            type="button"
            className="bg-white text-tint-blue-500 border border-tint-blue-100 text-sm py-2"
          >
            ورود‌ / عضویت
          </Button>
        </div>
      </div>
      <menu className="mt-2">
        <MainHeaderMenu />
      </menu>
    </div>
  );
}
