
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
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SHOP_CATEGORIES = [
  "Abbigliamento",
  "Alimentari",
  "Arredamento",
  "Elettronica",
  "Farmacia",
  "Informatica",
  "Libri",
  "Ristorante",
  "Servizi",
  "Sport",
  "Altro"
];

interface EditShopDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (field: string, value: string) => void;
  onCheckboxChange?: (field: string, checked: boolean) => void;
  onGetLocation?: () => void;
  onSaveChanges: () => void;
}

const EditShopDialog: React.FC<EditShopDialogProps> = ({
  shop,
  open,
  onOpenChange,
  onShopChange,
  onSelectChange,
  onCheckboxChange,
  onGetLocation,
  onSaveChanges
}) => {
  if (!shop) return null;

  const handleCheckboxChange = (checked: boolean) => {
    if (onCheckboxChange) {
      onCheckboxChange("isApproved", checked);
    } else {
      // Fallback to the old method if onCheckboxChange is not provided
      const syntheticEvent = {
        target: {
          name: "isApproved",
          value: checked
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      onShopChange(syntheticEvent);
    }
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
            <Label htmlFor="category">Categoria <span className="text-red-500">*</span></Label>
            <Select 
              value={shop.category || ""}
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
              value={shop.address}
              onChange={onShopChange}
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label>Posizione Geografica</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className="col-span-1"
                onClick={onGetLocation}
              >
                <MapPin className="h-4 w-4 mr-1" /> Rileva
              </Button>
              <div className="col-span-1">
                <Input
                  name="latitude"
                  placeholder="Latitudine"
                  type="number"
                  step="0.000001"
                  value={shop.location?.latitude || ""}
                  onChange={onShopChange}
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="longitude"
                  placeholder="Longitudine"
                  type="number"
                  step="0.000001"
                  value={shop.location?.longitude || ""}
                  onChange={onShopChange}
                />
              </div>
            </div>
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
