
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
    getErrorsForStep,
    steps
  } = useProductForm();

  // Use provided function or the one from context
  const skipToManual = handleSkipToManualEntry || contextSkipToManual;
  
  // Fix for white page - ensure step is valid
  const validStep = currentStep >= 0 && currentStep < steps.length ? currentStep : 0;
  
  // Get errors for current step
  const currentStepErrors = getErrorsForStep(validStep);
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
  switch (validStep) {
    case 0:
      content = <BarcodeStep isMobile={isMobile} handleSkipToManualEntry={skipToManual} />;
      break;
    case 1:
      content = (
        <ProductBasicInfo 
          data={productData} 
          updateData={updateProductData} 
        />
      );
      break;
    case 2:
      content = (
        <ProductDetails 
          data={productData} 
          updateData={updateProductData} 
        />
      );
      break;
    case 3:
      content = (
        <ProductImages 
          data={productData} 
          updateData={updateProductData} 
        />
      );
      break;
    case 4:
      content = (
        <ProductOptions 
          data={productData} 
          updateData={updateProductData} 
        />
      );
      break;
    case 5:
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
      break;
    default:
      // Fallback to first step in case of invalid step
      content = <BarcodeStep isMobile={isMobile} handleSkipToManualEntry={skipToManual} />;
  }

  return (
    <>
      {hasErrors && renderErrors()}
      {/* Mostra lo stato dell'AI solo nei passaggi rilevanti (non nella scansione barcode) */}
      {validStep > 0 && validStep < 5 && <AIStatusCheck />}
      {content}
    </>
  );
};

export default FormStepContent;
