
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { 
  Barcode, 
  Info, 
  Package, 
  ImagePlus, 
  Settings, 
  ShoppingBag,
  Scan 
} from "lucide-react";
import { Product } from "@/types";
import { useProductValidation } from "./hooks/useProductValidation";

export type ProductFormData = Partial<Product> & {
  variants?: {
    name: string;
    options: { value: string; price?: number; stock?: number }[];
  }[];
  sellingOptions?: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  seo?: {
    keywords: string[];
    optimizedTitle: string;
  };
  images: (string | File)[];
  isSharedProduct?: boolean; // Flag to indicate if this is a product from the shared database
  barcode?: string; // Add the barcode property to fix the first error
}

export const STEPS = [
  { id: "barcode", label: "Codice", icon: Barcode, subtitle: "Inizia con un codice" },
  { id: "basic-info", label: "Info base", icon: Info, subtitle: "Titolo e prezzo" },
  { id: "details", label: "Dettagli", icon: Package, subtitle: "Specifiche prodotto" },
  { id: "images", label: "Immagini", icon: ImagePlus, subtitle: "Foto e media" },
  { id: "options", label: "Opzioni", icon: Settings, subtitle: "Varianti e vendita" },
  { id: "publish", label: "Pubblica", icon: ShoppingBag, subtitle: "Finalizza e pubblica" }
];

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
  const [isLoading, setIsLoading] = useState(false);
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
    
    const isNewBarcode = productData.barcode && !productData.isSharedProduct;
    
    setIsLoading(true);
    toast.loading("Salvataggio in corso...");
    
    try {
      // Simula una richiesta API asincrona
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generazione ID per il nuovo prodotto
      const newProductId = `prod_${Math.random().toString(36).substring(2, 10)}`;
      
      // Qui dovresti inviare i dati a un'API
      const submittedProduct = {
        ...productData,
        id: newProductId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log("Prodotto salvato:", submittedProduct);
      
      toast.dismiss();
      toast.success("Prodotto salvato con successo!");
      
      if (isNewBarcode) {
        toast.info("Il codice di questo prodotto è stato aggiunto all'archivio riservato e sarà verificato dall'amministratore");
      }
      
      // Reset del form
      clearErrors();
      
      return true;
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      toast.dismiss();
      toast.error("Si è verificato un errore durante il salvataggio");
      return false;
    } finally {
      setIsLoading(false);
    }
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
