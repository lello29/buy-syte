
import React from 'react';
import { useUsers } from '@/components/admin/users/hooks/useUsers';
import DesktopUsersView from '@/components/admin/users/DesktopUsersView';
import MobileUsersList from '@/components/admin/users/MobileUsersList';
import UserDialogs from '@/components/admin/users/UserDialogs';
import UserLoadingState from '@/components/admin/users/UserLoadingState';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/use-mobile';
import { User } from '@/types';

export default function UsersPage() {
  const {
    users,
    loading,
    isDeleting,
    selectedUser,
    isViewDialogOpen,
    isEditDialogOpen,
    isAddDialogOpen,
    isDeleteDialogOpen,
    setIsViewDialogOpen,
    setIsEditDialogOpen,
    setIsAddDialogOpen,
    setIsDeleteDialogOpen,
    openViewDialog,
    openEditDialog,
    openAddDialog,
    openDeleteDialog,
    handleToggleUserStatus,
    handleUserUpdate,
    handleAddUser,
    handleDeleteUser
  } = useUsers();

  const isMobile = useIsMobile();

  // Handle loading state
  if (loading) {
    return <UserLoadingState />;
  }

  const handleUserSubmit = async (userData: any): Promise<boolean> => {
    // Depending on the context, this could be an update or an add
    if (selectedUser && userData.id) {
      return handleUserUpdate(userData);
    } else {
      return handleAddUser(userData);
    }
  };

  // Create a userId-based delete function adapter
  const handleDeleteById = (userId: string) => {
    if (selectedUser && selectedUser.id === userId) {
      handleDeleteUser(userId);
    }
  };

  // We'll need a handler that finds a user by ID and then calls openDeleteDialog
  const handleOpenDeleteDialogById = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete) {
      openDeleteDialog(userToDelete);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestione Utenti | Admin Dashboard</title>
      </Helmet>

      {isMobile ? (
        <MobileUsersList
          users={users}
          onViewUser={openViewDialog}
          onEditUser={openEditDialog}
          onDeleteUser={handleOpenDeleteDialogById}
          onAddUser={openAddDialog}
          onToggleStatus={handleToggleUserStatus}
        />
      ) : (
        <DesktopUsersView
          users={users}
          onViewUser={openViewDialog}
          onEditUser={openEditDialog}
          onDeleteUser={handleOpenDeleteDialogById}
          onAddUser={openAddDialog}
          onToggleStatus={handleToggleUserStatus}
        />
      )}

      <UserDialogs
        selectedUser={selectedUser}
        isViewDialogOpen={isViewDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isAddDialogOpen={isAddDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onSubmit={handleUserSubmit}
        isSubmitting={isDeleting}
      />
    </>
  );
}
