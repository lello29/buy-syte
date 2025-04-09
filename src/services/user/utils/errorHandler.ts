
import { toast } from "sonner";

/**
 * Standardized error handling for user services
 */
export const handleServiceError = (
  error: unknown, 
  operation: string, 
  customMessage?: string
): void => {
  console.error(`Error ${operation}:`, error);
  toast.error(customMessage || `Si è verificato un errore durante ${operation}`);
};

/**
 * Success notification for user service operations
 */
export const notifySuccess = (message: string): void => {
  toast.success(message);
};

/**
 * Warning notification for user service operations
 */
export const notifyWarning = (message: string): void => {
  toast.warning(message);
};
