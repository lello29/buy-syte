
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShopContactFieldsProps {
  phone: string;
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShopContactFields: React.FC<ShopContactFieldsProps> = ({
  phone,
  email,
  handleChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Telefono</Label>
        <Input
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Numero di telefono"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email di contatto"
        />
      </div>
    </div>
  );
};

export default ShopContactFields;
