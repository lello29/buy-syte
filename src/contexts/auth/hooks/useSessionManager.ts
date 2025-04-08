
import { Dispatch, SetStateAction } from "react";
import { User, UserRole } from "../../../types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { users as mockUsers } from "@/data/mockData";

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
          try {
            // Fetch user profile from our users table
            const { data: userData, error } = await supabase.auth.getUser();
              
            if (userData?.user && !error) {
              // For demo, use mock data when the real data isn't available
              const userEmail = userData.user.email || '';
              const mockUser = mockUsers.find(user => user.email === userEmail);
              
              if (mockUser) {
                // Make sure we use valid UserRole type
                const userRole = (mockUser.role as UserRole) || 'user';
                
                const userProfile: User = {
                  id: userData.user.id,
                  name: mockUser.name,
                  email: userEmail,
                  role: userRole,
                  favorites: mockUser.favorites || [],
                  loyaltyPoints: mockUser.loyaltyPoints || 0,
                  isActive: true,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  fiscalCode: mockUser.fiscalCode,
                  vatNumber: mockUser.vatNumber
                };
                
                setCurrentUser(userProfile);
                localStorage.setItem("currentUser", JSON.stringify(userProfile));
              }
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
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
