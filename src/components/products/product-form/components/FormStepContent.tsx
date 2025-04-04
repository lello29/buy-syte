
import React from "react";
import { useProductForm } from "../ProductFormContext";
import BarcodeStep from "./BarcodeStep";
import ProductBasicInfo from "../ProductBasicInfo";
import ProductDetails from "../ProductDetails";
import ProductImages from "../ProductImages";
import ProductOptions from "../ProductOptions";
import ProductPublish from "../ProductPublish";

interface FormStepContentProps {
  onClose?: () => void;
  isMobile?: boolean;
  handleSkipToManualEntry?: () => void;
}

const FormStepContent: React.FC<FormStepContentProps> = ({ 
  onClose, 
  isMobile,
  handleSkipToManualEntry 
}) => {
  const { 
    currentStep, 
    productData, 
    updateProductData, 
    handleSkipToManualEntry: contextSkipToManual,
    handleSubmit 
  } = useProductForm();

  // Use provided function or the one from context
  const skipToManual = handleSkipToManualEntry || contextSkipToManual;

  if (currentStep === 0) {
    return <BarcodeStep isMobile={isMobile} handleSkipToManualEntry={skipToManual} />;
  } else if (currentStep === 1) {
    return (
      <ProductBasicInfo 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 2) {
    return (
      <ProductDetails 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 3) {
    return (
      <ProductImages 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 4) {
    return (
      <ProductOptions 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else {
    return (
      <ProductPublish 
        data={productData}
        updateData={updateProductData}
        onSubmit={() => {
          handleSubmit();
          if (onClose) setTimeout(onClose, 2000);
        }}
      />
    );
  }
};

export default FormStepContent;
