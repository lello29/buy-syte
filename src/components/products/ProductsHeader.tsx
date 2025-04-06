
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Barcode } from "lucide-react";
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
        <AddProductDialog />
        {!isMobile && (
          <>
            <Button variant="outline">
              <Barcode className="h-4 w-4 mr-2" />
              Scansiona Codice
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importa CSV
            </Button>
            <ProductCategoriesManager 
              categories={categories}
              className="hidden lg:flex"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsHeader;
