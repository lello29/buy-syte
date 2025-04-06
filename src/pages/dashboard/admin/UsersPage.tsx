
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { User as UserIcon, UserPlus, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types";
import MobileUsersList from "@/components/admin/users/MobileUsersList";
import EditUserDialog from "@/components/admin/users/EditUserDialog";
import ViewUserDialog from "@/components/admin/users/ViewUserDialog";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";
import AddUserDialog from "@/components/admin/users/AddUserDialog";
import UsersTable from "@/components/admin/users/UsersTable";
import { fetchUsers, toggleUserStatus, deleteUser, addUser } from "@/services/userService";

const UsersPage = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const loadedUsers = await fetchUsers();
    setUsers(loadedUsers);
    setLoading(false);
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    const success = await toggleUserStatus(userId, isActive);
    if (success) {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, isActive: isActive } : user
      );
      setUsers(updatedUsers);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const success = await deleteUser(userId);
    if (success) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleUserUpdate = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleAddUser = async (userData: { name: string; email: string }) => {
    if (!userData.name || !userData.email) {
      return;
    }

    const newUser = await addUser(userData);
    if (newUser) {
      setUsers(prev => [newUser, ...prev]);
      setIsAddDialogOpen(false);
    }
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Caricamento utenti in corso...</p>
      </div>
    );
  }

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
      {!isMobile && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestione Utenti</h1>
              <p className="text-gray-600">
                Visualizza e gestisci gli utenti registrati sulla piattaforma.
              </p>
            </div>
            <Button onClick={openAddDialog}>
              <UserPlus className="mr-2 h-5 w-5" /> Aggiungi Utente
            </Button>
          </div>
        </>
      )}

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Lista Utenti ({users.length})
            </CardTitle>
            <CardDescription>
              Elenco di tutti gli utenti registrati sulla piattaforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nessun utente trovato.</p>
                <Button onClick={openAddDialog} className="mt-4">
                  <UserPlus className="mr-2 h-5 w-5" /> Aggiungi il primo utente
                </Button>
              </div>
            ) : (
              <UsersTable 
                users={users}
                onToggleStatus={handleToggleUserStatus}
                onEditUser={openEditDialog}
                onViewUser={openViewDialog}
                onDeleteUser={openDeleteDialog}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog Components */}
      <ViewUserDialog 
        user={selectedUser}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        onEditUser={(user) => {
          setIsViewDialogOpen(false);
          openEditDialog(user);
        }}
        onDeleteUser={(user) => {
          setIsViewDialogOpen(false);
          openDeleteDialog(user);
        }}
      />

      <DeleteUserDialog 
        user={selectedUser}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleDeleteUser}
      />

      <AddUserDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddUser={handleAddUser}
      />

      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUserUpdated={handleUserUpdate}
      />
    </div>
  );
};

export default UsersPage;
