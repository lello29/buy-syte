
import { Dispatch, SetStateAction } from "react";
import { User } from "../../../types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const useSessionManager = (
  setCurrentUser: Dispatch<SetStateAction<User | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const checkSession = async () => {
    try {
      setIsLoading(true);
      
      // First check localStorage for compatibility with demo mode
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      }
      
      // Only try to check Supabase session if properly configured
      if (isSupabaseConfigured) {
        // Then check Supabase session
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          // Fetch user profile from our users table
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();
              
          if (userData && !error) {
            // Transform from snake_case to camelCase
            const userProfile: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              favorites: userData.favorites || [],
              loyaltyPoints: userData.loyalty_points || 0,
              isActive: userData.is_active,
              createdAt: userData.created_at,
              updatedAt: userData.updated_at,
              fiscalCode: userData.fiscal_code,
              vatNumber: userData.vat_number
            };
              
            setCurrentUser(userProfile);
            localStorage.setItem("currentUser", JSON.stringify(userProfile));
          }
        }
      }
    } catch (error) {
      console.error("Session check error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const setupAuthListener = () => {
    // Set up auth state change listener only if Supabase is configured
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    
    if (isSupabaseConfigured) {
      try {
        const { data } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_OUT') {
              setCurrentUser(null);
              localStorage.removeItem("currentUser");
            }
          }
        );
        
        authListener = data;
      } catch (error) {
        console.error("Could not set up auth listener:", error);
      }
    }
    
    return authListener;
  };
  
  const cleanupAuthListener = (authListener: any) => {
    if (authListener?.subscription) {
      authListener.subscription.unsubscribe();
    }
  };
  
  return { checkSession, setupAuthListener, cleanupAuthListener };
};
