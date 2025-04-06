
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { ProductFormData } from "./types/productTypes";
import { STEPS } from "./config/formSteps";
import { useProductValidation } from "./hooks/useProductValidation";
import { useProductSubmit } from "./hooks/useProductSubmit";

interface ProductFormContextType {
  productData: ProductFormData;
  updateProductData: (data: Partial<ProductFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: typeof STEPS;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSubmit: () => void;
  handleSkipToManualEntry: () => void;
  showHelp: boolean;
  setShowHelp: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  getErrorForField: (field: string) => { message: string } | undefined;
  getErrorsForStep: (step: number) => { field: string; message: string }[];
}

const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined);

export const ProductFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
    images: [],
    variants: [],
    sellingOptions: {
      isOnlinePurchase: true,
      isReservationOnly: false,
      isInStoreOnly: false
    },
    isActive: true,
    isSharedProduct: false
  });
  
  const { 
    validateStep, 
    validateCompleteForm, 
    getErrorForField, 
    getErrorsForStep,
    clearErrors
  } = useProductValidation();

  const { isLoading, handleSubmit: submitProduct } = useProductSubmit(clearErrors);

  const updateProductData = (data: Partial<ProductFormData>) => {
    setProductData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Valida il passo corrente prima di passare al successivo
    if (validateStep(currentStep, productData)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Mostra un toast per l'errore
      toast.error("Controlla i campi obbligatori prima di procedere");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Valida tutto il form prima dell'invio
    if (!validateCompleteForm(productData)) {
      toast.error("Alcuni campi obbligatori sono mancanti");
      return;
    }
    
    return await submitProduct(productData);
  };

  const handleSkipToManualEntry = () => {
    setCurrentStep(1); // Skip to basic info step
    toast.info("Procedi con l'inserimento manuale del prodotto");
  };

  return (
    <ProductFormContext.Provider value={{
      productData,
      updateProductData,
      currentStep,
      setCurrentStep,
      steps: STEPS,
      handleNext,
      handlePrevious,
      handleSubmit,
      handleSkipToManualEntry,
      showHelp,
      setShowHelp,
      isLoading,
      getErrorForField: (field) => {
        const error = getErrorForField(field);
        return error ? { message: error.message } : undefined;
      },
      getErrorsForStep: (step) => {
        return getErrorsForStep(step).map(({ field, message }) => ({ field, message }));
      }
    }}>
      {children}
    </ProductFormContext.Provider>
  );
};

export const useProductForm = () => {
  const context = useContext(ProductFormContext);
  if (context === undefined) {
    throw new Error('useProductForm must be used within a ProductFormProvider');
  }
  return context;
};

export { STEPS };
export type { ProductFormData };
