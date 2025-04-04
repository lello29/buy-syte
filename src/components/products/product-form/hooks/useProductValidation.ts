
import { useState, useCallback } from "react";
import { ProductFormData } from "../ProductFormContext";
import { toast } from "sonner";

interface ValidationError {
  step: number;
  field: string;
  message: string;
}

export const useProductValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateStep = useCallback((stepIndex: number, data: ProductFormData): boolean => {
    const newErrors: ValidationError[] = [];
    
    // Validazione Passo 0 (Barcode)
    if (stepIndex === 0) {
      // Per questo step non facciamo validazione, è opzionale
      return true;
    }
    
    // Validazione Passo 1 (Informazioni di base)
    else if (stepIndex === 1) {
      if (!data.name || data.name.trim() === "") {
        newErrors.push({ step: 1, field: "name", message: "Il nome prodotto è obbligatorio" });
      }
      
      if (data.price === undefined || data.price <= 0) {
        newErrors.push({ step: 1, field: "price", message: "Inserisci un prezzo valido" });
      }
      
      if (!data.category || data.category.trim() === "") {
        newErrors.push({ step: 1, field: "category", message: "La categoria è obbligatoria" });
      }
    }
    
    // Validazione Passo 2 (Dettagli)
    else if (stepIndex === 2) {
      if (data.inventory === undefined || data.inventory < 0) {
        newErrors.push({ step: 2, field: "inventory", message: "La quantità deve essere un numero valido" });
      }
    }
    
    // Validazione Passo 3 (Immagini)
    else if (stepIndex === 3) {
      if (!data.images || data.images.length === 0) {
        newErrors.push({ step: 3, field: "images", message: "Aggiungi almeno un'immagine" });
      }
    }
    
    // Validazione Passo 4 (Opzioni)
    else if (stepIndex === 4) {
      // Opzionale, non facciamo validazione
    }
    
    // Validazione Passo 5 (Pubblicazione)
    else if (stepIndex === 5) {
      // Qui controlliamo solo che ci sia tutto
      if (!data.name || data.name.trim() === "") {
        newErrors.push({ step: 5, field: "name", message: "Nome prodotto mancante" });
      }
      
      if (data.price === undefined || data.price <= 0) {
        newErrors.push({ step: 5, field: "price", message: "Prezzo non valido" });
      }
    }
    
    // Aggiorna gli errori
    setErrors(newErrors);
    return newErrors.length === 0;
  }, []);

  const validateCompleteForm = useCallback((data: ProductFormData): boolean => {
    const requiredFields = [
      { field: "name", message: "Nome prodotto mancante" },
      { field: "price", message: "Prezzo non valido" },
      { field: "category", message: "Categoria mancante" }
    ];
    
    const formErrors: ValidationError[] = [];
    
    // Controlla i campi obbligatori
    requiredFields.forEach(({ field, message }) => {
      if (field === "name" && (!data.name || data.name.trim() === "")) {
        formErrors.push({ step: 1, field, message });
      } else if (field === "price" && (data.price === undefined || data.price <= 0)) {
        formErrors.push({ step: 1, field, message });
      } else if (field === "category" && (!data.category || data.category.trim() === "")) {
        formErrors.push({ step: 1, field, message });
      }
    });
    
    // Controlla le immagini
    if (!data.images || data.images.length === 0) {
      formErrors.push({ step: 3, field: "images", message: "Aggiungi almeno un'immagine" });
    }
    
    setErrors(formErrors);
    return formErrors.length === 0;
  }, []);

  const getErrorsForStep = useCallback((stepIndex: number): ValidationError[] => {
    return errors.filter(error => error.step === stepIndex);
  }, [errors]);

  const getErrorForField = useCallback((field: string): ValidationError | undefined => {
    return errors.find(error => error.field === field);
  }, [errors]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    errors,
    validateStep,
    validateCompleteForm,
    getErrorsForStep,
    getErrorForField,
    clearErrors
  };
};
