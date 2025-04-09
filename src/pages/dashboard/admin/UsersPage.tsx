
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
    loading: isLoading,
    isDeleting: isSubmitting,
    selectedUser,
    isViewDialogOpen,
    isEditDialogOpen,
    isAddDialogOpen,
    isDeleteDialogOpen,
    setIsViewDialogOpen,
    setIsEditDialogOpen,
    setIsAddDialogOpen,
    setIsDeleteDialogOpen,
    openViewDialog: handleViewUser,
    openEditDialog: handleEditUser,
    openAddDialog: handleAddUser,
    openDeleteDialog: handleDeleteUser,
    handleToggleUserStatus: handleToggleStatus,
    handleUserUpdate,
    handleAddUser: handleAddUserImpl,
  } = useUsers();

  const isMobile = useIsMobile();

  // Handle loading state
  if (isLoading) {
    return <UserLoadingState />;
  }

  const handleUserSubmit = (userData: any) => {
    // Depending on the context, this could be an update or an add
    if (selectedUser) {
      return handleUserUpdate(selectedUser.id, userData);
    } else {
      return handleAddUserImpl(userData);
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
          onViewUser={(user: User) => handleViewUser(user)}
          onEditUser={(user: User) => handleEditUser(user)}
          onDeleteUser={(user: User) => handleDeleteUser(user)}
          onAddUser={handleAddUser}
          onToggleStatus={(userId: string, status: boolean) => handleToggleStatus(userId, status)}
        />
      ) : (
        <DesktopUsersView
          users={users}
          onViewUser={(user: User) => handleViewUser(user)}
          onEditUser={(user: User) => handleEditUser(user)}
          onDeleteUser={(user: User) => handleDeleteUser(user)}
          onAddUser={handleAddUser}
          onToggleStatus={(userId: string, status: boolean) => handleToggleStatus(userId, status)}
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
        isSubmitting={isSubmitting}
      />
    </>
  );
}
