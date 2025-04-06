
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ShopsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ShopsSearchBar: React.FC<ShopsSearchBarProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <Input
          placeholder="Cerca per nome, email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          Esporta dati
        </Button>
      </div>
    </div>
  );
};

export default ShopsSearchBar;
