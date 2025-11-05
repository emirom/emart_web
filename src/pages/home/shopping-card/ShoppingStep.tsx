"use client";
import { useAppStore } from "@lib/stores/store";
import ShoppingCardStepper from "../stepper/shoppingCardStepper";
import UserAddress from "./UserAddress";
import UserPaymentMethod from "./UserPaymentMethod";
import UserReceiveMethod from "./UserReceiveMethod";
import UserReceiveTime from "./UserReceiveTime";

export default function ShoppingStep() {
  const { currentStep } = useAppStore();

  return (
    <div className="w-full">
      <ShoppingCardStepper />
      {currentStep === "address" && <UserAddress />}
      {currentStep === "receiverMethod" && <UserReceiveMethod />}
      {currentStep === "receiveTime" && <UserReceiveTime />}
      {currentStep === "payment" && <UserPaymentMethod />}
    </div>
  );
}
