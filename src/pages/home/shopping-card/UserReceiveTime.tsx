"use client";

import { cn } from "@components/lib/utils";
import { useAppStore } from "@lib/stores/store";
import { useState } from "react";
import ShoppingCardPortalButton from "./ShoppingCardPortalButton";
import UserReceptionTime from "./UserReceptionTime";

export default function UserReceiveTime() {
  const [selected, setSelected] = useState<number>(0);
  const { changeStepperState } = useAppStore();
  return (
    <>
      <h2 className="text-orange-500 text-base font-semibold mb-6 text-center">
        انتخاب زمان دریافت
      </h2>
      <form className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, indx) => (
          <label
            key={indx}
            htmlFor="card"
            className={cn(
              "bg-white rounded-lg border flex flex-col gap-3  shadow-md p-4 ",
              selected === indx ? "border-green-400" : "border-gray-300",
            )}
            onClick={() => setSelected(indx)}
          >
            <span
              className={cn(
                "text-white flex items-center justify-center py-2 rounded-lg font-bold",
                selected === indx ? "bg-green-400" : " bg-tint-blue-500",
              )}
            >
              شنبه
            </span>
            <span className="font-medium text-tint-blue-500 block text-center">
              14 خردادماه
            </span>
            <span className="block bg-tint-blue-500 h-[1px] mt-3"></span>
            <span className="font-medium text-tint-blue-500 block text-center">
              ۹۹,۰۰۰ تومان
            </span>
          </label>
        ))}
        <UserReceptionTime />
        <ShoppingCardPortalButton
          onClick={() => changeStepperState("payment")}
        />
      </form>
    </>
  );
}
