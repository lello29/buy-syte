
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";

interface EmptyProductsStateProps {
  searchTerm: string;
  onAddProduct: () => void;
  onClearSearch: () => void;
}

const EmptyProductsState: React.FC<EmptyProductsStateProps> = ({ 
  searchTerm, 
  onAddProduct,
  onClearSearch
}) => {
  return (
    <Card>
      <CardContent className="py-10">
        <div className="text-center space-y-4">
          <Package className="h-10 w-10 text-gray-400 mx-auto" />
          <h3 className="font-medium text-lg">Nessun prodotto trovato</h3>
          {searchTerm ? (
            <p className="text-gray-500">
              Nessun prodotto corrisponde alla tua ricerca. Prova con altri termini.
            </p>
          ) : (
            <p className="text-gray-500">
              Il tuo catalogo è vuoto. Aggiungi il tuo primo prodotto!
            </p>
          )}
          <Button 
            className="mt-4" 
            onClick={() => {
              if (searchTerm) {
                onClearSearch();
              }
              onAddProduct();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Prodotto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyProductsState;
