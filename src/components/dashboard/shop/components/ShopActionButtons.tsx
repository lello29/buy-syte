
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShopActionButtonsProps {
  onAddProduct: () => void;
  onManageCategories: () => void;
}

const ShopActionButtons: React.FC<ShopActionButtonsProps> = ({ 
  onAddProduct, 
  onManageCategories 
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      <Button 
        variant="primary" 
        size="lg" 
        className="justify-center text-lg py-6"
        onClick={onAddProduct}
      >
        Aggiungi Prodotto
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="justify-center text-lg py-6"
        onClick={onManageCategories}
      >
        Gestisci Categorie
      </Button>
    </div>
  );
};

export default ShopActionButtons;
