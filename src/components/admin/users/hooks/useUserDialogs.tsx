
import { useState, useCallback } from "react";
import { User } from "@/types";

export const useUserDialogs = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting,
    openViewDialog,
    openEditDialog,
    openDeleteDialog,
    openAddDialog
  };
};
