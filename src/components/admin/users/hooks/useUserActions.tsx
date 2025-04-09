
import { useCallback } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";
import { 
  deleteUser, 
  toggleUserStatus, 
  updateUser, 
  addUser, 
  deleteAllUsers 
} from "@/services/user";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const useUserActions = (users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
  const handleToggleUserStatus = useCallback(async (userId: string, currentStatus: boolean) => {
    try {
      const success = await toggleUserStatus(userId, !currentStatus);
      
      if (success) {
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Errore durante la modifica dello stato dell'utente");
    }
  }, [setUsers]);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      const success = await deleteUser(userId);
      
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        toast.success("Utente eliminato con successo");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Errore durante l'eliminazione dell'utente");
      return false;
    }
  }, [setUsers]);

  const handleDeleteAllUsers = useCallback(async () => {
    try {
      if (isSupabaseConfigured) {
        const success = await deleteAllUsers();
        
        if (success) {
          const adminUsers = users.filter(user => user.role === "admin");
          setUsers(adminUsers);
          toast.success("Tutti gli utenti non amministratori sono stati eliminati con successo");
          return true;
        }
      } else {
        const adminUsers = users.filter(user => user.role === "admin");
        const nonAdminUsers = users.filter(user => user.role !== "admin");
        
        if (nonAdminUsers.length === 0) {
          toast.info("Non ci sono utenti non amministratori da eliminare");
          return false;
        }
        
        for (const user of nonAdminUsers) {
          await deleteUser(user.id);
        }
        
        setUsers(adminUsers);
        toast.success("Tutti gli utenti non amministratori sono stati eliminati con successo");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting all users:", error);
      toast.error("Errore durante l'eliminazione degli utenti");
      return false;
    }
  }, [users, setUsers]);

  const handleUserUpdate = useCallback(async (userId: string, userData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      
      if (updatedUser) {
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, ...updatedUser } : user
          )
        );
        toast.success("Utente aggiornato con successo");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Errore durante l'aggiornamento dell'utente");
      return false;
    }
  }, [setUsers]);

  const handleAddUser = useCallback(async (userData: { 
    name: string; 
    email: string; 
    role?: string; 
    password?: string 
  }) => {
    try {
      console.log("Adding user with data:", userData);
      
      if (!userData.password) {
        toast.error("La password è obbligatoria");
        return false;
      }
      
      const newUserData = {
        name: userData.name,
        email: userData.email,
        role: (userData.role as UserRole) || 'user' as UserRole,
        isActive: true,
        favorites: [],
        loyaltyPoints: 0,
        password: userData.password
      };
      
      const newUser = await addUser(newUserData);
      
      if (newUser) {
        setUsers(prev => [...prev, newUser]);
        toast.success("Utente aggiunto con successo");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Errore durante l'aggiunta dell'utente");
      return false;
    }
  }, [setUsers]);

  return {
    handleToggleUserStatus,
    handleDeleteUser,
    handleDeleteAllUsers,
    handleUserUpdate,
    handleAddUser
  };
};
