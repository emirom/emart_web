"use client";

import { DELIVERY_OPTIONS } from "@lib/constants/delivery-options";
import { useAppStore } from "@lib/stores/store";
import { useState } from "react";
import DeliveryOptionCard from "./DeliveryOptionCard";
import ShoppingCardPortalButton from "./ShoppingCardPortalButton";

export default function UserReceiveMethod() {
  const [selected, setSelected] = useState<string>("express");
  const { changeStepperState } = useAppStore();
  return (
    <form className="border border-gray-300 rounded-xl p-6 w-full bg-white shadow-sm">
      <h2 className="text-orange-500 text-base font-semibold mb-6 text-center">
        روش دریافت کالا
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {DELIVERY_OPTIONS.map((option) => (
          <DeliveryOptionCard
            key={option.id}
            option={option}
            isActive={selected === option.id}
            onSelect={setSelected}
          />
        ))}
      </div>
      <ShoppingCardPortalButton
        onClick={() => changeStepperState("receiveTime")}
      />
    </form>
  );
}
