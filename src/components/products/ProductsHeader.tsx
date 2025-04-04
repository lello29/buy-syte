
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Barcode } from "lucide-react";
import AddProductDialog from "./AddProductDialog";

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ onAddProduct }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
        <p className="text-gray-600">
          Gestisci il catalogo prodotti del tuo negozio.
        </p>
      </div>
      
      <div className="flex gap-4">
        <AddProductDialog />
        <Button variant="outline">
          <Barcode className="h-4 w-4 mr-2" />
          Scansiona Codice
        </Button>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Importa CSV
        </Button>
      </div>
    </div>
  );
};

export default ProductsHeader;
