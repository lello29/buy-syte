
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SHOP_CATEGORIES } from '../constants/shopCategories';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
