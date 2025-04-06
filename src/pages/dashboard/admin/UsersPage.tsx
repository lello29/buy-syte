
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User as UserIcon, UserCheck, UserX, Ban, Trash2, Shield, UserPlus, Loader2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types";
import MobileUsersList from "@/components/admin/users/MobileUsersList";
import EditUserDialog from "@/components/admin/users/EditUserDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { users as mockUsers } from "@/data/users";

const UsersPage = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (error) {
            console.error("Error fetching users:", error.message);
            toast.error("Errore nel caricamento degli utenti");
            setUsers(mockUsers);
            return;
          }
          
          if (data && data.length > 0) {
            const formattedUsers: User[] = data.map(user => ({
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              favorites: user.favorites || [],
              loyaltyPoints: user.loyalty_points || 0,
              isActive: user.is_active,
              createdAt: user.created_at,
              updatedAt: user.updated_at,
              fiscalCode: user.fiscal_code,
              vatNumber: user.vat_number
            }));
            
            setUsers(formattedUsers);
          } else {
            console.log("No users found in the database, using mock data instead");
            setUsers(mockUsers);
          }
        } else {
          console.log("Supabase not configured, using mock data");
          setUsers(mockUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Si è verificato un errore durante il caricamento degli utenti");
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('users')
          .update({ 
            is_active: isActive,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);
          
        if (error) {
          console.error("Error updating user status:", error.message);
          toast.error("Errore nell'aggiornamento dello stato dell'utente");
          return;
        }
      }
      
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, isActive: isActive } : user
      );
      
      setUsers(updatedUsers);
      toast.success(`Stato dell'utente aggiornato con successo`);
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Si è verificato un errore durante l'aggiornamento dello stato dell'utente");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', userId);
          
        if (error) {
          console.error("Error deleting user:", error.message);
          toast.error("Errore nell'eliminazione dell'utente");
          return;
        }
      }
      
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      toast.success(`Utente eliminato con successo`);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Si è verificato un errore durante l'eliminazione dell'utente");
    }
  };

  const handleUserUpdate = (updatedUser: User) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Inserisci nome e email");
      return;
    }

    try {
      const newUserObj: User = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: "user",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('users')
          .insert({
            name: newUserObj.name,
            email: newUserObj.email,
            role: newUserObj.role,
            favorites: newUserObj.favorites,
            loyalty_points: newUserObj.loyaltyPoints,
            is_active: newUserObj.isActive,
            created_at: newUserObj.createdAt,
            updated_at: newUserObj.updatedAt
          })
          .select();
          
        if (error) {
          console.error("Error adding user:", error.message);
          toast.error("Errore nell'aggiunta dell'utente");
          return;
        }
        
        if (data && data.length > 0) {
          newUserObj.id = data[0].id;
        }
      }
      
      setUsers(prev => [newUserObj, ...prev]);
      setNewUser({ name: '', email: '' });
      setIsAddDialogOpen(false);
      toast.success("Utente aggiunto con successo");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Si è verificato un errore durante l'aggiunta dell'utente");
    }
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
            onDeleteUser={handleDeleteUser}
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Registrato il</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm">{user.id.slice(0, 8)}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? "success" : "destructive"}>
                          {user.isActive ? "Attivo" : "Inattivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="mr-1 h-4 w-4" /> Modifica
                          </Button>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

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
                  <p className="text-sm font-medium text-gray-500">Codice Fiscale</p>
                  <p>{selectedUser.fiscalCode || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Partita IVA</p>
                  <p>{selectedUser.vatNumber || "—"}</p>
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
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openEditDialog(selectedUser);
                  }}
                >
                  <Edit className="mr-1 h-4 w-4" /> Modifica
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aggiungi Nuovo Utente</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli per creare un nuovo utente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Nome utente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email utente"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleAddUser}>Aggiungi Utente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per modificare l'utente */}
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
