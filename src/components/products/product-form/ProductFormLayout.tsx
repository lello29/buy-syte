
import React, { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopFormLayout from "./layouts/DesktopFormLayout";
import MobileFormLayout from "./layouts/MobileFormLayout";
import { ProductFormProvider, useProductForm } from "./ProductFormContext";
import { Tabs } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface ProductFormLayoutProps {
  onClose?: () => void;
}

const ProductFormLayout: React.FC<ProductFormLayoutProps> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const { currentStep, steps } = useProductForm();
  
  // Log component state
  useEffect(() => {
    console.log("ProductFormLayout rendering", { isMobile, currentStep });
  }, [isMobile, currentStep]);

  // Show loading state while mobile detection is in progress
  if (isMobile === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Caricamento...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={steps[currentStep]?.id || ""}>
        {isMobile ? (
          <MobileFormLayout onClose={onClose} />
        ) : (
          <DesktopFormLayout onClose={onClose} />
        )}
      </Tabs>
    </div>
  );
};

const ProductFormWithProvider: React.FC<ProductFormLayoutProps> = (props) => {
  return (
    <ProductFormProvider>
      <ProductFormLayout {...props} />
    </ProductFormProvider>
  );
};

export default ProductFormWithProvider;
