
import { User } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { users as mockUsers } from "@/data/users";
import { toast } from "sonner";

/**
 * Fetches users from the database
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching users:", error.message);
          toast.error("Errore nel caricamento degli utenti");
          return [];
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
        } else {
          toast.warning("Nessun utente trovato nel database.");
          return [];
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
        toast.error("Errore di connessione al database");
        return [];
      }
    }
    
    toast.warning("Database non configurato correttamente");
    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Si è verificato un errore durante il caricamento degli utenti");
    return [];
  }
};
