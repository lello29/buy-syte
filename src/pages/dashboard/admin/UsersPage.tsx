
import React from 'react';
import { useUsers } from '@/components/admin/users/hooks/useUsers';
import DesktopUsersView from '@/components/admin/users/DesktopUsersView';
import MobileUsersList from '@/components/admin/users/MobileUsersList';
import UserDialogs from '@/components/admin/users/UserDialogs';
import UserLoadingState from '@/components/admin/users/UserLoadingState';
import { Helmet } from 'react-helmet';
import { useIsMobile } from '@/hooks/use-mobile';

export default function UsersPage() {
  const {
    users,
    isLoading,
    isSubmitting,
    handleViewUser,
    handleEditUser,
    handleAddUser,
    handleDeleteUser,
    handleToggleStatus,
    selectedUser,
    form,
    isViewDialogOpen,
    isEditDialogOpen,
    isAddDialogOpen,
    isDeleteDialogOpen,
    setIsViewDialogOpen,
    setIsEditDialogOpen,
    setIsAddDialogOpen,
    setIsDeleteDialogOpen,
    onSubmit
  } = useUsers();

  const isMobile = useIsMobile();

  // Handle loading state
  if (isLoading) {
    return <UserLoadingState />;
  }

  return (
    <>
      <Helmet>
        <title>Gestione Utenti | Admin Dashboard</title>
      </Helmet>

      {isMobile ? (
        <MobileUsersList
          users={users}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onAddUser={handleAddUser}
          onToggleStatus={handleToggleStatus}
        />
      ) : (
        <DesktopUsersView
          users={users}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onAddUser={handleAddUser}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <UserDialogs
        selectedUser={selectedUser}
        form={form}
        isViewDialogOpen={isViewDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isAddDialogOpen={isAddDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
