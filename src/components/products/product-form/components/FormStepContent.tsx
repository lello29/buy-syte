
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
import AIStatusCheck from "./AIStatusCheck";

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
      <Alert variant="destructive" className="mb-3">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          <span className="font-medium block mb-1">Correggi i seguenti errori:</span>
          <ul className="list-disc list-inside text-sm pl-1">
            {currentStepErrors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
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
      {/* Mostra lo stato dell'AI solo nei passaggi rilevanti (non nella scansione barcode) */}
      {currentStep > 0 && currentStep < 5 && <AIStatusCheck />}
      {content}
    </>
  );
};

export default FormStepContent;
