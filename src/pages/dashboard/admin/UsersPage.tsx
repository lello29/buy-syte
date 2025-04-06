
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUsersByRole } from "@/data/mockData";
import { toast } from "sonner";
import { User as UserIcon, UserCheck, UserX, Ban, Trash2, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types";
import MobileUsersList from "@/components/admin/users/MobileUsersList";

const UsersPage = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState(getUsersByRole("user"));
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleUserStatus = (userId: string, isActive: boolean) => {
    // In a real application, this would be an API call
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isActive: isActive } : user
    );
    setUsers(updatedUsers);
    toast.success(`Stato dell'utente aggiornato con successo`);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real application, this would be an API call
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast.success(`Utente eliminato con successo`);
  };

  const openViewDialog = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Utenti</h1>
      <p className="text-gray-600">
        Visualizza e gestisci gli utenti registrati sulla piattaforma.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            Lista Utenti
          </CardTitle>
          <CardDescription>
            Elenco di tutti gli utenti registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <MobileUsersList 
              users={users}
              onToggleStatus={handleToggleUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Registrato il</th>
                    <th className="px-4 py-3 text-left">Stato</th>
                    <th className="px-4 py-3 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-mono text-sm">{user.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <Badge variant={user.isActive ? "success" : "destructive"}>
                          {user.isActive ? "Attivo" : "Inattivo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleUserStatus(user.id, !user.isActive)}
                          >
                            {user.isActive ? (
                              <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
                            ) : (
                              <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openViewDialog(user)}
                          >
                            Dettagli
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:bg-red-100"
                            onClick={() => openDeleteDialog(user)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" /> Elimina
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View User Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" /> Dettagli Utente
            </DialogTitle>
            <DialogDescription>
              Informazioni dettagliate sull'account utente
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="font-mono">{selectedUser.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <Badge variant={selectedUser.isActive ? "success" : "destructive"}>
                    {selectedUser.isActive ? "Attivo" : "Inattivo"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Ruolo</p>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="capitalize">{selectedUser.role}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Punti Fedeltà</p>
                  <p>{selectedUser.loyaltyPoints}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Creato il</p>
                  <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Ultimo aggiornamento</p>
                  <p>{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Attività</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    L'utente ha effettuato {Math.floor(Math.random() * 10) + 1} accessi nell'ultimo mese.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Chiudi
                </Button>
                <Button 
                  variant="outline"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openDeleteDialog(selectedUser);
                  }}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Elimina
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Conferma Eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questo utente? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm"><strong>Nome:</strong> {selectedUser.name}</p>
                <p className="text-sm"><strong>Email:</strong> {selectedUser.email}</p>
                <p className="text-sm"><strong>ID:</strong> {selectedUser.id}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Annulla
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                >
                  Elimina Utente
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
