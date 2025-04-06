
import { useState } from "react";
import { toast } from "sonner";
import { ProductFormData } from "../types/productTypes";

export const useProductSubmit = (clearErrors: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (productData: ProductFormData): Promise<boolean> => {
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

  return {
    isLoading,
    handleSubmit
  };
};
