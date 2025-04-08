
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileUsersList from "@/components/admin/users/MobileUsersList";
import DesktopUsersView from "@/components/admin/users/DesktopUsersView";
import UserDialogs from "@/components/admin/users/UserDialogs";
import UserLoadingState from "@/components/admin/users/UserLoadingState";
import { useUsers } from "@/components/admin/users/hooks/useUsers";
import { Navigate } from "react-router-dom";

const UsersPage = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const {
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
  } = useUsers();

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    return <UserLoadingState />;
  }

  // Mobile view header
  const mobileHeader = (
    <div className="md:hidden">
      <h1 className="text-3xl font-bold mb-2">Lista Utenti</h1>
      <p className="text-gray-600 mb-6">
        Elenco di tutti gli utenti registrati sulla piattaforma
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {isMobile ? (
        <>
          {mobileHeader}
          <MobileUsersList 
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={(userId) => openDeleteDialog(users.find(u => u.id === userId) || users[0])}
            onAddUser={openAddDialog}
            onEditUser={openEditDialog}
          />
        </>
      ) : (
        <DesktopUsersView
          users={users}
          onToggleStatus={handleToggleUserStatus}
          onEditUser={openEditDialog}
          onViewUser={openViewDialog}
          onDeleteUser={openDeleteDialog}
          onAddUser={openAddDialog}
        />
      )}

      {/* Dialog Components */}
      <UserDialogs
        selectedUser={selectedUser}
        isViewDialogOpen={isViewDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isAddDialogOpen={isAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        onDeleteUser={handleDeleteUser}
        onUserUpdated={handleUserUpdate}
        onAddUser={handleAddUser}
        onEditUser={openEditDialog}
        onDeleteUserDialog={openDeleteDialog}
      />
    </div>
  );
};

export default UsersPage;
