
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
    fiscalCode: string;
    vatNumber: string;
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
            <Label htmlFor="new-name">Nome <span className="text-red-500">*</span></Label>
            <Input 
              id="new-name"
              name="name"
              value={newShop.name}
              onChange={onInputChange}
              placeholder="Nome del negozio"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-address">Indirizzo <span className="text-red-500">*</span></Label>
            <Input 
              id="new-address"
              name="address"
              value={newShop.address}
              onChange={onInputChange}
              placeholder="Indirizzo"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-email">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="new-email"
              name="email"
              type="email"
              value={newShop.email}
              onChange={onInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-phone">Telefono <span className="text-red-500">*</span></Label>
            <Input 
              id="new-phone"
              name="phone"
              value={newShop.phone}
              onChange={onInputChange}
              placeholder="Numero di telefono"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
            <Input 
              id="new-fiscalCode"
              name="fiscalCode"
              value={newShop.fiscalCode}
              onChange={onInputChange}
              placeholder="Codice Fiscale"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
            <Input 
              id="new-vatNumber"
              name="vatNumber"
              value={newShop.vatNumber}
              onChange={onInputChange}
              placeholder="Partita IVA"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="new-aiCredits">Crediti AI <span className="text-red-500">*</span></Label>
            <Input 
              id="new-aiCredits"
              name="aiCredits"
              type="number" 
              value={newShop.aiCredits}
              onChange={onInputChange}
              placeholder="Crediti AI"
              required
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
