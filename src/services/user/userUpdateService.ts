
import { User } from "@/types";
import { handleServiceError, notifySuccess } from "./utils/errorHandler";
import { mapToUpdateData, mapToInsertData, validateUserData } from "./utils/validation";
import { updateUser as dbUpdateUser, insertUser } from "./utils/databaseOperations";
import { supabaseAdmin } from "../supabaseAdmin";
import { isSupabaseConfigured } from "@/lib/supabase";

/**
 * Updates a user's information
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const updateData = mapToUpdateData(userData);

    if (isSupabaseConfigured) {
      try {
        await dbUpdateUser(userId, updateData);
      } catch (error) {
        handleServiceError(error, "l'aggiornamento dell'utente", "Errore nell'aggiornamento dell'utente");
        return null;
      }
    } else {
      return null;
    }
    
    notifySuccess("Utente aggiornato con successo");
    
    return { 
      ...userData,
      id: userId,
      updatedAt: new Date().toISOString()
    } as User;
  } catch (error) {
    handleServiceError(error, "l'aggiornamento dell'utente", "Si è verificato un errore durante l'aggiornamento dell'utente");
    return null;
  }
};

/**
 * Adds a new user
 */
export const addUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): Promise<User | null> => {
  try {
    // Validate required fields
    const validationError = validateUserData(userData);
    if (validationError) {
      handleServiceError(new Error(validationError), "l'aggiunta dell'utente", validationError);
      return null;
    }
    
    if (!userData.password) {
      handleServiceError(new Error("La password è obbligatoria"), "l'aggiunta dell'utente", "La password è obbligatoria");
      return null;
    }

    // Create user object
    const newUserObj: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      favorites: userData.favorites || [],
      loyaltyPoints: userData.loyaltyPoints || 0,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fiscalCode: userData.fiscalCode,
      vatNumber: userData.vatNumber
    };
    
    if (isSupabaseConfigured) {
      // Prepare data in the format expected by Supabase
      const userInsertData = mapToInsertData(userData);
      
      console.log("Adding user with data:", userInsertData);
      
      // Use admin service to bypass RLS
      const insertedUser = await supabaseAdmin.insert('users', userInsertData);
      
      if (!insertedUser) {
        handleServiceError(new Error("Failed to insert user"), "l'aggiunta dell'utente", "Errore nell'aggiunta dell'utente");
        return null;
      }
      
      // Update the ID with the one from Supabase
      newUserObj.id = insertedUser.id;
    } else {
      return null;
    }
    
    notifySuccess("Utente aggiunto con successo");
    return newUserObj;
  } catch (error) {
    handleServiceError(error, "l'aggiunta dell'utente", "Si è verificato un errore durante l'aggiunta dell'utente");
    return null;
  }
};
