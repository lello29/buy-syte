
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShopTaxFieldsProps {
  fiscalCode: string;
  vatNumber: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShopTaxFields: React.FC<ShopTaxFieldsProps> = ({
  fiscalCode,
  vatNumber,
  handleChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fiscalCode">Codice Fiscale</Label>
        <Input
          id="fiscalCode"
          name="fiscalCode"
          value={fiscalCode}
          onChange={handleChange}
          placeholder="Codice fiscale"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="vatNumber">Partita IVA</Label>
        <Input
          id="vatNumber"
          name="vatNumber"
          value={vatNumber}
          onChange={handleChange}
          placeholder="Partita IVA"
        />
      </div>
    </div>
  );
};

export default ShopTaxFields;
