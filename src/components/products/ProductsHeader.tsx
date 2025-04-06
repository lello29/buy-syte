
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Barcode, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import AddProductDialog from "./AddProductDialog";
import ProductCategoriesManager from "./ProductCategoriesManager";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ onAddProduct }) => {
  const isMobile = useIsMobile();
  
  // Esempio di categorie statiche (in un'app reale, queste verrebbero caricate dal database)
  const categories = [
    "Abbigliamento",
    "Accessori",
    "Arredamento",
    "Arte e Collezionismo",
    "Bellezza e Cura Personale",
    "Elettronica",
    "Food & Beverage",
    "Gioielli",
    "Libri e Media",
    "Salute e Benessere",
    "Sport e Tempo Libero",
    "Altro"
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
        <p className="text-gray-600">
          Gestisci il catalogo prodotti del tuo negozio.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {isMobile ? (
          <Button 
            className="bg-[#0a3276] hover:bg-[#0a3276]/90"
            onClick={onAddProduct}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Prodotto
          </Button>
        ) : (
          <>
            <AddProductDialog />
            <Button variant="outline">
              <Barcode className="h-4 w-4 mr-2" />
              Scansiona Codice
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importa CSV
            </Button>
            {/* Dropdown for category selection */}
            <ProductCategoriesManager 
              categories={categories}
              className="hidden lg:flex"
              dropdownOnly={true}
            />
            {/* Dedicated button for category management */}
            <Button 
              variant="outline" 
              onClick={() => {
                const categoriesManager = document.getElementById("manage-categories-button");
                if (categoriesManager) categoriesManager.click();
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Gestione Categorie
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsHeader;
