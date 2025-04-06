
import React, { useState } from "react";
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
import BarcodeScanner from "@/components/products/barcode/BarcodeScanner";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormStepContentProps {
  onClose?: () => void;
  isMobile?: boolean;
  handleSkipToManualEntry?: () => void;
}

const FormStepContent: React.FC<FormStepContentProps> = ({ 
  onClose, 
  isMobile: propIsMobile,
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
  
  const [showScanner, setShowScanner] = useState(false);
  const detectedIsMobile = useIsMobile();
  
  // Use provided prop or detected mobile state
  const isMobile = propIsMobile !== undefined ? propIsMobile : detectedIsMobile;

  // Use provided function or the one from context
  const skipToManual = handleSkipToManualEntry || contextSkipToManual;
  
  // Fix for white page - ensure step is valid
  const validStep = currentStep >= 0 && currentStep < steps.length ? currentStep : 0;
  
  // Get errors for current step
  const currentStepErrors = getErrorsForStep(validStep);
  const hasErrors = currentStepErrors.length > 0;

  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleBarcodeDetected = (barcode: string) => {
    updateProductData({ barcode });
    setShowScanner(false);
    toast.success(`Codice ${barcode} rilevato con successo`);
  };

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

  // Create content based on step
  const renderStepContent = () => {
    switch (validStep) {
      case 0:
        return <BarcodeStep 
          isMobile={isMobile} 
          handleSkipToManualEntry={skipToManual} 
        />;
      case 1:
        return <ProductBasicInfo 
          data={productData} 
          updateData={updateProductData}
          onScanBarcode={handleScanBarcode} 
          isMobile={isMobile}
        />;
      case 2:
        return <ProductDetails 
          data={productData} 
          updateData={updateProductData} 
          isMobile={isMobile}
        />;
      case 3:
        return <ProductImages 
          data={productData} 
          updateData={updateProductData} 
          isMobile={isMobile}
        />;
      case 4:
        return <ProductOptions 
          data={productData} 
          updateData={updateProductData} 
          isMobile={isMobile}
        />;
      case 5:
        return (
          <ProductPublish 
            data={productData}
            updateData={updateProductData}
            onSubmit={() => {
              handleSubmit();
              if (onClose) setTimeout(onClose, 2000);
            }}
            isMobile={isMobile}
          />
        );
      default:
        // Fallback to first step in case of invalid step
        return <BarcodeStep 
          isMobile={isMobile} 
          handleSkipToManualEntry={skipToManual} 
        />;
    }
  };

  return (
    <>
      {hasErrors && renderErrors()}
      {/* Mostra lo stato dell'AI solo nei passaggi rilevanti (non nella scansione barcode) */}
      {validStep > 0 && validStep < 5 && <AIStatusCheck />}
      {renderStepContent()}
      
      {/* Barcode Scanner Component */}
      {showScanner && (
        <BarcodeScanner 
          onDetected={handleBarcodeDetected} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </>
  );
};

export default FormStepContent;
