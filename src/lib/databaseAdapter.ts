import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Adapter for database operations, supporting both mock data and Supabase
 */
export class DatabaseAdapter {
  /**
   * Count records in a table
   * @param tableName The name of the table
   * @returns Count of records
   */
  static async count(tableName: string): Promise<number> {
    try {
      if (!isSupabaseConfigured) {
        console.log(`Supabase not configured, returning mock count for ${tableName}`);
        return 0;
      }

      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error(`Error counting ${tableName}:`, error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error(`Error in count operation for ${tableName}:`, error);
      return 0;
    }
  }

  /**
   * Select records from a table
   * @param tableName The name of the table 
   * @param fallbackData Fallback data if table doesn't exist
   * @returns Array of records or fallback data
   */
  static async select<T>(tableName: string, fallbackData: T[] = []): Promise<T[]> {
    try {
      if (!isSupabaseConfigured) {
        console.log(`Supabase not configured, returning fallback data for ${tableName}`);
        return fallbackData;
      }

      const { data, error } = await supabase
        .from(tableName)
        .select('*');

      if (error) {
        console.error(`Error selecting from ${tableName}:`, error);
        return fallbackData;
      }

      return (data as T[]) || fallbackData;
    } catch (error) {
      console.error(`Error in select operation for ${tableName}:`, error);
      return fallbackData;
    }
  }

  /**
   * Update a record in a table
   * @param tableName The name of the table
   * @param data The data to update
   * @param whereColumn The column to use in the where clause
   * @param whereValue The value to match in the where clause
   * @returns Success status
   */
  static async update(
    tableName: string,
    data: Record<string, any>,
    whereColumn: string,
    whereValue: string | number
  ): Promise<boolean> {
    try {
      if (!isSupabaseConfigured) {
        console.log(`Supabase not configured, cannot update ${tableName}`);
        toast.warning("Database non configurato, impossibile aggiornare i dati");
        return false;
      }

      const { error } = await supabase
        .from(tableName)
        .update(data)
        .eq(whereColumn, whereValue);

      if (error) {
        console.error(`Error updating ${tableName}:`, error);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error in update operation for ${tableName}:`, error);
      return false;
    }
  }

  /**
   * Delete all records from a table except those matching a condition
   * @param tableName The name of the table
   * @param excludeColumn Column to use for exclusion
   * @param excludeValue Value to exclude
   * @returns Success status
   */
  static async deleteAll(
    tableName: string, 
    excludeColumn?: string, 
    excludeValue?: string | string[]
  ): Promise<boolean> {
    try {
      if (!isSupabaseConfigured) {
        console.log(`Supabase not configured, cannot delete from ${tableName}`);
        toast.warning("Database non configurato, impossibile eliminare i dati");
        return false;
      }

      let query = supabase.from(tableName).delete();
      
      // Apply exclusion if specified
      if (excludeColumn && excludeValue) {
        if (Array.isArray(excludeValue)) {
          // Exclude multiple values
          query = query.not(excludeColumn, 'in', `(${excludeValue.map(v => `'${v}'`).join(',')})`);
        } else {
          // Exclude a single value
          query = query.not(excludeColumn, 'eq', excludeValue);
        }
      }

      const { error } = await query;

      if (error) {
        console.error(`Error deleting from ${tableName}:`, error);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error in deleteAll operation for ${tableName}:`, error);
      return false;
    }
  }
}
