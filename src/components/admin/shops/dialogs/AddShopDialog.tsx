
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SHOP_CATEGORIES } from '../constants/shopCategories';
import { Switch } from '@/components/ui/switch';
import { fetchUsers } from '@/services/userService';
import { User } from '@/types';
import { PlusCircle, UserPlus, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export interface AddShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newShop: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    fiscalCode: string;
    vatNumber: string;
    category?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (field: string, value: string) => void;
  onCreateShop: () => void;
}

const AddShopDialog: React.FC<AddShopDialogProps> = ({
  open,
  onOpenChange,
  newShop,
  onInputChange,
  onSelectChange,
  onCreateShop
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [createNewUser, setCreateNewUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "shop"
  });

  // Carica gli utenti quando il dialogo viene aperto
  useEffect(() => {
    if (open) {
      loadUsers();
    }
  }, [open]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Errore nel caricamento degli utenti:", error);
      toast.error("Si è verificato un errore nel caricamento degli utenti");
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
    // Trova l'utente selezionato
    const user = users.find(u => u.id === userId);
    if (user) {
      // Aggiorna alcuni campi del negozio con i dati dell'utente
      if (onSelectChange) {
        onSelectChange("userId", userId);
        console.log("Selected user with ID:", userId);
      }
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateShop = () => {
    if (createNewUser) {
      // Valida i dati del nuovo utente
      if (!newUser.name || !newUser.email) {
        toast.error("Inserisci nome e email per il nuovo utente");
        return;
      }
    } else if (!selectedUserId) {
      toast.error("Seleziona un utente per il negozio");
      return;
    }

    // Chiama la funzione per creare il negozio
    onCreateShop();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Sezione Utente */}
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Associa a un Utente</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="create-user" 
                  checked={createNewUser} 
                  onCheckedChange={setCreateNewUser} 
                />
                <Label htmlFor="create-user">Crea nuovo utente</Label>
              </div>
            </div>
            
            {createNewUser ? (
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="userName">Nome Utente <span className="text-red-500">*</span></Label>
                  <Input 
                    id="userName"
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="userEmail">Email Utente <span className="text-red-500">*</span></Label>
                  <Input 
                    id="userEmail"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                    placeholder="email@esempio.com"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-1">
                <Label htmlFor="userId">Seleziona Utente <span className="text-red-500">*</span></Label>
                <Select 
                  value={selectedUserId}
                  onValueChange={handleUserChange}
                >
                  <SelectTrigger id="userId">
                    <SelectValue placeholder="Seleziona un utente" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {loading && <p className="text-xs text-muted-foreground mt-1">Caricamento utenti...</p>}
              </div>
            )}
          </div>

          {/* Dati del negozio */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Nome <span className="text-red-500">*</span></Label>
            <Input 
              id="name"
              name="name"
              value={newShop.name}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="description">Descrizione <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description"
              name="description"
              value={newShop.description}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="category">Categoria <span className="text-red-500">*</span></Label>
            <Select 
              value={newShop.category || ""}
              onValueChange={(value) => onSelectChange && onSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {SHOP_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="address">Indirizzo <span className="text-red-500">*</span></Label>
            <Input 
              id="address"
              name="address"
              value={newShop.address}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={newShop.email}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="phone">Telefono <span className="text-red-500">*</span></Label>
            <Input 
              id="phone"
              name="phone"
              value={newShop.phone}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
            <Input 
              id="fiscalCode"
              name="fiscalCode"
              value={newShop.fiscalCode}
              onChange={onInputChange}
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
            <Input 
              id="vatNumber"
              name="vatNumber"
              value={newShop.vatNumber}
              onChange={onInputChange}
              required
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button onClick={handleCreateShop}>
              {createNewUser ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Crea Utente e Negozio
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Crea Negozio
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddShopDialog;
