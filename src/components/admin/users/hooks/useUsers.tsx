
import { useUsersFetch } from "./useUsersFetch";
import { useUserDialogs } from "./useUserDialogs";
import { useUserActions } from "./useUserActions";

export const useUsers = () => {
  const { users, setUsers, loading } = useUsersFetch();
  
  const {
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
  } = useUserDialogs();
  
  const {
    handleToggleUserStatus,
    handleDeleteUser,
    handleDeleteAllUsers,
    handleUserUpdate,
    handleAddUser
  } = useUserActions(users, setUsers);

  // Fix to handle the way it's used in UsersPage
  const handleUserUpdatedWrapper = (user: any) => {
    if (user && user.id) {
      return handleUserUpdate(user.id, user);
    }
    return false;
  };

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
    setIsDeleting,
    handleToggleUserStatus,
    handleDeleteUser,
    handleDeleteAllUsers,
    handleUserUpdate: handleUserUpdatedWrapper,
    handleAddUser,
    openAddDialog,
    openEditDialog,
    openViewDialog,
    openDeleteDialog,
  };
};
