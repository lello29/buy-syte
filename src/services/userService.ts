
import { User } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { users as mockUsers } from "@/data/users";
import { toast } from "sonner";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching users:", error.message);
        toast.error("Errore nel caricamento degli utenti");
        return mockUsers;
      }
      
      if (data && data.length > 0) {
        return data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          favorites: user.favorites || [],
          loyaltyPoints: user.loyalty_points || 0,
          isActive: user.is_active,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          fiscalCode: user.fiscal_code,
          vatNumber: user.vat_number
        }));
      }
    }
    
    console.log("No users found or Supabase not configured, using mock data");
    return mockUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Si è verificato un errore durante il caricamento degli utenti");
    return mockUsers;
  }
};

export const toggleUserStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .update({ 
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating user status:", error.message);
        toast.error("Errore nell'aggiornamento dello stato dell'utente");
        return false;
      }
    }
    
    toast.success(`Stato dell'utente aggiornato con successo`);
    return true;
  } catch (error) {
    console.error("Error toggling user status:", error);
    toast.error("Si è verificato un errore durante l'aggiornamento dello stato dell'utente");
    return false;
  }
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
        
      if (error) {
        console.error("Error deleting user:", error.message);
        toast.error("Errore nell'eliminazione dell'utente");
        return false;
      }
    }
    
    toast.success(`Utente eliminato con successo`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Si è verificato un errore durante l'eliminazione dell'utente");
    return false;
  }
};

export const addUser = async (userData: { name: string; email: string }): Promise<User | null> => {
  try {
    const newUserObj: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: "user",
      favorites: [],
      loyaltyPoints: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('users')
        .insert({
          name: newUserObj.name,
          email: newUserObj.email,
          role: newUserObj.role,
          favorites: newUserObj.favorites,
          loyalty_points: newUserObj.loyaltyPoints,
          is_active: newUserObj.isActive,
          created_at: newUserObj.createdAt,
          updated_at: newUserObj.updatedAt
        })
        .select();
        
      if (error) {
        console.error("Error adding user:", error.message);
        toast.error("Errore nell'aggiunta dell'utente");
        return null;
      }
      
      if (data && data.length > 0) {
        newUserObj.id = data[0].id;
      }
    }
    
    toast.success("Utente aggiunto con successo");
    return newUserObj;
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("Si è verificato un errore durante l'aggiunta dell'utente");
    return null;
  }
};
