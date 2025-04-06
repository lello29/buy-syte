
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useProductForm } from "../ProductFormContext";

const MobileStepNav: React.FC = () => {
  const { currentStep, setCurrentStep, steps } = useProductForm();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to active step when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const activeButton = scrollContainer.querySelector(`[data-step="${currentStep}"]`);
      
      if (activeButton) {
        const buttonRect = (activeButton as HTMLElement).getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        
        // Center the active button in the scroll container
        const scrollLeft = 
          (activeButton as HTMLElement).offsetLeft - 
          (containerRect.width / 2) + 
          (buttonRect.width / 2);
        
        scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  // Safer click handler
  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="overflow-x-auto pb-1 mt-2 -mx-1" ref={scrollContainerRef}>
      <div className="flex space-x-1 px-1 min-w-fit">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            data-step={index}
            variant={currentStep === index ? "default" : "outline"}
            size="sm"
            className={`flex flex-col p-1.5 min-w-[56px] h-auto ${
              index > currentStep ? "opacity-50" : ""
            }`}
            onClick={() => handleStepClick(index)}
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
