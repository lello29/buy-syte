
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ShopsPageHeaderProps {
  handleAddShop: () => void;
  isMobile: boolean;
}

const ShopsPageHeader: React.FC<ShopsPageHeaderProps> = ({ 
  handleAddShop, 
  isMobile 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestione Negozi</h1>
        <p className="text-muted-foreground">
          Visualizza e gestisci i negozi registrati sulla piattaforma.
        </p>
      </div>
      {!isMobile && (
        <Button onClick={handleAddShop}>
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi nuovo negozio
        </Button>
      )}
    </div>
  );
};

export default ShopsPageHeader;
