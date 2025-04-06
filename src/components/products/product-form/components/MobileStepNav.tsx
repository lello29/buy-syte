
import React from "react";
import { Button } from "@/components/ui/button";
import { useProductForm } from "../ProductFormContext";

const MobileStepNav: React.FC = () => {
  const { currentStep, setCurrentStep, steps } = useProductForm();

  return (
    <div className="overflow-x-auto pb-1 mt-2 -mx-1">
      <div className="flex space-x-1 px-1 min-w-fit">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={currentStep === index ? "default" : "outline"}
            size="sm"
            className={`flex flex-col p-1.5 min-w-[56px] h-auto ${
              index > currentStep ? "opacity-50" : ""
            }`}
            onClick={() => index <= currentStep && setCurrentStep(index)}
            disabled={index > currentStep}
          >
            <step.icon className="h-3.5 w-3.5 mb-0.5" />
            <span className="text-[9px] leading-tight">{step.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileStepNav;
