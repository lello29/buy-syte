
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
import { Shop } from '@/types';

interface EditShopDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveChanges: () => void;
}

const EditShopDialog: React.FC<EditShopDialogProps> = ({
  shop,
  open,
  onOpenChange,
  onShopChange,
  onSaveChanges
}) => {
  if (!shop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifica Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name"
              name="name"
              value={shop.name}
              onChange={onShopChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="address">Indirizzo</Label>
            <Input 
              id="address"
              name="address"
              value={shop.address}
              onChange={onShopChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={shop.email}
              onChange={onShopChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="phone">Telefono</Label>
            <Input 
              id="phone"
              name="phone"
              value={shop.phone}
              onChange={onShopChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="aiCredits">Crediti AI</Label>
            <Input 
              id="aiCredits"
              name="aiCredits"
              type="number" 
              value={shop.aiCredits}
              onChange={onShopChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="isApproved" 
              name="isApproved"
              checked={shop.isApproved !== false}
              onChange={(e) => onShopChange({
                ...e,
                target: {
                  ...e.target,
                  name: "isApproved",
                  value: e.target.checked
                }
              } as React.ChangeEvent<HTMLInputElement>)}
            />
            <Label htmlFor="isApproved">Approvato</Label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button onClick={onSaveChanges}>
              Salva Modifiche
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditShopDialog;
