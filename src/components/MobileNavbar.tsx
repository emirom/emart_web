import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function MobileNavbar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
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
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>navbar</SheetTitle>
          </SheetHeader>
          {/* <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
          <Label htmlFor="sheet-demo-name">Name</Label>
          <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
          <Label htmlFor="sheet-demo-username">Username</Label>
          <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
          </div> */}
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
