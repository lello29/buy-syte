
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { notifyWarning } from "./errorHandler";
import { UserInsertData, UserUpdateData } from "../types";

/**
 * Checks if database is properly configured
 */
export const ensureDatabaseConfigured = (): boolean => {
  if (!isSupabaseConfigured) {
    notifyWarning("Database non configurato correttamente");
    return false;
  }
  return true;
};

/**
 * Inserts a new user into the database
 */
export const insertUser = async (data: UserInsertData) => {
  if (!ensureDatabaseConfigured()) return null;
  
  const { data: insertedData, error } = await supabase
    .from('users')
    .insert(data)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Database error during insert: ${error.message}`);
  }
  
  return insertedData;
};

/**
 * Updates an existing user in the database
 */
export const updateUser = async (userId: string, data: UserUpdateData) => {
  if (!ensureDatabaseConfigured()) return null;
  
  const { data: updatedData, error } = await supabase
    .from('users')
    .update(data)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Database error during update: ${error.message}`);
  }
  
  return updatedData;
};

/**
 * Deletes a user from the database
 */
export const deleteUserById = async (userId: string) => {
  if (!ensureDatabaseConfigured()) return false;
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);
    
  if (error) {
    throw new Error(`Database error during delete: ${error.message}`);
  }
  
  return true;
};
