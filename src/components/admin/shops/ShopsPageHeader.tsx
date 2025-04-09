
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
  console.log("ShopsPageHeader - handleAddShop è una funzione:", typeof handleAddShop === 'function');
  
  const handleAddButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Add Shop button clicked - Prima di chiamare handleAddShop");
    if (typeof handleAddShop === 'function') {
      try {
        handleAddShop();
        console.log("Add Shop button clicked - Dopo aver chiamato handleAddShop");
      } catch (error) {
        console.error("Errore in handleAddShop:", error);
      }
    } else {
      console.error("handleAddShop non è una funzione:", handleAddShop);
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
          id="add-shop-button"
          data-test-id="add-shop-button" // Aggiunto per facilitare i test
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
