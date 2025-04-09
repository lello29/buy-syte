
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ShopBasicInfoFieldsProps {
  name: string;
  description: string;
  address: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShopBasicInfoFields: React.FC<ShopBasicInfoFieldsProps> = ({
  name,
  description,
  address,
  handleChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome Negozio *</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Nome del negozio"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrizione</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Breve descrizione del negozio"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Indirizzo</Label>
        <Input
          id="address"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Indirizzo completo"
        />
      </div>
    </>
  );
};

export default ShopBasicInfoFields;
