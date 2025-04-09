
import React from 'react';
import { useUsers } from '@/components/admin/users/hooks/useUsers';
import DesktopUsersView from '@/components/admin/users/DesktopUsersView';
import MobileUsersList from '@/components/admin/users/MobileUsersList';
import UserDialogs from '@/components/admin/users/UserDialogs';
import UserLoadingState from '@/components/admin/users/UserLoadingState';
import { Helmet } from 'react-helmet';
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
  } = useUsers();

  const isMobile = useIsMobile();

  // Handle loading state
  if (loading) {
    return <UserLoadingState />;
  }

  const handleUserSubmit = async (userData: any): Promise<boolean> => {
    // Depending on the context, this could be an update or an add
    if (selectedUser && userData.id) {
      return handleUserUpdate(userData.id, userData);
    } else {
      return handleAddUser(userData);
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
          onDeleteUser={openDeleteDialog}
          onAddUser={openAddDialog}
          onToggleStatus={handleToggleUserStatus}
        />
      ) : (
        <DesktopUsersView
          users={users}
          onViewUser={openViewDialog}
          onEditUser={openEditDialog}
          onDeleteUser={openDeleteDialog}
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
