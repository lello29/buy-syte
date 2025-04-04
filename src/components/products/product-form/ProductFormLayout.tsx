
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopFormLayout from "./layouts/DesktopFormLayout";
import MobileFormLayout from "./layouts/MobileFormLayout";
import { ProductFormProvider, useProductForm } from "./ProductFormContext";
import { Tabs } from "@/components/ui/tabs";

interface ProductFormLayoutProps {
  onClose?: () => void;
}

const ProductFormLayout: React.FC<ProductFormLayoutProps> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const { currentStep, steps } = useProductForm();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={steps[currentStep].id}>
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
