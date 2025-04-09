
import React from 'react';
import ViewUserDialog from './ViewUserDialog';
import EditUserDialog from './EditUserDialog';
import AddUserDialog from './AddUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { User } from '@/types';

export interface UserDialogsProps {
  selectedUser: User | null;
  isViewDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isAddDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  setIsAddDialogOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onSubmit: (userData: any) => Promise<boolean>;
  isSubmitting: boolean;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  selectedUser,
  isViewDialogOpen,
  isEditDialogOpen,
  isAddDialogOpen,
  isDeleteDialogOpen,
  setIsViewDialogOpen,
  setIsEditDialogOpen,
  setIsAddDialogOpen,
  setIsDeleteDialogOpen,
  onSubmit,
  isSubmitting
}) => {
  // Function to handle user actions from the view dialog
  const handleEditFromView = (user: User) => {
    setIsViewDialogOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteFromView = (user: User) => {
    setIsViewDialogOpen(false);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      {selectedUser && (
        <ViewUserDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          user={selectedUser}
          onEditUser={handleEditFromView}
          onDeleteUser={handleDeleteFromView}
        />
      )}
      
      {selectedUser && (
        <EditUserDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={selectedUser}
          onSubmit={onSubmit}
          isLoading={isSubmitting}
        />
      )}
      
      <AddUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={onSubmit}
        isLoading={isSubmitting}
      />
      
      {selectedUser && (
        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          user={selectedUser}
          onConfirmDelete={(userId: string) => {
            // This adapter function converts the userId parameter to match the expected function signature
            if (selectedUser && selectedUser.id === userId) {
              return onSubmit({ id: userId, action: 'delete' }).then(() => {
                // Return void to match the Promise<void> return type
              });
            }
            return Promise.resolve();
          }}
        />
      )}
    </>
  );
};

export default UserDialogs;
