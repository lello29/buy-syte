
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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

interface ShopBasicInfoFieldsProps {
  name: string;
  category?: string;
  address: string;
  email: string;
  phone: string;
  fiscalCode?: string;
  vatNumber?: string;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange?: (field: string, value: string) => void;
}

const ShopBasicInfoFields: React.FC<ShopBasicInfoFieldsProps> = ({
  name,
  category,
  address,
  email,
  phone,
  fiscalCode,
  vatNumber,
  onShopChange,
  onSelectChange
}) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="name">Nome <span className="text-red-500">*</span></Label>
        <Input 
          id="name"
          name="name"
          value={name}
          onChange={onShopChange}
          required
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <Label htmlFor="category">Categoria <span className="text-red-500">*</span></Label>
        <Select 
          value={category || ""}
          onValueChange={(value) => onSelectChange && onSelectChange("category", value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Seleziona categoria" />
          </SelectTrigger>
          <SelectContent>
            {SHOP_CATEGORIES.map((categoryOption) => (
              <SelectItem key={categoryOption} value={categoryOption}>
                {categoryOption}
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
          value={address}
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
          value={email}
          onChange={onShopChange}
          required
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <Label htmlFor="phone">Telefono <span className="text-red-500">*</span></Label>
        <Input 
          id="phone"
          name="phone"
          value={phone}
          onChange={onShopChange}
          required
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <Label htmlFor="fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
        <Input 
          id="fiscalCode"
          name="fiscalCode"
          value={fiscalCode || ""}
          onChange={onShopChange}
          required
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <Label htmlFor="vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
        <Input 
          id="vatNumber"
          name="vatNumber"
          value={vatNumber || ""}
          onChange={onShopChange}
          required
        />
      </div>
    </>
  );
};

export default ShopBasicInfoFields;
