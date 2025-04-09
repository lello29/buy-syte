
import React from "react";
import { User } from "@/types";
import EditUserDialog from "./EditUserDialog";
import ViewUserDialog from "./ViewUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import AddUserDialog from "./AddUserDialog";

interface UserDialogsProps {
  selectedUser: User | null;
  isViewDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  setIsAddDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  onDeleteUser: (userId: string) => void;
  onUserUpdated: (user: User) => void;
  onAddUser: (userData: { name: string; email: string; role?: string; password?: string }) => void;
  onEditUser: (user: User) => void;
  onDeleteUserDialog: (user: User) => void;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  selectedUser,
  isViewDialogOpen,
  isDeleteDialogOpen,
  isAddDialogOpen,
  isEditDialogOpen,
  setIsViewDialogOpen,
  setIsDeleteDialogOpen,
  setIsAddDialogOpen,
  setIsEditDialogOpen,
  onDeleteUser,
  onUserUpdated,
  onAddUser,
  onEditUser,
  onDeleteUserDialog,
}) => {
  return (
    <>
      <ViewUserDialog 
        user={selectedUser}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        onEditUser={(user) => {
          setIsViewDialogOpen(false);
          onEditUser(user);
        }}
        onDeleteUser={(user) => {
          setIsViewDialogOpen(false);
          onDeleteUserDialog(user);
        }}
      />

      <DeleteUserDialog 
        user={selectedUser}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={onDeleteUser}
      />

      <AddUserDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddUser={onAddUser}
      />

      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUserUpdated={onUserUpdated}
      />
    </>
  );
};

export default UserDialogs;
