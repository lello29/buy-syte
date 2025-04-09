
import { useState, useEffect, useCallback } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";
import { fetchUsers, deleteUser, toggleUserStatus, updateUser, addUser, deleteAllUsers } from "@/services/userService";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const userData = await fetchUsers();
        if (userData) {
          setUsers(userData);
        }
      } catch (error) {
        console.error("Error loading users:", error);
        toast.error("Errore nel caricamento degli utenti");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      setIsDeleting(true);
      const success = await deleteUser(userId);
      
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== userId));
        setIsDeleteDialogOpen(false);
        toast.success("Utente eliminato con successo");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Errore durante l'eliminazione dell'utente");
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const handleDeleteAllUsers = useCallback(async () => {
    try {
      setIsDeleting(true);
      
      if (isSupabaseConfigured) {
        const success = await deleteAllUsers();
        
        if (success) {
          const adminUsers = users.filter(user => user.role === "admin");
          setUsers(adminUsers);
          toast.success("Tutti gli utenti non amministratori sono stati eliminati con successo");
        }
      } else {
        const adminUsers = users.filter(user => user.role === "admin");
        const nonAdminUsers = users.filter(user => user.role !== "admin");
        
        if (nonAdminUsers.length === 0) {
          toast.info("Non ci sono utenti non amministratori da eliminare");
          setIsDeleting(false);
          return;
        }
        
        for (const user of nonAdminUsers) {
          await deleteUser(user.id);
        }
        
        setUsers(adminUsers);
        toast.success("Tutti gli utenti non amministratori sono stati eliminati con successo");
      }
    } catch (error) {
      console.error("Error deleting all users:", error);
      toast.error("Errore durante l'eliminazione degli utenti");
    } finally {
      setIsDeleting(false);
    }
  }, [users]);

  const handleUserUpdate = useCallback(async (userId: string, userData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      
      if (updatedUser) {
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, ...updatedUser } : user
          )
        );
        setIsEditDialogOpen(false);
        toast.success("Utente aggiornato con successo");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Errore durante l'aggiornamento dell'utente");
    }
  }, []);

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
        return;
      }
      
      const newUserData = {
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole || 'user' as UserRole,
        isActive: true,
        favorites: [],
        loyaltyPoints: 0,
        password: userData.password
      };
      
      const newUser = await addUser(newUserData);
      
      if (newUser) {
        setUsers(prev => [...prev, newUser]);
        setIsAddDialogOpen(false);
        toast.success("Utente aggiunto con successo");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Errore durante l'aggiunta dell'utente");
    }
  }, []);

  const openViewDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  }, []);

  const openAddDialog = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  return {
    users,
    loading,
    selectedUser,
    isViewDialogOpen,
    isDeleteDialogOpen,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleting,
    setIsViewDialogOpen,
    setIsDeleteDialogOpen,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    handleToggleUserStatus,
    handleDeleteUser,
    handleDeleteAllUsers,
    handleUserUpdate,
    handleAddUser,
    openAddDialog,
    openEditDialog,
    openViewDialog,
    openDeleteDialog,
  };
};
