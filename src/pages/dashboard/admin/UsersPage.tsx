import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileUsersList from "@/components/admin/users/MobileUsersList";
import DesktopUsersView from "@/components/admin/users/DesktopUsersView";
import UserDialogs from "@/components/admin/users/UserDialogs";
import UserLoadingState from "@/components/admin/users/UserLoadingState";
import { useUsers } from "@/components/admin/users/hooks/useUsers";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

const UsersPage = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const {
    users,
    loading,
    isDeleting,
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
    handleDeleteAllUsers,
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

  // Count non-admin users
  const nonAdminUsersCount = users.filter(user => user.role !== "admin").length;

  // Mobile view header
  const mobileHeader = (
    <div className="md:hidden">
      <h1 className="text-3xl font-bold mb-2">Lista Utenti</h1>
      <p className="text-gray-600 mb-6">
        Elenco di tutti gli utenti registrati sulla piattaforma
      </p>
    </div>
  );

  const DeleteAllUsersButton = () => (
    <Button 
      variant="destructive"
      onClick={handleDeleteAllUsers}
      disabled={isDeleting || nonAdminUsersCount === 0}
      className="mb-4"
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Eliminazione in corso...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Elimina Tutti gli Utenti Non Admin ({nonAdminUsersCount})
        </>
      )}
    </Button>
  );

  const handleUserUpdatedWrapper = (user: any) => {
    if (user && user.id) {
      handleUserUpdate(user.id, user);
    }
  };

  return (
    <div className="space-y-6">
      {isMobile ? (
        <>
          {mobileHeader}
          <DeleteAllUsersButton />
          <MobileUsersList 
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={(userId) => openDeleteDialog(users.find(u => u.id === userId) || users[0])}
            onAddUser={openAddDialog}
            onEditUser={openEditDialog}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Gestione Utenti</h1>
            <DeleteAllUsersButton />
          </div>
          <DesktopUsersView
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={openEditDialog}
            onViewUser={openViewDialog}
            onDeleteUser={openDeleteDialog}
            onAddUser={openAddDialog}
          />
        </>
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
        onUserUpdated={handleUserUpdatedWrapper}
        onAddUser={handleAddUser}
        onEditUser={openEditDialog}
        onDeleteUserDialog={openDeleteDialog}
      />
    </div>
  );
};

export default UsersPage;
