
import { useState, useEffect } from "react";
import { User } from "@/types";
import { fetchUsers, toggleUserStatus, deleteUser, addUser } from "@/services/userService";
import { toast } from "sonner";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load users on component mount
  const loadUsers = async () => {
    setLoading(true);
    const loadedUsers = await fetchUsers();
    setUsers(loadedUsers);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // User action handlers
  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    const success = await toggleUserStatus(userId, isActive);
    if (success) {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, isActive: isActive } : user
      );
      setUsers(updatedUsers);
      toast.success(`Stato dell'utente aggiornato con successo`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const success = await deleteUser(userId);
    if (success) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      toast.success("Utente eliminato con successo");
    }
  };

  const handleUserUpdate = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    toast.success("Utente aggiornato con successo");
  };

  const handleAddUser = async (userData: { name: string; email: string }) => {
    if (!userData.name || !userData.email) {
      toast.error("Nome e email sono richiesti");
      return;
    }

    const newUser = await addUser(userData);
    if (newUser) {
      setUsers(prev => [newUser, ...prev]);
      setIsAddDialogOpen(false);
      toast.success("Utente aggiunto con successo");
    }
  };

  // Dialog control functions
  const openAddDialog = () => setIsAddDialogOpen(true);
  
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };
  
  const openViewDialog = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };
  
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return {
    users,
    loading,
    selectedUser,
    isViewDialogOpen,
    isDeleteDialogOpen,
    isAddDialogOpen,
    isEditDialogOpen,
    setIsViewDialogOpen,
    setIsDeleteDialogOpen,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    handleToggleUserStatus,
    handleDeleteUser,
    handleUserUpdate,
    handleAddUser,
    openAddDialog,
    openEditDialog,
    openViewDialog,
    openDeleteDialog,
  };
};
