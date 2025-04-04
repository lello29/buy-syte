
import React from "react";
import { Button } from "@/components/ui/button";
import { useProductForm } from "../ProductFormContext";

const MobileStepNav: React.FC = () => {
  const { currentStep, setCurrentStep, steps } = useProductForm();

  return (
    <div className="overflow-x-auto pb-2 mt-2">
      <div className="flex space-x-1">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={currentStep === index ? "default" : "outline"}
            size="sm"
            className={`flex flex-col px-2 py-1 min-w-[60px] h-auto ${
              index > currentStep ? "opacity-50" : ""
            }`}
            onClick={() => index <= currentStep && setCurrentStep(index)}
            disabled={index > currentStep}
          >
            <step.icon className="h-4 w-4 mb-1" />
            <span className="text-[10px]">{step.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileStepNav;
