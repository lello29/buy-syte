
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Database, Loader2 } from 'lucide-react';

interface ShopsPageHeaderProps {
  handleAddShop: () => void;
  isMobile: boolean;
  onMigrateShops?: () => void;
  isMigrating?: boolean;
}

const ShopsPageHeader: React.FC<ShopsPageHeaderProps> = ({ 
  handleAddShop, 
  isMobile,
  onMigrateShops,
  isMigrating = false 
}) => {
  console.log("ShopsPageHeader - handleAddShop is function:", typeof handleAddShop === 'function');
  
  const handleAddButtonClick = () => {
    console.log("Add Shop button clicked - Before calling handleAddShop");
    if (typeof handleAddShop === 'function') {
      handleAddShop();
      console.log("Add Shop button clicked - After calling handleAddShop");
    } else {
      console.error("handleAddShop is not a function:", handleAddShop);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gestione Negozi</h2>
        <p className="text-muted-foreground">
          Crea, visualizza e gestisci negozi del marketplace
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        {onMigrateShops && (
          <Button 
            variant="outline" 
            onClick={onMigrateShops}
            disabled={isMigrating}
            className="whitespace-nowrap"
          >
            {isMigrating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Database className="h-4 w-4 mr-2" />
            )}
            {isMigrating ? "Migrazione..." : "Migra Dati"}
          </Button>
        )}
        <Button 
          onClick={handleAddButtonClick} 
          className="whitespace-nowrap"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {!isMobile && "Aggiungi Negozio"}
          {isMobile && "Nuovo"}
        </Button>
      </div>
    </div>
  );
};

export default ShopsPageHeader;
