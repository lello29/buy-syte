
import React, { createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SupabaseContextType {
  safeDatabaseOperation: <T>(
    operation: () => Promise<T>,
    fallback: T,
    errorMessage?: string
  ) => Promise<T>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

/**
 * Provider per gestire le operazioni Supabase con gestione degli errori di tipo
 */
export const SupabaseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * Esegue un'operazione sul database con gestione degli errori
   * @param operation Funzione che esegue l'operazione sul database
   * @param fallback Valore da restituire in caso di errore
   * @param errorMessage Messaggio di errore personalizzato 
   * @returns Il risultato dell'operazione o il fallback
   */
  const safeDatabaseOperation = async <T,>(
    operation: () => Promise<T>,
    fallback: T,
    errorMessage?: string
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      console.error("Errore durante l'operazione sul database:", error);
      if (errorMessage) {
        toast.error(errorMessage);
      }
      return fallback;
    }
  };

  return (
    <SupabaseContext.Provider value={{ safeDatabaseOperation }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseWrapper = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabaseWrapper deve essere utilizzato all\'interno di un SupabaseWrapper');
  }
  return context;
};
