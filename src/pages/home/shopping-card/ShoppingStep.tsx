"use client";
import { useAppStore } from "@lib/stores/store";
import ShoppingCardStepper from "../stepper/shoppingCardStepper";
import UserAddress from "./UserAddress";

export default function ShoppingStep() {
  const { currentStep } = useAppStore();
  return (
    <div className="w-full">
      <ShoppingCardStepper />
      <>{currentStep === "address" && <UserAddress />}</>
    </div>
  );
}
