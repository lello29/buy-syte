
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
  return (
    <>
      {selectedUser && (
        <ViewUserDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          user={selectedUser}
        />
      )}
      
      {selectedUser && (
        <EditUserDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={selectedUser}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      
      <AddUserDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
      
      {selectedUser && (
        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          user={selectedUser}
          isDeleting={isSubmitting}
        />
      )}
    </>
  );
};

export default UserDialogs;
