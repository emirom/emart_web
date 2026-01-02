"use client";
import { Button } from "@components/ui/button";
import { useClipboard } from "@lib/hooks/useClipboard";
import { CircleAlert, Copy } from "lucide-react";

export default function BeRand() {
  const { copy } = useClipboard();
  return (
    <div className="flex flex-col gap-2 ">
      <div className="relative text-sm text-tint-blue-500 font-medium w-fit ">
        <span>رند باش</span>
        <CircleAlert
          className="absolute -left-3 -top-2 bg-red-600 rounded-full stroke-white"
          size={13}
        />
      </div>
      <div className="bg-tint-blue-100 rounded-md p-4 flex flex-col gap-2">
        <p className="text-tint-blue-500 text-sm font-medium text-nowrap">
          تاریخ اعتبار : 1404/04/04 - 1 بار
        </p>
        <div className="flex gap-2 items-stretch">
          <span className="rounded-md flex items-center justify-center  w-full bg-white text-orange-400 font-medium text-sm">
            MH7h2j392f
          </span>
          <Button
            onClick={() => copy("MH7h2j392f")}
            className="bg-orange-400 text-white text-sm font-medium cursor-pointer"
          >
            <Copy />
          </Button>
        </div>
      </div>
    </div>
  );
}
