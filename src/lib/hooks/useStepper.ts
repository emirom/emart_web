import { useState } from "react";

export function useStepper(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const next = () => goToStep(currentStep + 1);
  const prev = () => goToStep(currentStep - 1);

  return {
    currentStep,
    goToStep,
    next,
    prev,
  };
}
