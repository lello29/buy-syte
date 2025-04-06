
import { useState } from "react";
import { toast } from "sonner";
import { ProductFormData, ValidationError } from "../types/productTypes";
import { STEPS } from "../config/formSteps";

export const useProductValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // Clear all errors or errors for a specific field
  const clearErrors = (field?: string) => {
    if (field) {
      setErrors(prev => prev.filter(error => error.field !== field));
    } else {
      setErrors([]);
    }
  };

  // Add or update an error
  const addError = (stepIndex: number, field: string, message: string) => {
    setErrors(prev => {
      // Remove any existing error for this field
      const filtered = prev.filter(error => error.field !== field);
      // Add the new error
      return [...filtered, { step: stepIndex, field, message }];
    });
  };

  // Get all errors for a specific step
  const getErrorsForStep = (stepIndex: number) => {
    return errors.filter(error => error.step === stepIndex);
  };

  // Get error for a specific field
  const getErrorForField = (field: string) => {
    return errors.find(error => error.field === field);
  };

  // Validate data for a specific step
  const validateStep = (stepIndex: number, data: ProductFormData) => {
    clearErrors();
    let isValid = true;

    switch (stepIndex) {
      case 1: // Basic info
        if (!data.name || data.name.trim() === "") {
          addError(stepIndex, "name", "Il nome del prodotto è obbligatorio");
          isValid = false;
        }
        
        if (!data.barcode || data.barcode.trim() === "") {
          addError(stepIndex, "barcode", "Il codice a barre è obbligatorio");
          isValid = false;
        }

        if (!data.price || data.price <= 0) {
          addError(stepIndex, "price", "Il prezzo deve essere maggiore di zero");
          isValid = false;
        }

        if (!data.category || data.category.trim() === "") {
          addError(stepIndex, "category", "La categoria è obbligatoria");
          isValid = false;
        }
        break;

      case 2: // Details
        // Optional validation for product details
        break;

      case 3: // Images
        if (!data.images || data.images.length === 0) {
          addError(stepIndex, "images", "Almeno un'immagine è obbligatoria");
          isValid = false;
        }
        break;

      case 4: // Options
        // Validate selling options are set
        if (!data.sellingOptions) {
          addError(stepIndex, "sellingOptions", "Le opzioni di vendita sono obbligatorie");
          isValid = false;
        }
        break;

      case 5: // Publish
        // Final validation before publishing
        break;

      default:
        break;
    }

    return isValid;
  };

  // Validate the complete form before submission
  const validateCompleteForm = (data: ProductFormData) => {
    clearErrors();
    let isValid = true;

    // Required fields across all steps
    if (!data.name || data.name.trim() === "") {
      addError(1, "name", "Il nome del prodotto è obbligatorio");
      isValid = false;
    }
    
    if (!data.barcode || data.barcode.trim() === "") {
      addError(1, "barcode", "Il codice a barre è obbligatorio");
      isValid = false;
    }

    if (!data.price || data.price <= 0) {
      addError(1, "price", "Il prezzo deve essere maggiore di zero");
      isValid = false;
    }

    if (!data.category || data.category.trim() === "") {
      addError(1, "category", "La categoria è obbligatoria");
      isValid = false;
    }

    if (!data.images || data.images.length === 0) {
      addError(3, "images", "Almeno un'immagine è obbligatoria");
      isValid = false;
    }

    // If there are errors, show a toast with the first error
    if (!isValid) {
      const firstError = errors[0];
      const stepName = STEPS[firstError.step].label;
      toast.error(`Errore in "${stepName}": ${firstError.message}`);
    }

    return isValid;
  };

  return {
    errors,
    clearErrors,
    addError,
    getErrorsForStep,
    getErrorForField,
    validateStep,
    validateCompleteForm
  };
};
