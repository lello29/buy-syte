
import React from 'react';
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

interface AddShopDialogProps {
  newShop: {
    name: string;
    address: string;
    email: string;
    phone: string;
    aiCredits: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCreateShop: () => void;
}

const AddShopDialog: React.FC<AddShopDialogProps> = ({
  newShop,
  open,
  onOpenChange,
  onInputChange,
  onCreateShop
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-name">Nome</Label>
            <Input 
              id="new-name"
              name="name"
              value={newShop.name}
              onChange={onInputChange}
              placeholder="Nome del negozio"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-address">Indirizzo</Label>
            <Input 
              id="new-address"
              name="address"
              value={newShop.address}
              onChange={onInputChange}
              placeholder="Indirizzo"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-email">Email</Label>
            <Input 
              id="new-email"
              name="email"
              type="email"
              value={newShop.email}
              onChange={onInputChange}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-phone">Telefono</Label>
            <Input 
              id="new-phone"
              name="phone"
              value={newShop.phone}
              onChange={onInputChange}
              placeholder="Numero di telefono"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-aiCredits">Crediti AI</Label>
            <Input 
              id="new-aiCredits"
              name="aiCredits"
              type="number" 
              value={newShop.aiCredits}
              onChange={onInputChange}
              placeholder="Crediti AI"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button onClick={onCreateShop}>
              Crea Negozio
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddShopDialog;
