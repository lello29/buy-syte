
import React, { createContext, useContext, useState, useEffect } from "react";
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
  // Store previous step for handling "go back" action
  const [previousStep, setPreviousStep] = useState<number | null>(null);
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
    // Save current step before moving
    setPreviousStep(currentStep);
    
    // Validate the current step before proceeding to the next
    if (validateStep(currentStep, productData)) {
      if (currentStep < STEPS.length - 1) {
        // Directly set the next step
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Show a toast for the error
      toast.error("Controlla i campi obbligatori prima di procedere");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // If we have a previous step stored, use it
      if (previousStep !== null && previousStep < currentStep) {
        setCurrentStep(previousStep);
        setPreviousStep(null); // Reset after use
      } else {
        // Otherwise just go back one step
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleSubmit = async () => {
    // Validate the entire form before submission
    if (!validateCompleteForm(productData)) {
      toast.error("Alcuni campi obbligatori sono mancanti");
      return;
    }
    
    return await submitProduct(productData);
  };

  const handleSkipToManualEntry = () => {
    // Store current step for possible "back" action
    setPreviousStep(currentStep);
    
    // Skip directly to basic info step (step 1)
    setCurrentStep(1);
    
    // Show a toast message
    toast.info("Procedi con l'inserimento manuale del prodotto");
  };

  useEffect(() => {
    // Effect to handle form reset if completely navigating away
    console.log("Current step:", currentStep);
    console.log("Product data:", productData);
    
    return () => {
      // Clean up logic if needed
    };
  }, [currentStep, productData]);

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
