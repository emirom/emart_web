"use client";

import { useStepper } from "@lib/hooks/useStepper";
import StepItem from "./StepperItem";

const steps = [
  { id: 1, label: "سبد خرید" },
  { id: 2, label: "اطلاعات ارسال" },
  { id: 3, label: "پرداخت" },
  { id: 4, label: "تایید نهایی" },
];

export default function ShoppingCardStepper() {
  const { currentStep, goToStep } = useStepper(steps.length);

  return (
    <nav
      aria-label="مراحل خرید"
      className="flex justify-center items-center gap-4 p-4 mt-0 pt-0"
    >
      <ol className="flex flex-wrap justify-center items-center gap-6">
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            stepNumber={index + 1}
            label={step.label}
            isActive={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
            onClick={() => goToStep(index + 1)}
          />
        ))}
      </ol>
    </nav>
  );
}
