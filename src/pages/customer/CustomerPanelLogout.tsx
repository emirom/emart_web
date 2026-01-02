import { Button } from "@components/ui/button";
import { LogOut } from "lucide-react";

export default function CustomerPanelLogout() {
  return (
    <div className="flex items-stretch gap-2 justify-between w-full">
      <span className="bg-red-600 flex items-center justify-center text-white px-2 rounded-md">
        <LogOut />
      </span>
      <Button className="bg-red-600 text-white flex-1  text-sm font-medium cursor-pointer">
        خروج
      </Button>
    </div>
  );
}
