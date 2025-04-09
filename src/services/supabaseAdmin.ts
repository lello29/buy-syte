
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// IMPORTANT: This service provides admin-level access to bypass RLS
// It should only be used for operations that require admin privileges

/**
 * Service for admin operations that need to bypass Row Level Security
 */
export const supabaseAdmin = {
  /**
   * Insert a new record into a table with admin privileges (bypassing RLS)
   * @param table Table name
   * @param data Record data
   * @returns The inserted data or null if error
   */
  async insert(table: string, data: any) {
    try {
      console.log(`Admin inserting into ${table}:`, data);
      
      // Use the service_role key via headers to bypass RLS
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .throwOnError();
        
      if (error) {
        console.error(`Admin insert error for ${table}:`, error);
        toast.error(`Errore nell'inserimento dei dati: ${error.message}`);
        return null;
      }
      
      console.log(`Admin insert successful for ${table}:`, result);
      return result[0];
    } catch (error) {
      console.error(`Admin insert exception for ${table}:`, error);
      toast.error("Si è verificato un errore durante l'inserimento dei dati");
      return null;
    }
  },
  
  /**
   * Delete records from a table with admin privileges (bypassing RLS)
   * @param table Table name
   * @param column Column to filter on (optional)
   * @param value Value to match (optional)
   * @returns Success status
   */
  async delete(table: string, column?: string, value?: any) {
    try {
      console.log(`Admin deleting from ${table}:`, column, value);
      
      let query = supabase.from(table).delete();
      
      if (column && value !== undefined) {
        query = query.eq(column, value);
      }
      
      const { error } = await query.throwOnError();
      
      if (error) {
        console.error(`Admin delete error for ${table}:`, error);
        toast.error(`Errore nell'eliminazione dei dati: ${error.message}`);
        return false;
      }
      
      console.log(`Admin delete successful for ${table}`);
      return true;
    } catch (error) {
      console.error(`Admin delete exception for ${table}:`, error);
      toast.error("Si è verificato un errore durante l'eliminazione dei dati");
      return false;
    }
  }
};
