
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
import { Checkbox } from '@/components/ui/checkbox';
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

  const handleCheckboxChange = (checked: boolean) => {
    // Create a synthetic event-like object with the properties needed by onShopChange
    const syntheticEvent = {
      target: {
        name: "isApproved",
        value: checked
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    onShopChange(syntheticEvent);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifica Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Nome <span className="text-red-500">*</span></Label>
            <Input 
              id="name"
              name="name"
              value={shop.name}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="address">Indirizzo <span className="text-red-500">*</span></Label>
            <Input 
              id="address"
              name="address"
              value={shop.address}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={shop.email}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="phone">Telefono <span className="text-red-500">*</span></Label>
            <Input 
              id="phone"
              name="phone"
              value={shop.phone}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
            <Input 
              id="fiscalCode"
              name="fiscalCode"
              value={shop.fiscalCode || ""}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
            <Input 
              id="vatNumber"
              name="vatNumber"
              value={shop.vatNumber || ""}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="aiCredits">Crediti AI <span className="text-red-500">*</span></Label>
            <Input 
              id="aiCredits"
              name="aiCredits"
              type="number" 
              value={shop.aiCredits}
              onChange={onShopChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isApproved"
              checked={shop.isApproved !== false}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isApproved" className="cursor-pointer">Approvato</Label>
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
