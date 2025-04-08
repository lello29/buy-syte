
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

/**
 * Adapter per operazioni del database che gestisce gli errori di tipo
 * e fornisce fallback per dati mock
 */
export class DatabaseAdapter {
  /**
   * Esegue una query select con gestione degli errori
   * @param table Nome della tabella
   * @param mockData Dati mock da restituire in caso di errore
   * @param columns Colonne da selezionare (default: *)
   */
  static async select<T>(table: string, mockData: T[], columns = '*'): Promise<T[]> {
    try {
      // @ts-ignore - Ignoriamo l'errore TypeScript relativo al tipo 'never'
      const { data, error } = await supabase
        .from(table)
        .select(columns);
        
      if (error) {
        console.error(`Errore nel recupero dati da ${table}:`, error);
        return mockData;
      }
      
      return (data as T[]) || mockData;
    } catch (error) {
      console.error(`Eccezione durante il recupero dati da ${table}:`, error);
      return mockData;
    }
  }
  
  /**
   * Inserisce un record con gestione degli errori
   * @param table Nome della tabella
   * @param record Record da inserire
   */
  static async insert<T>(table: string, record: any): Promise<T | null> {
    try {
      // @ts-ignore - Ignoriamo l'errore TypeScript relativo al tipo 'never'
      const { data, error } = await supabase
        .from(table)
        .insert(record)
        .select()
        .single();
        
      if (error) {
        console.error(`Errore nell'inserimento in ${table}:`, error);
        toast.error(`Errore durante l'inserimento in ${table}`);
        return null;
      }
      
      return data as T;
    } catch (error) {
      console.error(`Eccezione durante l'inserimento in ${table}:`, error);
      toast.error(`Si è verificato un errore durante l'inserimento`);
      return null;
    }
  }
  
  /**
   * Aggiorna un record con gestione degli errori
   * @param table Nome della tabella
   * @param record Dati da aggiornare
   * @param column Colonna per la condizione where
   * @param value Valore per la condizione where
   */
  static async update<T>(table: string, record: any, column: string, value: any): Promise<boolean> {
    try {
      // @ts-ignore - Ignoriamo l'errore TypeScript relativo al tipo 'never'
      const { error } = await supabase
        .from(table)
        .update(record)
        .eq(column, value);
        
      if (error) {
        console.error(`Errore nell'aggiornamento di ${table}:`, error);
        toast.error(`Errore durante l'aggiornamento`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Eccezione durante l'aggiornamento di ${table}:`, error);
      toast.error(`Si è verificato un errore durante l'aggiornamento`);
      return false;
    }
  }
  
  /**
   * Elimina un record con gestione degli errori
   * @param table Nome della tabella
   * @param column Colonna per la condizione where
   * @param value Valore per la condizione where
   */
  static async delete(table: string, column: string, value: any): Promise<boolean> {
    try {
      // @ts-ignore - Ignoriamo l'errore TypeScript relativo al tipo 'never'
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(column, value);
        
      if (error) {
        console.error(`Errore nell'eliminazione da ${table}:`, error);
        toast.error(`Errore durante l'eliminazione`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Eccezione durante l'eliminazione da ${table}:`, error);
      toast.error(`Si è verificato un errore durante l'eliminazione`);
      return false;
    }
  }
  
  /**
   * Esegue una query count con gestione degli errori
   * @param table Nome della tabella
   */
  static async count(table: string): Promise<number> {
    try {
      // @ts-ignore - Ignoriamo l'errore TypeScript relativo al tipo 'never'
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
        
      if (error) {
        console.error(`Errore nel conteggio di ${table}:`, error);
        return 0;
      }
      
      return count || 0;
    } catch (error) {
      console.error(`Eccezione durante il conteggio di ${table}:`, error);
      return 0;
    }
  }
}
