
import React from "react";
import { useProductForm } from "../ProductFormContext";
import BarcodeStep from "./BarcodeStep";
import ProductBasicInfo from "../ProductBasicInfo";
import ProductDetails from "../ProductDetails";
import ProductImages from "../ProductImages";
import ProductOptions from "../ProductOptions";
import ProductPublish from "../ProductPublish";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    handleSubmit,
    getErrorsForStep
  } = useProductForm();

  // Use provided function or the one from context
  const skipToManual = handleSkipToManualEntry || contextSkipToManual;
  
  // Get errors for current step
  const currentStepErrors = getErrorsForStep(currentStep);
  const hasErrors = currentStepErrors.length > 0;

  const renderErrors = () => {
    if (!hasErrors) return null;
    
    return (
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
        <div className="flex items-center text-red-800 mb-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="font-medium">Correggi i seguenti errori:</span>
        </div>
        <ul className="list-disc list-inside text-sm text-red-700 pl-2">
          {currentStepErrors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      </div>
    );
  };

  let content;
  if (currentStep === 0) {
    content = <BarcodeStep isMobile={isMobile} handleSkipToManualEntry={skipToManual} />;
  } else if (currentStep === 1) {
    content = (
      <ProductBasicInfo 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 2) {
    content = (
      <ProductDetails 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 3) {
    content = (
      <ProductImages 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else if (currentStep === 4) {
    content = (
      <ProductOptions 
        data={productData} 
        updateData={updateProductData} 
      />
    );
  } else {
    content = (
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

  return (
    <>
      {hasErrors && renderErrors()}
      {content}
    </>
  );
};

export default FormStepContent;
