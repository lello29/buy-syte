
import { User, UserRole } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { supabaseAdmin } from "../supabaseAdmin";
import { UserInsertData, UserUpdateData } from "./types";

/**
 * Updates a user's information
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const updateData: UserUpdateData = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      fiscal_code: userData.fiscalCode,
      vat_number: userData.vatNumber,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating user:", error.message);
        toast.error("Errore nell'aggiornamento dell'utente");
        return null;
      }
    } else {
      toast.warning("Database non configurato, impossibile aggiornare l'utente");
      return null;
    }
    
    return { 
      ...userData,
      id: userId,
      updatedAt: new Date().toISOString()
    } as User;
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dell'utente");
    return null;
  }
};

/**
 * Adds a new user
 */
export const addUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): Promise<User | null> => {
  try {
    const newUserObj: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role,
      favorites: [],
      loyaltyPoints: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fiscalCode: userData.fiscalCode,
      vatNumber: userData.vatNumber
    };
    
    if (isSupabaseConfigured) {
      // Prepare data in the format expected by Supabase
      const userInsertData: UserInsertData = {
        name: newUserObj.name,
        email: newUserObj.email,
        role: newUserObj.role,
        favorites: newUserObj.favorites,
        loyalty_points: newUserObj.loyaltyPoints,
        is_active: newUserObj.isActive,
        created_at: newUserObj.createdAt,
        updated_at: newUserObj.updatedAt,
        fiscal_code: userData.fiscalCode || null,
        vat_number: userData.vatNumber || null
      };
      
      // Add password if provided
      if (userData.password) {
        userInsertData.password = userData.password;
      }
      
      console.log("Adding user with data:", userInsertData);
      
      // Use admin service to bypass RLS
      const insertedUser = await supabaseAdmin.insert('users', userInsertData);
      
      if (!insertedUser) {
        toast.error("Errore nell'aggiunta dell'utente");
        return null;
      }
      
      // Transform the returned user to our format
      newUserObj.id = insertedUser.id;
    } else {
      toast.warning("Database non configurato, impossibile aggiungere l'utente");
      return null;
    }
    
    toast.success("Utente aggiunto con successo");
    return newUserObj;
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("Si è verificato un errore durante l'aggiunta dell'utente");
    return null;
  }
};
