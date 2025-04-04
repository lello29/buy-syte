
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useProductForm } from "../ProductFormContext";

const StepNavSidebar: React.FC = () => {
  const { currentStep, setCurrentStep, steps } = useProductForm();

  return (
    <div className="w-64 shrink-0 hidden md:block">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={step.id}>
              <Button
                variant={currentStep === index ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => index <= currentStep && setCurrentStep(index)}
                disabled={index > currentStep}
              >
                <div className="flex items-center w-full">
                  <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                    currentStep > index 
                      ? "bg-primary/20 text-primary" 
                      : currentStep === index 
                        ? "bg-primary text-white" 
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {currentStep > index ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span>{step.label}</span>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepNavSidebar;
